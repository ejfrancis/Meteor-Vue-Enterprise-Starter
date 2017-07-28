<style scoped>

</style>

<template>
  <div class='PasswordResetEmailForm'>
    <h3>Reset Password</h3>
  
    <form @submit.prevent="submitSendEmailForm">
      <div>
        <label>Enter your email</label>
        <input v-model='formData.email' />
      </div>
      <button type='submit' :disabled='formData.email.length === 0'>Reset Password</button>
      <div v-if='passwordResetEmailSent'>
        Email sent!
      </div>
    </form>
    <auth-error/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import { maskEmailAddress } from './../lib/user-data-masking';
import AuthError from './AuthError';

export default {
  name: 'PasswordResetEmailForm',
  components: {
    AuthError
  },
  data() {
    return {
      formData: {
        email: ''
      }
    }
  },
  destroyed() {
    this.clearPasswordResetFailure();
  },
  computed: {
    ...mapState({
      passwordResetEmailSent: (state) => state.auth.passwordResetEmailSent
    }),
    isNewPasswordSubmitDisabled() {
      return !this.formData.newPassword1
        || !this.formData.newPassword2
        || (this.formData.newPassword1 !== this.formData.newPassword2)
        || this.formData.newPassword1.length < 2;
    }
  },
  methods: {
    ...mapActions({
      sendPasswordResetEmail: (actions) => actions.auth.sendPasswordResetEmail,
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
    }
  }
}
</script>