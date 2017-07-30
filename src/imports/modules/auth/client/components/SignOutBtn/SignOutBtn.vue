<template>
  <button @click="logoutUserAndRedirect" class='SignOutBtn'>Logout</button>
</template>

<script>
import { mapActions } from 'vuex-alt';

export default {
  name: 'SignOutBtn',
  methods: {
    ...mapActions({
      logoutUser: (actions) => actions.auth.logoutUser
    }),
    async logoutUserAndRedirect() {
      try {
        const worked = await this.logoutUser();
        if (worked) {
          this.$router.push('/');
        }
      } catch (e) {
        console.warn('Logout error: ' + e);
      }
    }
  }
}
</script>
