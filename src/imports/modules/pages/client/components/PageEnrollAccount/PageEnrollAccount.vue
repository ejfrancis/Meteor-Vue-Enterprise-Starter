<style scoped>

</style>

<template>
  <div class='PageEnrollAccount'>
    <enroll-account-form />
  </div>
</template>

<script>
import { mapState } from 'vuex-alt';
import EnrollAccountForm from '/src/imports/modules/accounts/client/components/EnrollAccountForm/EnrollAccountForm.vue';

export default {
  name: 'PageEnrollAccount',
  components: {
    EnrollAccountForm
  },
  beforeMount() {
    if (!this.token && !this.changedSuccessfully) {
      this.$router.push('/');
      return;
    }
  },
  computed: {
    ...mapState({
      token: (state) => state.route.query.token,
      changedSuccessfully: (state) => state.route.query.success
    })
  }
}
</script>