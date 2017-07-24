<style scoped>
.success {
  color: green;
}
</style>

<template>
  <div class='RegisterForm'>
    <form @submit.prevent="submitForm">
      <h3>Sign Up</h3>
      <div>
        <label>First Name</label>
        <input v-model="formData.firstName" />
      </div>
      <div>
        <label>Last Name</label>
        <input v-model="formData.lastName" />
      </div>
      <div>
        <label>Email</label>
        <input v-model="formData.email" />
      </div>
      <!-- email verification requires setting password after Accounts.sendVerificationEmail -->
      <!-- <div>
        <label>password</label>
        <input v-model="formData.password" type='password'/>
      </div> -->
      <button type='submit' :disabled='!formData.firstName || !formData.lastName || !formData.email'>Register</button>
    </form>
    <p class='success' v-if='enrollAccountEmailSent'>Alright! Please check your email to find a link to complete account registration.</p>
    <auth-error />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex-alt';
import AuthError from './AuthError.vue';

export default {
  components: {
    AuthError
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapState({
      enrollAccountEmailSent: (state) => state.auth.enrollAccountEmailSent
    })
  },
  methods: {
    ...mapActions({
      registerUser: (actions) => actions.auth.registerUser,
      clearRegisterFailure: (actions) => actions.auth.clearRegisterFailure,
    }),
    async submitForm() {
      try {
        await this.registerUser({
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email
        });
      } catch (e) {
        // don't need to handle it, stored in vuex
      }
    }
  }
}
</script>
