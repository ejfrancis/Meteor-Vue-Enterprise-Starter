<style scoped>

</style>

<template>
  <div class='PageSignUp'>
    <p>Hi</p>
     <register-form /> 
  </div>  
</template>

<script>
import RegisterForm from '/src/imports/modules/auth/client/components/RegisterForm.vue';

export default {
  components: {
    RegisterForm
  },
  created() {
    // debugger;
  }
}
</script>