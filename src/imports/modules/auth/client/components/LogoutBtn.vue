<template>
  <button @click="logoutUserAndRedirect" class='LogoutBtn'>Logout</button>
</template>

<script>
import { mapActions } from 'vuex-alt';

export default {
  methods: {
    ...mapActions({
      logoutUser: (actions) => actions.auth.logoutUser
    }),
    async logoutUserAndRedirect() {
      try {
        const worked = await this.logoutUser();
        if (worked) {
          this.$router.replace('/');
        }
      } catch (e) {
        console.error('Logout error: ' + e);
      }
    }
  }
}
</script>
