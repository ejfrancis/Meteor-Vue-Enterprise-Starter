<style scoped>
.LayoutMobile {
  height: 100%;
}
.layout-children {
  padding: 0 30px 20px 30px;
}

.nav-mobile-container {
  background: #464c5b;
  height: 100vh;
}

.nav-mobile-container-hidden {
  width: 0;
}
.accounts-buttons-container {
  margin-top: 7px;
  margin-right: 20px;
}

/* vue-router active class */
.router-link-exact-active {
  color: white;
  font-weight: bold;
}

a {
  color: #a6a4a4;
}


/* icol expand transition */

.ivu-col {
  transition: width .2s ease-in-out;
}
</style>

<template>
  <div class='LayoutMobile'>
    <Row type='flex'>
      <Col :span='mobileNavSpanLeft' v-bind:class='{ "nav-mobile-container-hidden": !isMobileNavExpanded }'>
        <nav class='nav-mobile-container'>
          <Menu active-name='1' theme='dark' width='auto' v-if='areMobileNavItemsVisible' @on-select='goToRoute'>
            <Menu-item v-for='route in navRoutes' :key='route.name' :name='route.name'>
              <Icon :type='route.icon'></Icon>
              <router-link :to='{ name: route.name }'>{{ route.displayName }}</router-link>
            </Menu-item>
          </Menu>
        </nav>
      </Col>
      <Col :span='mobileNavSpanRight'>
        <Row>
          <Col span='8'>
            <div class='nav-mobile-toggle'>
              <i-button type='text' @click='toggleMobileNavExpanded'>
                <Icon type='navicon' size='32'></Icon>
              </i-button>
            </div>
          </Col>
          <Col span='16'>
            <div class='accounts-buttons-container'>
              <nav-bar-accounts theme='dark'/>
            </div>
          </Col>
        </Row>
        <div class='layout-children'>
          <!--child components rendered in slot -->
          <slot></slot>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import NavBarAccounts from '/src/imports/modules/accounts/client/components/NavBarAccounts/NavBarAccounts.vue';

export default {
  name: 'LayoutMobile',
  components: {
    NavBarAccounts
  },
  data() {
    return {
      // used for transition timeout
      areMobileNavItemsVisible: true
    }
  },
  destroyed() {
    // when transitioning to large nav, set mobile nav back to expanded
    if (!this.isMobileNavExpanded) {
      this.toggleMobileNavExpanded();
    }
  },
  watch: {
    isMobileNavExpanded(newValue, oldValue) {
      if (newValue === false) {
        // when mobile nav is hidden, hide nav items so they don't protrude outside the collapsing sidebar
        this.areMobileNavItemsVisible = false;
      } else {
        // when mobile nav is shown, show nav items after a 200ms delay to wait for the expand animation to
        // be complete, so that they don't protrude outside the expanding sidebar
        setTimeout(() => {
          this.areMobileNavItemsVisible = true;
        }, 200);
      }
    }
  },
  methods: {
    ...mapActions({
      toggleMobileNavExpanded: (state) => state.layout.toggleMobileNavExpanded
    }),
    goToRoute(name) {
      this.$router.push({ path: name });
    }
  },
  computed: {
    ...mapState({
      navRoutes: (state) => state.layout.navRoutes,
      isMobileNavExpanded: (state) => state.layout.isMobileNavExpanded
    }),
    // left + right span must total to 24 for iView grid system
    mobileNavSpanLeft() {
      return this.isMobileNavExpanded
        ? 6
        : 1;
    },
    mobileNavSpanRight() {
      return this.isMobileNavExpanded
        ? 18
        : 24;
    }
  }
}
</script>