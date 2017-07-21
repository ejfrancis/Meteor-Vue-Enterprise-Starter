<style scoped>
</style>

<template>
  <div class='ResetPasswordForm'>
    <h3>Reset Password</h3>
    <form @submit.prevent="submitForm">
       <div>
        <label>Enter your email</label>
        <input v-model="formData.email" />
      </div> 
      <button type='submit' :disabled='formData.email.length === 0'>Reset Password</button>
    </form>
    <div v-if='passwordResetEmailSent'>
      Email sent!
    </div>
    <div v-if='passwordResetError'>
      {{ passwordResetError.reason }}
    </div>
    <div v-if='token'>
      Token found in URL.
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
        email: ''
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
    async submitForm() {
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