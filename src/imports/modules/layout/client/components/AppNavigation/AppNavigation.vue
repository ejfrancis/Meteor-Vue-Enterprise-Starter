<style scoped>
.AppNavigation {
  width: 100%;
  margin: 0 auto;
  background: orange;
  height: 40px;
}

.navbar-auth-container {
  position: relative;
  float: right;
  margin-right: 10px;
  margin-top: 4px;
}

a:hover {
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
  color: #ebebeb;
}
</style>

<template>
  <nav class='AppNavigation'>
    <Menu mode='horizontal' theme='dark' active-name='1'>
      <div class='layout-nav'>
        <Menu-item name='1'>
          <Icon type='home'></Icon>
          <router-link to='home'>Home</router-link>
        </Menu-item>
        <Menu-item name='2'>
          <Icon type='locked'></Icon>
           <router-link to='private'>Private</router-link>
        </Menu-item>
      </div>
    </Menu>
    <span class='navbar-auth-container'>
      <nav-bar-auth />
    </span>
  </nav>
</template>

<script>
import NavBarAuth from '/src/imports/modules/auth/client/components/NavBarAuth/NavBarAuth.vue';

export default {
  components: {
    NavBarAuth
  }
}
</script>