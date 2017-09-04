<style scoped>

</style>

<template>
  <div class='PageSignIn'>
    <sign-in-form />
  </div>  
</template>

<script>
import SignInForm from '/src/imports/modules/accounts/client/components/SignInForm/SignInForm.vue';

export default {
  name: 'PageSignIn',
  components: {
    SignInForm
  }
}
</script>