<style scoped>
.layout-children {
  padding: 20px 30px;
}

.nav-large-container {
  width: 100%;
  margin: 0 auto;
  height: 40px;
}

/* vue-router active class */
.router-link-exact-active {
  color: white;
  font-weight: bold;
}
</style>

<template>
  <div class='LayoutLarge'>
    <nav class='nav-large-container'>
      <Row type='flex'>
        <i-col span='24'>
          <!-- horizontal nav menu -->
          <Menu mode='horizontal' theme='dark' active-name='1'>
            <i-col span='18'>
              <Menu-item 
                v-for='route in navRoutes' 
                :key='route.name' 
                :name='route.name'
              >
                <Icon :type='route.icon'></Icon>
                <router-link :to='route.path'>{{ route.name }}</router-link>
              </Menu-item>
            </i-col>
            <!-- auth buttons -->
            <i-col span='6' theme='dark'>
              <nav-bar-auth />
            </i-col>
          </Menu>
        </i-col>
      </Row>
    </nav>
    <div class='layout-children'>
      <!--child components rendered in slot -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex-alt';
import NavBarAuth from '/src/imports/modules/auth/client/components/NavBarAuth/NavBarAuth.vue';

export default {
  components: {
    NavBarAuth
  },
  computed: {
    ...mapState({
      navRoutes: (state) => state.layout.navRoutes
    })
  }
}
</script>