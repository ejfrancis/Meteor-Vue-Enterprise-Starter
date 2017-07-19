<template>
  <div class='RegisterForm'>
    <form @submit.prevent="submitForm">
      <h3>Register</h3>
      <label>username</label>
      <input v-model="formData.username"/>
      <label>email</label>
      <input v-model="formData.email"/>
      <label>password</label>
      <input v-model="formData.password" />
      <button>Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex-alt';

export default {
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
      registerUser: (actions) => actions.auth.registerUser
    }),
    submitForm() {
      this.registerUser({
        username: this.formData.username,
        email: this.formData.email,
        password: this.formData.password
      });
    }
  }
}
</script>
