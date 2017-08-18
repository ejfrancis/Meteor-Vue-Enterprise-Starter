<style scoped>

</style>

<template>
  <div class='PageEnrollAccount'>
    <enroll-account-form />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import EnrollAccountForm from '/src/imports/modules/auth/client/components/EnrollAccountForm/EnrollAccountForm.vue';

export default {
  components: {
    EnrollAccountForm
  },
  beforeMount() {
    this.setLayoutThemeDark();
    if (!this.token && !this.changedSuccessfully) {
      this.$router.push('/');
      return;
    }
  },
  beforeDestroy() {
    this.setLayoutThemeLight();
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