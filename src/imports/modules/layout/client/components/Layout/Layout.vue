<style scoped>
.Layout {
  height: 100%;
}

.light {
  background: white;
}

.dark {
  background: #f4f3f3;
}


/* .layout-large-container {
  height: 100%;
} */


/* .layout-mobile-container {
  height: 100%;
} */

.Layout-children {
  padding: 20px 30px;
  background: #f4f3f3;
}

.nav-mobile-container {
  background: #464c5b;
}
.nav-mobile-container-hidden {
  width: 0;
}
.accounts-buttons-container {
  padding-right: 20px;
}
a {
  color: #a6a4a4;
}

.height100 {
  height: 100%;
}


/* icol expand transition */

.ivu-col {
  transition: width .2s ease-in-out;
}
</style>

<template>
  <div class='Layout' v-bind:class='{ "light": isMobileNavVisible, "dark": !isMobileNavVisible }'>
    <!-- mobile nav -->
    <media :query='{ maxWidth: 768 }' @media-enter='handleEnterMobile'></media>
    <!-- large nav -->
    <media :query='{ minWidth: 768 }' @media-enter='handleEnterLarge'>
      <div v-if='!isMobileNavVisible' class='layout-large-container'>
         <nav class='nav-large-container'>
          <!-- large horizontal nav menu -->
          <Menu mode='horizontal' theme='dark' active-name='1' @on-select='goToRoute'>
            <Row type='flex' class='height100'>
              <Col span='16'>
              <Menu-item v-for='route in navRoutes' :key='route.name' :name='route.name'>
                <Icon :type='route.icon'></Icon>
                <router-link :to='{ name: route.name }'>{{ route.displayName }}</router-link>
              </Menu-item>
              </Col>
              <!-- accounts buttons -->
              <Col span='8' theme='dark'>
                <div class='accounts-buttons-container'>
                  <nav-bar-accounts theme='light' />
                </div>
              </Col>
            </Row>
          </Menu>
        </nav>
      </div>
    </media>
    <Row type='flex' > <!-- height100 -->
      <Col :span='layoutColumnsLeftSpan' v-bind:class='{ "nav-mobile-container-hidden": !isMobileNavExpanded, "heigh100": true }'>
        <!-- mobile sidebar nav -->
        <nav class='nav-mobile-container height100'>
          <Menu active-name='1' theme='dark' width='auto' v-if='areMobileNavItemsVisible' @on-select='goToRoute'>
            <Menu-item v-for='route in navRoutes' :key='route.name' :name='route.name'>
              <Icon :type='route.icon'></Icon>
              <router-link :to='{ name: route.name }'>{{ route.displayName }}</router-link>
            </Menu-item>
          </Menu>
        </nav>
      </Col>
      <Col :span='layoutColumnsRightSpan' :offset='layoutColumnsRightOffset'>
        <Row v-if='isMobileNavVisible'>
          <!-- mobile sidebar toggle -->
          <Col span='8'>
            <div class='nav-mobile-toggle'>
              <i-button type='text' @click='toggleMobileNavExpanded'>
                <Icon type='navicon' size='32'></Icon>
              </i-button>
            </div>
          </Col>
          <!-- accounts buttons (login, sign up, log out, etc) -->
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
import Media from 'vue-media';
import { mapState, mapActions } from 'vuex-alt';
import NavBarAccounts from '/src/imports/modules/accounts/client/components/NavBarAccounts/NavBarAccounts.vue';

export default {
  name: 'Layout',
  components: {
    Media,
    NavBarAccounts
  },
  destroyed() {
    // when transitioning to large nav, set mobile nav back to expanded
    if (!this.isMobileNavExpanded) {
      this.toggleMobileNavExpanded();
    }
  },
  data() {
    return {
      // used for transition timeout
      areMobileNavItemsVisible: true
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
  computed: {
    ...mapState({
      isMobileNavVisible: (state) => state.layout.isMobileNavVisible,
      layoutTheme: (state) => state.layout.layoutTheme,
      navRoutes: (state) => state.layout.navRoutes,
      isMobileNavExpanded: (state) => state.layout.isMobileNavExpanded
    }),
    isLightTheme() {
      return this.layoutTheme === 'light';
    },
    isDarkTheme() {
      return this.layoutTheme === 'dark';
    },
    // left + right span must total to 24 for iView grid system
    layoutColumnsLeftSpan() {
      if (!this.isMobileNavVisible) {
        return 0;
      }
      return this.isMobileNavExpanded
        ? 6
        : 1;
    },
    layoutColumnsRightSpan() {
      if (!this.isMobileNavVisible) {
        return 22;
      }
      return this.isMobileNavExpanded
        ? 18
        : 24;
    },
    layoutColumnsRightOffset() {
      if (this.isMobileNavVisible) {
        return 0;
      }
      return 1;
    }
  },
  methods: {
    ...mapActions({
      showMobileNav: (actions) => actions.layout.showMobileNav,
      showLargeNav: (actions) => actions.layout.showLargeNav,
      toggleMobileNavExpanded: (state) => state.layout.toggleMobileNavExpanded
    }),
    goToRoute(name) {
      this.$router.push({ name });
    },
    handleEnterMobile() {
      // when transitioning to mobile nav, set mobile nav back to expanded
      if (!this.isMobileNavExpanded) {
        this.toggleMobileNavExpanded();
      }
      if (!this.isMobileNavVisible) {
        this.showMobileNav();
      }
    },
    handleEnterLarge() {
      // when transitioning to large nav, set mobile nav to collapsed/hidden
      if (this.isMobileNavExpanded) {
        this.toggleMobileNavExpanded();
      }
      if (this.isMobileNavVisible) {
        this.showLargeNav();
      }
    }
  }
}
</script>