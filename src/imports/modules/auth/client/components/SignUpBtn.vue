<style scoped>
.SignUpBtn {
  display: block;
  border: 1px solid black;
  line-height: 30px;
  height: 30px;
  padding: 0px 10px;
}
.SignUpBtn:hover {
  border: 1px solid white;
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
  <router-link class='SignUpBtn' to='sign-up'>Sign Up</router-link> 
</template>

<script>

export default {
}
</script>
