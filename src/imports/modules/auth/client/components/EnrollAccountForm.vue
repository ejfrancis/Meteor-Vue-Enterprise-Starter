<style scoped>

</style>

<template>
  <div class='EnrollAccountForm'>
    <h3>Account Set Up Completion</h3>
  
    <div class='enroll' v-if='!enrolledAccountSuccessfully'>
      <form @submit.prevent="submitEnrollAccountForm" class='enroll-password-form'>
        <div class='password-1'>
          <label>Enter your new password</label>
          <input type='password' v-model='formData.newPassword1'>
        </div>
        <div class='password-2'>
          <label>Please re-enter your new password</label>
          <input type='password' v-model='formData.newPassword2'>
        </div>
        <button type='submit' :disabled='isNewPasswordSubmitDisabled '>
          Submit
        </button>
      </form>
      <auth-error/>
    </div>
    <div class='enrolled' v-if='enrolledAccountSuccessfully'>
      Success!
    </div>
  
  </div>
</template>

<script>
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
    this.clearEnrollAccountFailure();
  },
  computed: {
    ...mapState({
      token: (state) => state.route.query.token,
      enrolledAccountSuccessfully: (state) => state.route.query.success
    }),
    isNewPasswordSubmitDisabled() {
      if (!this.formData.newPassword1 ||
        !this.formData.newPassword2 ||
        (this.formData.newPassword1 !== this.formData.newPassword2)) {
        return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions({
      enrollVerifyAccount: (actions) => actions.auth.enrollVerifyAccount,
      clearEnrollAccountFailure: (actions) => actions.auth.clearEnrollAccountFailure
    }),
    async submitEnrollAccountForm() {
      try {
        if (this.formData.newPassword1 !== this.formData.newPassword2) {
          return;
        }
        const enrollSuccess = await this.enrollVerifyAccount({ token: this.token, newPassword: this.formData.newPassword1 });
        if (enrollSuccess) {
          this.$router.push({ path: 'enroll-account', query: { success: true } });
        }
      } catch (e) {
        // handled in vuex
      }
    }
  }
}
</script>