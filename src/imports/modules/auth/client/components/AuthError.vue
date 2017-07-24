<style scoped>
.error {
  color: red;
}
</style>

<template>
  <div class='AuthError'>
    <p class='error' v-if='loginError'>Woops! That wasn't right, please try again.</p>
    <p class='error' v-if='registerError'>{{registerError.reason || registerError.details && registerError.details[0] && registerError.details[0].message || 'Registration failed.'}}</p>
    <p class='error' v-if='passwordResetError'>Your password reset link has expired.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex-alt';

export default {
  computed: {
    ...mapState({
      loginError: (state) => state.auth.loginError,
      registerError: (state) => state.auth.registerError,
      passwordResetError: (state) => state.auth.passwordResetError
    }),
    registerErrorMessage() {
      if (this.registerError && this.registerError.details && this.registerError.details.length > 0) {
        return this.registerError.details[0].message;
      }
      returnregisterError.details && registerError.details[0] && registerError.default[0].message || 'Registration failed.'
    }
  }
}
</script>