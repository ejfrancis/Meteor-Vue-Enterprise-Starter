<template>
  <div class='RegisterForm'>
    <form @submit.prevent="submitForm">
      <h3>Sign Up</h3>
      <div>
        <label>username</label>
        <input v-model="formData.username" />
      </div>
      <div>
        <label>email</label>
        <input v-model="formData.email" />
      </div>
      <div>
        <label>password</label>
        <input v-model="formData.password" type='password'/>
      </div>
      <button type='submit'>Register</button>
    </form>
    <auth-error />
  </div>
</template>

<script>
import { mapActions } from 'vuex-alt';
import AuthError from './AuthError.vue';

export default {
  components: {
    AuthError
  },
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      registerUser: (actions) => actions.auth.registerUser,
      clearRegisterFailure: (actions) => actions.auth.clearRegisterFailure
    }),
    async submitForm() {
      try {
        this.registerUser({
          username: this.formData.username,
          email: this.formData.email,
          password: this.formData.password
        });
      } catch (e) {
        // don't need to handle it, stored in vuex
      }
    }
  }
}
</script>
