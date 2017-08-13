<style scoped>
.ivu-btn {
  color: white;
}
a {
  text-decoration: none;
}

</style>

<template>
  <Button class='SignInBtn' type='ghost' @click='handleClick'>
    Sign In
  </Button>
</template>

<script>

export default {
  name: 'SignInBtn',
  methods: {
    handleClick() {
      this.$router.push({ path: 'sign-in' });
    }
  }
}
</script>
