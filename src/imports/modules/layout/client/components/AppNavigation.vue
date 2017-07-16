<style scoped>
.AppNavigation {
  width: 100%;
  margin: 0 auto;
  background: orange;
  height: 40px;
}

a:hover{
  background-color: gray;
  color: white;
}
a {
  padding: 0 10px;
  display: inline-block;
  font-weight: 700;
  color: gray;
  height: 40px;
  line-height: 40px;
  text-decoration: none;
  margin-left: -2px;
  margin-right: -2px;
}

/* class is added by vue-router automatically to active route */
.router-link-active {
  background: #ebebeb;
}
</style>

<template>
  <nav class='AppNavigation'>
    <router-link to="home">Home</router-link>
    <router-link to="about">About</router-link>
  </nav>
</template>

<script>
export default {
  
}
</script>