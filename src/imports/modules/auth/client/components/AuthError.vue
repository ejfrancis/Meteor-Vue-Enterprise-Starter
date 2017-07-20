<style scoped>
.error {
  color: red;
}
</style>

<template>
  <div class='AuthError'>
    <p class='error' v-if='loginError'>Woops! That wasn't right, please try again.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex-alt';

export default {
    computed: {
      ...mapState({
        loginError: (state) => state.auth.loginError
      })
  }
}
</script>