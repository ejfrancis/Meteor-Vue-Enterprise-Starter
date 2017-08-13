<style scoped>
.ivu-btn {
  color: white;
}
a {
  text-decoration: none;
}
</style>

<template>
  <Button class='SignUpBtn' type='ghost' @click='handleClick'>
    Sign Up
  </Button>
</template>

<script>

export default {
  name: 'SignUpBtn',
   methods: {
    handleClick() {
      this.$router.push({ path: 'sign-up' });
    }
  }
}
</script>
