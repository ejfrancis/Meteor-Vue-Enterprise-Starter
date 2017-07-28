<style scoped>

</style>

<template>
  <div class='PasswordResetForm'>
    <h3>Reset Password</h3>
  
    <form @submit.prevent="submitResetPasswordForm">
      <div>
        <label>Enter your new password</label>
        <input type='password' v-model='formData.newPassword1'>
      </div>
      <div>
        <label>Please re-enter your new password</label>
        <input type='password' v-model='formData.newPassword2'>
      </div>
      <button type='submit' :disabled='isNewPasswordSubmitDisabled '>
        Submit
      </button>
    </form>
    <auth-error/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import AuthError from './AuthError';
import { passwordSchema } from './../../shared/schemas/password-schema';

export default {
  name: 'PasswordResetForm',
  components: {
    AuthError
  },
  data() {
    return {
      formData: {
        email: '',
        newPassword1: '',
        newPassword2: ''
      }
    }
  },
  destroyed() {
    this.clearPasswordResetFailure();
  },
  computed: {
    ...mapState({
      passwordResetEmailSent: (state) => state.auth.passwordResetEmailSent,
      passwordResetError: (state) => state.auth.passwordResetError,
      token: (state) => state.route.query.token,
      changedSuccessfully: (state) => state.route.query.success
    }),
    isNewPasswordSubmitDisabled() {
      if (!this.formData.newPassword1 ||
        !this.formData.newPassword2 ||
        (this.formData.newPassword1 !== this.formData.newPassword2)) {
        return true;
      }
      try {
        passwordSchema.validate({ password: this.formData.newPassword });
        return false;
      } catch (e) {
        return true;
      }
    }
  },
  methods: {
    ...mapActions({
      sendPasswordResetEmail: (actions) => actions.auth.sendPasswordResetEmail,
      passwordReset: (actions) => actions.auth.passwordReset,
      clearPasswordResetFailure: (actions) => actions.auth.clearPasswordResetFailure
    }),
    async submitSendEmailForm() {
      try {
        if (!this.formData.email) {
          return;
        }
        await this.sendPasswordResetEmail({ email: this.formData.email });
      } catch (e) {
        // error handled by keeping it in vuex
      }
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
          this.$router.push({ path: 'reset-password', query: { success: true } });
        }
      } catch (e) {
        // handled in vuex
      }
    }
  }
}
</script>