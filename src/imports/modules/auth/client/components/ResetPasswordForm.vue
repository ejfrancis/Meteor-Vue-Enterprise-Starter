<style scoped>

</style>

<template>
  <div class='ResetPasswordForm'>
    <h3>Reset Password</h3>
    <!-- no token, send email form -->
    <div v-if='!token'>
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
      <div v-if='passwordResetError'>
        {{ passwordResetError.reason }}
      </div>
    </div>
    <!-- token, reset pass form -->
    <div v-if='token'>
      Token found in URL.
      <form @submit.prevent="submitResetEmailForm">
        <div>
          <label>Enter your new password</label>
          <input type='password' v-model='formData.newPassword1'>
        </div>
        <div>
          <label>Please re-enter your new password</label>
          <input type='password' v-model='formData.newPassword2'>
        </div>
        <button type='submit' :disabled='
          !formData.newPassword1
          || !formData.newPassword2 
          || (formData.newPassword1 !== formData.newPassword2) '>
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { Accounts } from 'meteor/accounts-base';
import { mapState, mapActions } from 'vuex-alt';
import { maskEmailAddress } from './../lib/user-data-masking';

export default {
  data() {
    return {
      formData: {
        email: '',
        newPassword1: '',
        newPassword2: ''
      }
    }
  },
  created() {
    Accounts.onResetPasswordLink((token, done) => {
      console.log('--token=', token);

    });
  },
  filters: {
    maskEmail(emailAddress) {
      return maskEmailAddress(emailAddress);
    }
  },
  computed: {
    ...mapState({
      passwordResetEmailSent: (state) => state.auth.passwordResetEmailSent,
      passwordResetError: (state) => state.auth.passwordResetError,
      token: (state) => state.route.params.token
    })
  },
  methods: {
    ...mapActions({
      sendResetPasswordEmail: (actions) => actions.auth.sendResetPasswordEmail
    }),
    async submitSendEmailForm() {
      try {
        if (!this.formData.email) {
          return;
        }
        await this.sendResetPasswordEmail({ email: this.formData.email });
      } catch (e) {
        // error handled by keeping it in vuex
      }
    },
  }
}
</script>