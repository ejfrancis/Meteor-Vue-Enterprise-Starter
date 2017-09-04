<style scoped>

</style>

<template>
  <div class='PageSignUp'>
     <sign-up-form /> 
  </div>  
</template>

<script>
import SignUpForm from '/src/imports/modules/accounts/client/components/SignUpForm/SignUpForm.vue';

export default {
  components: {
    SignUpForm
  }
}
</script>