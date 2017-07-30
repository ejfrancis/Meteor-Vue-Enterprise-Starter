<style scoped>

</style>

<template>
  <div class='PageSignIn'>
    <sign-in-form />
  </div>  
</template>

<script>
import SignInForm from '/src/imports/modules/auth/client/components/SignInForm.vue';

export default {
  components: {
    SignInForm
  }
}
</script>