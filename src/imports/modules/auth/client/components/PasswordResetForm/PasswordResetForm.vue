<style scoped>

</style>

<template>
  <div class='PasswordResetForm'>
    <h3>Reset Password</h3>
  
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
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import { passwordSchema } from './../../../shared/schemas/password-schema';

export default {
  name: 'PasswordResetForm',
  components: {
  },
  data() {
    return {
      formData: {
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
    }
  },
  methods: {
    ...mapActions({
      passwordReset: (actions) => actions.auth.passwordReset,
      clearPasswordResetFailure: (actions) => actions.auth.clearPasswordResetFailure
    }),
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