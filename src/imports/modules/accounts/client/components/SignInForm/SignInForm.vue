<style scoped>

</style>

<template>
  <div class='SignInForm'>
    <accounts-form-container title='Sign In'>
       <Form :model='formData' :rules='formRules'>
         <Row>
          <Col span='24'>
            <Form-item prop='username' class='email' label='Email'>
              <Input type='text' v-model='formData.username' placeholder='Email'>
              <Icon type='email' slot='append'></Icon>
              </Input>
            </Form-item>
          </Col>
           <Col span='24'>
              <Form-item prop='password' class='password' label='Password'>
                <Input :type='passwordInputType' v-model='formData.password' placeholder='*****'>
                <Icon type='locked' slot='append'></Icon>
                </Input>
              </Form-item>
            </Col>
          <Col :xs='24'>
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
              <Button 
                type='primary' 
                @click='submitForm()' 
                class='sign-in-submit-btn' 
                :disabled='isSubmitDisabled' 
                html-type='submit'
              >
                Sign In
              </Button>
            </Form-item>
            <Form-item>
              <div class='password-reset'>
                <router-link to='reset-password'>Forgot your password?</router-link>  
              </div>
            </Form-item>
          </Col> 
        </Row>
      </Form> 
    </accounts-form-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex-alt';
import { Meteor } from 'meteor/meteor';
import { passwordSchema } from './../../../shared/schemas/password-schema';
import AccountsFormContainer from './../AccountsFormContainer/AccountsFormContainer.vue';

export default {
  name: 'SignInForm',
  components: {
    AccountsFormContainer
  },
  destroyed() {
    this.clearLoginFailure();
  },
  meteor: {
    loggingIn: () => Meteor.loggingIn(),
    redirectWhenAuthenticated() {
      // will re-run when Meteor.user() changes, and redirect if appropriate
      if (Meteor.user()) {
        this.$router.push(this.urlRedirect || '/');
      }
    }
  },
  data() {
    return {
      showPassword: false,
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          { required: true, message: 'Email is required', trigger: 'blur' },
          { type: 'email', message: 'Email must be a valid emai address ', trigger: 'change' }
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      urlRedirect: (state) => state.route.query.redirect
    }),
    passwordInputType() {
      return this.showPassword === true ? 'text' : 'password';
    },
    isSubmitDisabled() {
      return this.loggingIn 
        || !this.formData.password 
        || !this.formData.username;
    }
  },
  methods: {
    ...mapActions({
      loginUser: (actions) => actions.accounts.loginUser,
      clearLoginFailure: (actions) => actions.accounts.clearLoginFailure
    }),
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async submitForm() {
      try {
        const accountsenticated = await this.loginUser({
          username: this.formData.username,
          password: this.formData.password
        });
        if (accountsenticated) {
          this.$router.push(this.urlRedirect || '/');
        }
      } catch (e) {
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
