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
a {
  color: #a6a4a4;
}
.ivue-btn:hover {
  border-color: white !important;
}
</style>

<template>
  <div class='LayoutLarge'>
    <nav class='nav-large-container'>
      <!-- horizontal nav -->
      <Menu mode='horizontal' theme='dark' active-name='1' @on-select='goToRoute'>
        <Row type='flex'>
          <Col span='16'>
            <Menu-item 
              v-for='route in navRoutes' 
              :key='route.name' 
              :name='route.name'
            >
              <Icon :type='route.icon'></Icon>
              <router-link :to='route.path'>{{ route.name }}</router-link>
            </Menu-item>
          </Col>
          <!-- auth buttons -->
          <Col span='8' theme='dark'>
            <nav-bar-auth theme='light'/>
          </Col>
        </Row>
      </Menu>
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
  name: 'LayoutLarge',
  components: {
    NavBarAuth
  },
  computed: {
    ...mapState({
      navRoutes: (state) => state.layout.navRoutes
    })
  },
  methods: {
    goToRoute(name) {
      this.$router.push({ path: name });
    }
  }
}
</script>