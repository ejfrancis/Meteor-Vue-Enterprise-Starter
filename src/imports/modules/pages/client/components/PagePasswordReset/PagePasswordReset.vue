<style scoped>

</style>

<template>
  <div class='PagePasswordReset'>
     <!-- no token in url and didn't complete changing password, show email form -->
    <div v-if='!token && !changedSuccessfully'>
      <password-reset-email-form />
    </div>
     <!-- token, reset pass form -->
    <div v-if='token'>
      <password-reset-form />
    </div>
    <!-- changed successfully -->
    <div v-if='changedSuccessfully'>
      <h3>Password Reset Success</h3>

      <p><router-link to='home'>Click here</router-link> to go to the home page.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex-alt';
import PasswordResetForm from '/src/imports/modules/accounts/client/components/PasswordResetForm/PasswordResetForm.vue';
import PasswordResetEmailForm from '/src/imports/modules/accounts/client/components/PasswordResetEmailForm/PasswordResetEmailForm.vue';

export default {
  components: {
    PasswordResetEmailForm,
    PasswordResetForm
  },
  computed: {
    ...mapState({
      token: (state) => state.route.query.token,
      changedSuccessfully: (state) => state.route.query.success
    })
  }
}
</script>