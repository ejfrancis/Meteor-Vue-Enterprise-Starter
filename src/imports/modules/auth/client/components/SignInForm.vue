<template>
  <div class='SignInForm'>
    <form @submit.prevent="submitForm">
      <h3>Login</h3>
      <label>username</label>
      <input v-model="formData.username" />
      <label>password</label>
      <input v-model="formData.password" />
      <button>Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex-alt';

export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  meteor: {
    redirectWhenAuthenticated() {
      if (Meteor.user()) {
        this.$router.replace(this.urlRedirect || '/');
      }
    }
  },
  computed: {
    ...mapState({
      urlRedirect: (state) => { 
        return state.route.query.redirect;
      }
    })
  },
  methods: {
    ...mapActions({ 
      loginUser: (actions) => actions.auth.loginUser
    }),
    async submitForm() {
      try {
        const authenticated = await this.loginUser({ 
          username: this.formData.username,
          password: this.formData.password
        });
        console.log('--authenticated=', authenticated);
        if (authenticated) {
          this.$router.replace(this.urlRedirect || '/');
        }
      } catch (e) {
        console.error('Authentication error: ' + e);
      }
    }
  }
}
</script>
