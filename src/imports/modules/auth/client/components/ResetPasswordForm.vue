<style scoped>
</style>

<template>
  <div class='ResetPasswordForm'>
    <h3>Reset Password</h3>
    <form @submit.prevent="submitForm">
      <div>
        <label>Enter your email</label>
        <input v-model="formData.email" />
      </div>
      <button type='submit'>Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: ''
      }
    }
  },
  methods: {
    submitForm() {
      console.log('--submit reset');
    }
  }
}
</script>