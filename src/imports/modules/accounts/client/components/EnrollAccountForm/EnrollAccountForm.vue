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

.show-password-checkbox > .ivu-icon {
  margin-left: 10px;
}
</style>

<template>
  <div class='EnrollAccountForm'>
    <!-- enrolling -->
    <div v-if='!changedSuccessfully && !user' class='enroll'>
      <accounts-form-container title='Account Set Up Completion'>
        <Form :model='formData' :rules='formRules'>
          <Row>
            <Col span='24'>
              <Form-item prop='newPassword1' class='password-1' label='Enter your new password'>
                <Input :type='passwordInputType' v-model='formData.newPassword1' placeholder='*****'>
                  <Icon type='locked' slot='append'></Icon>
                </Input>
              </Form-item>
            </Col>
            <Col span='24'>
              <Form-item prop='newPassword2' class='password-2' label='Please re-enter your new password'>
                <Input :type='passwordInputType' v-model='formData.newPassword2' placeholder='*****'>
                  <Icon type='locked' slot='append'></Icon>
                </Input>
              </Form-item>
            </Col>
            <Col span='24'>
              <Form-item>
                <Checkbox 
                  @click.prevent.native='toggleShowPassword()' 
                  :value='showPassword'
                  label='Show password' 
                  class='show-password-checkbox'
                >
                  <Icon type='locked'></Icon>  
                  <span>Show password</span>
                </Checkbox> 
              </Form-item>
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
      </accounts-form-container>
    </div> 
    <!-- success -->
    <div v-if='changedSuccessfully || user'>
      <accounts-form-container title='Account Set Up Complete!'>
        <p class='enrolled'>
          Welcome to {{ siteName}}! To continue to the home page please click below:
        </p>
        <Button 
          type='primary' 
          class='enroll-account-complete-btn'
          @click='goToHome()'
        >
          Go to Home
        </Button>  
      </accounts-form-container>      
    </div>
  </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import { mapState, mapActions } from 'vuex-alt';
import { passwordSchema } from './../../../shared/schemas/password-schema';
import AccountsFormContainer from './../AccountsFormContainer/AccountsFormContainer.vue';

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

export default {
  name: 'EnrollAccountForm',
  components: {
    AccountsFormContainer
  },
  data() {
    // bind to get access to vm formData
    validatePasswordInputs = validatePasswordInputs.bind(this);
    return {
      showPassword: false,
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
      user: (state) => state.accounts.user
    }),
    isNewPasswordSubmitDisabled() {
      if (!this.formData.newPassword1 ||
        !this.formData.newPassword2 ||
        (this.formData.newPassword1 !== this.formData.newPassword2)) {
        return true;
      }
      try {
        passwordSchema.validate({ password: this.formData.newPassword1 });
        return false;
      } catch (e) {
        return true;
      }
    },
    passwordInputType() {
      return this.showPassword === true ? 'text' : 'password';
    },
    siteName() {
      return Meteor.settings.public.siteName;
    }
  },
  methods: {
    ...mapActions({
      enrollVerifyAccount: (actions) => actions.accounts.enrollVerifyAccount,
      clearEnrollAccountFailure: (actions) => actions.accounts.clearEnrollAccountFailure
    }),
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async submitEnrollAccountForm() {
      try {
        const enrollSuccess = await this.enrollVerifyAccount({ token: this.token, newPassword: this.formData.newPassword1 });
        if (enrollSuccess) {
          this.$Message.success({
            content: 'Your account has been enrolled!',
            duration: 10,
            closable: true
          });
          this.$router.push({ path: 'enroll-account', query: { success: true } });
        }
      } catch (e) {
        this.$Message.error({
          content: e.message,
          duration: 10,
          closable: true
        });
      }
    },
    goToHome() {
      this.$router.push('/');
    }
  }
}
</script>