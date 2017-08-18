<style scoped>

</style>

<template>
  <div class='SignInForm'>
    <form @submit.prevent="submitForm">
      <h3>Sign In</h3>
      <div class='email'>
        <label>Email</label>
        <input v-model="formData.username" />
      </div>
      <div class='password'>
        <label>Password</label>
        <input v-model="formData.password" type='password' />
      </div>
      <button type='submit' class='sign-in-submit-btn' :disabled='loggingIn || !formData.password || !formData.username'>Login</button>
    </form>
    <div class='password-reset'>
        <router-link to='reset-password'>Forgot your password?</router-link>  
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex-alt';
import { Meteor } from 'meteor/meteor';

export default {
  name: 'SignInForm',
  components: {
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
    loggingIn: () => Meteor.loggingIn(),
    redirectWhenAuthenticated() {
      // will re-run when Meteor.user() changes, and redirect if appropriate
      if (Meteor.user()) {
        this.$router.push(this.urlRedirect || '/');
      }
    }
  },
  computed: {
    ...mapState({
      urlRedirect: (state) => state.route.query.redirect
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
          this.$router.push(this.urlRedirect || '/');
        }
      } catch (e) {
        console.warn('Authentication error: ' + e);
      }
    }
  }
}
</script>
