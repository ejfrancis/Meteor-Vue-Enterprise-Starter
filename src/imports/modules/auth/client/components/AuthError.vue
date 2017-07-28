<style scoped>
.error {
  color: red;
}
</style>

<template>
  <div class='AuthError'>
    <p class='error login' v-if='loginError'>Woops! That wasn't right, please try again.</p>
    <p class='error register' v-if='registerError'>{{registerError.reason || registerError.details && registerError.details[0] && registerError.details[0].message || 'Registration failed.'}}</p>
    <p class='error password-reset' v-if='passwordResetError'>Your password reset link has expired.</p>
    <p class='error enroll' v-if='enrollAccountError'>{{ enrollAccountErrorMessage }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex-alt';
import { passwordSchema } from './../../shared/schemas/password-schema';

export default {
  name: 'AuthError',
  data() {
    return {
      enrollAccountErrorMessage: passwordSchema.summary
    }
  },
  computed: {
    ...mapState({
      loginError: (state) => state.auth.loginError,
      registerError: (state) => state.auth.registerError,
      passwordResetError: (state) => state.auth.passwordResetError,
      enrollAccountError: (state) => state.auth.enrollAccountError
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