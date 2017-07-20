<template>
  <div class='RegisterForm'>
    <form @submit.prevent="submitForm">
      <h3>Register</h3>
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
        <input v-model="formData.password" />
      </div>
      <button type='submit'>Register</button>
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
  meteor: {
    redirectLoggedInUser () {
      if (Meteor.user()) {
        this.$router.replace('/');
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
