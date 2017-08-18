<style scoped>

</style>

<template>
  <div class='PasswordResetForm'>
    <accounts-form-container title='Reset Password'>
      <Form :model='formData' :rules='formRules'>
        <Row>
          <Col :xs='24'>
            <Form-item prop='newPassword1' class='password-1' label='Enter your new password'>
              <Input :type='passwordInputType' v-model='formData.newPassword1' placeholder='*****'>
              <Icon type='locked' slot='append'></Icon>
              </Input>
            </Form-item>
            <Form-item prop='newPassword2' class='password-2' label='Please re-enter your new password'>
              <Input :type='passwordInputType' v-model='formData.newPassword2' placeholder='*****'>
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
                @click='submitResetPasswordForm()' 
                class='password-reset-submit-btn' 
                :disabled='isNewPasswordSubmitDisabled' 
                html-type='submit'
              >
                Reset Password
              </Button>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </accounts-form-container>
    <!-- <h3>Reset Password</h3>
  
    <form @submit.prevent="submitResetPasswordForm">
      <div class='password-1'>
        <label>Enter your new password</label>
        <input type='password' v-model='formData.newPassword1'>
      </div>
      <div class='password-2'>
        <label>Please re-enter your new password</label>
        <input type='password' v-model='formData.newPassword2'>
      </div>
      <button type='submit' class='submit-form-btn' :disabled='isNewPasswordSubmitDisabled '>
        Submit
      </button>
    </form> -->
  </div>
</template>

<script>
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
  name: 'PasswordResetForm',
  components: {
    AccountsFormContainer
  },
  data() {
    validatePasswordInputs = validatePasswordInputs.bind(this);
    return {
      showPassword: false,
      formData: {
        newPassword1: '',
        newPassword2: ''
      },
      formRules: {
        newPassword1: [
          { required: true, message: 'Password is required', trigger: 'change' },
          { validator: validatePasswordInputs }
        ],
        newPassword2: [
          { required: true, message: 'Password is required', trigger: 'change' },
          { validator: validatePasswordInputs }
        ]
      }
    }
  },
  destroyed() {
    this.clearPasswordResetFailure();
  },
  computed: {
    ...mapState({
      token: (state) => state.route.query.token
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
    }
  },
  methods: {
    ...mapActions({
      passwordReset: (actions) => actions.auth.passwordReset,
      clearPasswordResetFailure: (actions) => actions.auth.clearPasswordResetFailure
    }),
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async submitResetPasswordForm() {
      try {
        if (this.formData.newPassword1 !== this.formData.newPassword2) {
          return;
        }
        const resetSuccess = await this.passwordReset({
          token: this.token,
          newPassword: this.formData.newPassword1
        });
        if (resetSuccess) {
          this.$Message.success({
            content: 'Password reset complete!',
            duration: 10,
            closable: true
          });
          this.$router.push({ path: 'reset-password', query: { success: true } });
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