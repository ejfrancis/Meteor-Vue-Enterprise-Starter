<style scoped>

</style>

<template>
  <div class='PageEnrollAccount'>
     <!-- token in url, reset pass form -->
    <!-- <div v-if='token'> -->
      <enroll-account-form />
      <!-- <password-reset-form /> -->
    <!-- </div> -->
    <!-- changed successfully -->
    <!-- <div v-if='changedSuccessfully'>
      <h3>Account Set Up Complete!</h3>

      <p><router-link to='home'>Click here</router-link> to go to the home page.</p>
    </div> --> 
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import EnrollAccountForm from '/src/imports/modules/auth/client/components/EnrollAccountForm/EnrollAccountForm.vue';

export default {
  components: {
    EnrollAccountForm
  },
  created() {
    this.setLayoutThemeDark();
    if (!this.token && !this.changedSuccessfully) {
      console.log('---Page reroute');
      this.$router.push('/');
      return;
    }
  },
  destroyed() {
    this.setLayoutThemeDark();
  },
  methods: {
    ...mapActions({
      setLayoutThemeLight: (actions) => actions.layout.setLayoutThemeLight,
      setLayoutThemeDark: (actions) => actions.layout.setLayoutThemeDark
    })
  },
  computed: {
    ...mapState({
      token: (state) => state.route.query.token,
      changedSuccessfully: (state) => state.route.query.success
    })
  }
}
</script>