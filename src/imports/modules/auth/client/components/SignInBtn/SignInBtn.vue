<style scoped>
.SignInBtn {
  display: block;
  /* border: 1px solid black; */
  line-height: 30px;
  height: 30px;
  padding: 0px 10px;
}
a {
  text-decoration: none;
  color: black;
}
a:hover {
  color: white;
}
</style>

<template>
  <router-link class='SignInBtn' to='sign-in'>Sign In</router-link> 
</template>

<script>

export default {
  name: 'SignInBtn'
}
</script>
