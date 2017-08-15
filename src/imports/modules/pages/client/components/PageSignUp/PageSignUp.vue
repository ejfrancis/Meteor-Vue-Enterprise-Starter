<style scoped>

</style>

<template>
  <div class='PageSignUp'>
     <sign-up-form /> 
  </div>  
</template>

<script>
import { mapActions } from 'vuex-alt';
import SignUpForm from '/src/imports/modules/auth/client/components/SignUpForm/SignUpForm.vue';

export default {
  components: {
    SignUpForm
  },
  created() {
    this.setLayoutThemeDark();
  },
  destroyed() {
    this.setLayoutThemeLight();
  },
  methods: {
    ...mapActions({
      setLayoutThemeLight: (actions) => actions.layout.setLayoutThemeLight,
      setLayoutThemeDark: (actions) => actions.layout.setLayoutThemeDark
    })
  }
}
</script>