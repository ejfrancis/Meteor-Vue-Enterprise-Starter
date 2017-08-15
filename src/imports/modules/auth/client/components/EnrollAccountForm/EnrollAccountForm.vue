<style scoped>

.top-pad-large {
  height: 55px;
}

.top-pad-mobile {
  height: 35px;
}

.form-title {
  margin-bottom: 20px;
}

.form-col {
  border: 1px solid #b3b3b3;
  background: white;
  padding: 20px;
}

.enroll-account-submit-btn {
  margin-top: 20px;
}
.enroll-account-complete-btn {
  margin-top: 20px;
}
</style>

<template>
  <div class='EnrollAccountForm'>
    <media :query='{ minWidth: 768 }'>
      <div class='top-pad-large'>
      </div>
    </media>
    <media :query='{ maxWidth: 768 }'>
      <div class='top-pad-mobile'>
      </div>
    </media>
    <Row>
      <Col :xs='24' :sm='{ span: 14, push: 5}' class='form-col'>
        <div v-if='!changedSuccessfully && !user'>
          <h1 class='form-title'>Account Set Up Completion</h1>
          <Form :model='formData' :rules='formRules'>
            <Row>
              <Col span='24'>
                <Form-item prop='newPassword1' class='password-1' label='Enter your new password'>
                  <Input type='text' v-model='formData.newPassword1' placeholder='*****'>
                  <Icon type='locked' slot='append'></Icon>
                  </Input>
                </Form-item>
              </Col>
              <Col span='24'>
                <Form-item prop='newPassword2' class='password-1' label='Please re-enter your new password'>
                  <Input type='text' v-model='formData.newPassword2' placeholder='*****'>
                  <Icon type='locked' slot='append'></Icon>
                  </Input>
                </Form-item>
              </Col>
              <Col span='24'>
                <Form-item>
                  <Button type='primary' 
                    @click='submitEnrollAccountForm()' 
                    class='enroll-account-submit-btn' 
                    :disabled='isNewPasswordSubmitDisabled' 
                    html-type='submit'
                  >
                    Submit
                  </Button>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
        <div v-if='changedSuccessfully || user'>
          <h1 class='form-title'>Account Set Up Complete!</h1>
          <p>
            Welcome to {{ siteName}}! To continue to the home page please click below:
          </p>
          <Button 
            type='primary' 
            class='enroll-account-complete-btn'
            @click='goToHome()'
          >
            Go to Home
          </Button>  
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import Media from 'vue-media'
import AuthError from './../AuthError/AuthError.vue';
import { passwordSchema } from './../../../shared/schemas/password-schema';

export default {
  name: 'EnrollAccountForm',
  components: {
    AuthError,
    Media
  },
  data() {
    function validatePasswordInputs (rule, value, callback) {
      if (value.toLowerCase().indexOf('password') !== -1) {
        return callback(new Error('Cannot contain the word "password"'));
      }
      const areBothFilled = 
        this.formData.newPassword1.length > 0
        && this.formData.newPassword2.length > 0;
      const isOneFilled = this.formData.newPassword1.length > 0 && this.formData.newPassword2.length === 0
        ||  this.formData.newPassword1.length === 0 && this.formData.newPassword2.length > 0;
      if (isOneFilled) {
        try {
            passwordSchema.validate({ password: value });
            return callback();
          } catch (e) {
          return callback(passwordSchema.summary);
        }
      }
      if (areBothFilled) {  
        if (this.formData.newPassword1 !== this.formData.newPassword2) {
          return callback(new Error('Passwords must match'));
        } else {          
          return callback();
        }
      }
      return callback();
    };
    // bind to get access to vm formData
    validatePasswordInputs = validatePasswordInputs.bind(this);
    return {
      formData: {
        newPassword1: '',
        newPassword2: ''
      },
      formRules: {
        newPassword1: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          { validator: validatePasswordInputs }
        ],
        newPassword2: [
          { required: true, message: 'Password is required', trigger: 'blur' },
          { validator: validatePasswordInputs }
        ]
      }
    }
  },
  destroyed() {
    this.clearEnrollAccountFailure();
  },
  computed: {
    ...mapState({
      token: (state) => state.route.query.token,
      enrolledAccountSuccessfully: (state) => state.route.query.success,
      changedSuccessfully: (state) => state.route.query.success,
      user: (state) => state.auth.user
    }),
    isNewPasswordSubmitDisabled() {
      if (!this.formData.newPassword1 ||
        !this.formData.newPassword2 ||
        (this.formData.newPassword1 !== this.formData.newPassword2)) {
        return true;
      }
      return false;
    },
    siteName() {
      return Meteor.settings.public.siteName;
    }
  },
  methods: {
    ...mapActions({
      enrollVerifyAccount: (actions) => actions.auth.enrollVerifyAccount,
      clearEnrollAccountFailure: (actions) => actions.auth.clearEnrollAccountFailure
    }),
    async submitEnrollAccountForm() {
      try {
        const enrollSuccess = await this.enrollVerifyAccount({ token: this.token, newPassword: this.formData.newPassword1 });
        if (enrollSuccess) {
          this.$Message.success('Your account has been enrolled!');
          this.$router.push({ path: 'enroll-account', query: { success: true } });
        }
      } catch (e) {
        // handled in vuex
      }
    },
    goToHome() {
      this.$router.push('/');
    }
  }
}
</script>