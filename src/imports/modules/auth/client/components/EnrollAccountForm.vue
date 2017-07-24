<style scoped>
</style>

<template>
  <div class='EnrollAccountForm'>
    <h3>Account Set Up Completion</h3>

     <form @submit.prevent="submitEnrollAccountForm">
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
// Accounts.resetPassword(token, newPassword, [callback])
import { mapState, mapActions } from 'vuex-alt';
import AuthError from './AuthError';

export default {
  components: {
    AuthError
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
    // TODO: this.clearPasswordResetFailure();
  },
  computed: {
    ...mapState({
      // TODO: enrollAccountSuccess: (state) => state.auth.enrollAccountSuccess,
      // TODO: enrollAccountError: (state) => state.auth.enrollAccountError,
      token: (state) => state.route.query.token,
      changedSuccessfully: (state) => state.route.query.success
    }),
    isNewPasswordSubmitDisabled() {
      return !this.formData.newPassword1 
        || !this.formData.newPassword2 
        || (this.formData.newPassword1 !== this.formData.newPassword2)
        ||  this.formData.newPassword1.length < 2;
    }
  },
  methods: {
    ...mapActions({
      // TODO: enrollAccount: (actions) => actions.auth.enrollAccount,
      // TODO: clearEnrollAccountFailure: (actions) => actions.auth.clearEnrollAccountFailure
    }),
    async submitEnrollAccountForm() {
      try {
        if (this.formData.newPassword1 !== this.formData.newPassword2) {
          return;
        }
        console.log('go');
        // TODO:
        // const enrollSuccess = await this.enrollAccount({ 
        //   token: this.token, 
        //   newPassword: this.formData.newPassword1
        // });
        // if (resetSuccess) {
        //   this.$router.push({ path: 'enroll-account', query: { success: true }});
        // }
      } catch (e) {
        // handled in vuex
      }
    }
  }
}
</script>