<style scoped>
.success {
  color: green;
}
</style>

<template>
  <div class='RegisterForm'>
    <form @submit.prevent="submitForm">
      <h3>Sign Up</h3>
      <div class='first-name'>
        <label>First Name</label>
        <input v-model="formData.firstName" />
      </div>
      <div class='last-name'>
        <label>Last Name</label>
        <input v-model="formData.lastName" />
      </div>
      <div class='email'>
        <label>Email</label>
        <input v-model="formData.email" />
      </div>
      <!-- email verification requires setting password after Accounts.sendVerificationEmail -->
      <!-- <div>
        <label>password</label>
        <input v-model="formData.password" type='password'/>
      </div> -->
      <button type='submit' class='sign-up-submit-btn' :disabled='isSubmitDisabled'>Register</button>
    </form>
    <p class='success' v-if='enrollAccountEmailSent'>Alright! Please check your email to find a link to complete account registration.</p>
    <auth-error />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex-alt';
import AuthError from './../AuthError/AuthError.vue';
import SimpleSchema from 'simpl-schema';

export default {
  name: 'SignUpForm',
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
  destroyed() {
    this.clearRegisterFailure();
  },
  computed: {
    ...mapState({
      enrollAccountEmailSent: (state) => state.auth.enrollAccountEmailSent
    }),
    isSubmitDisabled() {
      return !this.formData.firstName || 
      !this.formData.lastName || 
      !this.formData.email ||
      !SimpleSchema.RegEx.EmailWithTLD.test(this.formData.email);
    }
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
