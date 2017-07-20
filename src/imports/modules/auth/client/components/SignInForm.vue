<style scoped>
.error {
  color: red;
}
</style>

<template>
  <auth-loading-mask>
    <div class='SignInForm'>
      <form @submit.prevent="submitForm">
        <h3>Login</h3>
        <div>
          <label>username</label>
          <input v-model="formData.username" />
        </div>
        <div>
          <label>password</label>
          <input v-model="formData.password" />
        </div>
        <button type='submit'>Login</button>
      </form>
      <p class='error' v-if='loginError'>Woops! That wasn't right, please try again.</p>
    </div>
  </auth-loading-mask>
</template>

<script>
import { mapActions, mapState } from 'vuex-alt';
import AuthLoadingMask from './AuthLoadingMask.vue';

export default {
  components: {
    AuthLoadingMask
  },
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  destroyed() {
    this.clearLoginFailure();
  },
  meteor: {
    redirectWhenAuthenticated() {
      // will re-run when Meteor.user() changes, and redirect if appropriate
      if (Meteor.user()) {
        this.$router.replace(this.urlRedirect || '/');
      }
    }
  },
  computed: {
    ...mapState({
      urlRedirect: (state) => state.route.query.redirect,
      loginError: (state) => state.auth.loginError
    })
  },
  methods: {
    ...mapActions({
      loginUser: (actions) => actions.auth.loginUser,
      clearLoginFailure: (actions) => actions.auth.clearLoginFailure
    }),
    async submitForm() {
      try {
        const authenticated = await this.loginUser({
          username: this.formData.username,
          password: this.formData.password
        });
        if (authenticated) {
          this.$router.replace(this.urlRedirect || '/');
        }
      } catch (e) {
        console.warn('Authentication error: ' + e);
      }
    }
  }
}
</script>
