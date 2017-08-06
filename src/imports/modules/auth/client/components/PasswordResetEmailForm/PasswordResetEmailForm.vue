<style scoped>
.sent-success {
  color: green;
}
</style>

<template>
  <div class='PasswordResetEmailForm'>
    <h3>Reset Password</h3>
  
    <form @submit.prevent="submitSendEmailForm">
      <div class='email'>
        <label>Enter your email</label>
        <input v-model='formData.email' />
      </div>
      <button type='submit' class='submit-form-btn' :disabled='formData.email.length === 0'>Reset Password</button>
      <div class='sent-success' v-if='passwordResetEmailSent'>
        Email sent!
      </div>
    </form>
    <auth-error/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import AuthError from './../AuthError/AuthError.vue';

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
    })
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