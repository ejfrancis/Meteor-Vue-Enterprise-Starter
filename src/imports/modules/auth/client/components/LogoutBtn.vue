<template>
  <button @click="logoutUser" class='LogoutBtn'>Logout</button>
</template>

<script>
import { mapActions } from 'vuex-alt';

export default {
  methods: {
    ...mapActions({
      logoutUser: (actions) => actions.auth.logoutUser
    })
  }
}
</script>
