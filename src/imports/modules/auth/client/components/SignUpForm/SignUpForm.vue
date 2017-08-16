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
</style>

<template>
  <div class='RegisterForm'>
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
        <h1 class='form-title'>Sign Up</h1>
        <Form :model='formData' :rules='formRules'>
          <Row>
            <Col :xs='24' :md='{ span: 11 }'>
              <Form-item prop='firstName' class='first-name' label='First name'>
                <Input type='text' v-model='formData.firstName' placeholder='First name'>
                <Icon type='person' slot='append'></Icon>
                </Input>
              </Form-item>
            </Col>
            <Col :xs='24' :md='{ span: 11, push: 2 }'>
              <Form-item prop='lastName' class='last-name' label='Last name'>
                <Input type='text' v-model='formData.lastName' placeholder='Last name'>
                <Icon type='person' slot='append'></Icon>
                </Input>
              </Form-item>
            </Col>
            <Col :xs='24'>
              <Form-item prop='email' class='email' label='Email'>
                <Input type='text' v-model='formData.email' placeholder='Email'>
                <Icon type='email' slot='append'></Icon>
                </Input>
              </Form-item>
            </Col>
            <Col :xs='24'>
              <Form-item>
                <Button 
                  type='primary' 
                  @click='submitForm()' 
                  class='sign-up-submit-btn' 
                  :disabled='isSubmitDisabled' 
                  html-type='submit'
                >
                  Register
                </Button>
              </Form-item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex-alt';
import AuthError from './../AuthError/AuthError.vue';
import SimpleSchema from 'simpl-schema';
import Media from 'vue-media';

export default {
  name: 'SignUpForm',
  components: {
    AuthError,
    Media
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: ''
      },
      formRules: {
        firstName: [
          { required: true, message: 'First name required', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Last name required', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Email required', trigger: 'blur' },
          { type: 'email', message: 'Email must be a valid emai address ', trigger: 'blur' }
        ]
      }
    }
  },
  destroyed() {
    this.clearRegisterFailure();
  },
  computed: {
    ...mapState({
      enrollAccountEmailSent: (state) => state.auth.enrollAccountEmailSent
    }),
    isSubmitDisabled() {
      return !this.formData.firstName ||
        !this.formData.lastName ||
        !this.formData.email ||
        !SimpleSchema.RegEx.EmailWithTLD.test(this.formData.email);
    }
  },
  methods: {
    ...mapActions({
      registerUser: (actions) => actions.auth.registerUser,
      clearRegisterFailure: (actions) => actions.auth.clearRegisterFailure,
    }),
    async submitForm() {
      try {
        const success = await this.registerUser({
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email
        });
        if (success) {
          this.$Message.success({
            content: 'Email sent',
            duration: 10,
            closable: true
          });
        }
      } catch (e) {
        // don't need to handle it, stored in vuex
        this.$Message.error({
          content: e.message,
          duration: 10,
          closable: true
        });
      }
    }
  }
}
</script>
