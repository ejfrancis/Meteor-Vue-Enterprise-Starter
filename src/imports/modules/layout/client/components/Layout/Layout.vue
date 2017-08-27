<style scoped>
.Layout {
  height: 100%;
}
.light {
  background: #ffffff;
}
.dark {
  background: #f4f3f3;
}
.layout-large-container {
  height: 100%;
}
.layout-mobile-container {
  height: 100%;
}
/* 
.Layout-children {
  padding: 20px 30px;
}
*/
.nav-mobile-container {
  background: #464c5b;
}
</style>

<template>
  <div class='Layout' v-bind:class='{ "light": isLightTheme, "dark": isDarkTheme }'>
    <media :query='{ maxWidth: 768 }' @media-enter='handleEnterMobile'>
      <div v-if='isMobileNavVisible' class='layout-mobile-container'>
        <layout-mobile>
          <slot></slot>
        </layout-mobile>
      </div>
    </media>
    <media :query='{ minWidth: 768 }' @media-enter='handleEnterLarge'>
      <div v-if='!isMobileNavVisible' class='layout-large-container'>
        <layout-large>
          <slot></slot>
        </layout-large>
      </div>
    </media>
  </div>
</template>

<script>
import Media from 'vue-media';
import { mapState, mapActions } from 'vuex-alt';
import LayoutMobile from './../LayoutMobile/LayoutMobile.vue';
import LayoutLarge from './../LayoutLarge/LayoutLarge.vue';

export default {
  name: 'Layout',
  components: {
    Media,
    LayoutMobile,
    LayoutLarge
  },
  computed: {
    ...mapState({
      isMobileNavVisible: (state) => state.layout.isMobileNavVisible,
      layoutTheme: (state) => state.layout.layoutTheme
    }),
    isLightTheme() {
      return this.layoutTheme === 'light';
    },
    isDarkTheme() {
      return this.layoutTheme === 'dark';
    }
  },
  methods: {
    ...mapActions({
      showMobileNav: (actions) => actions.layout.showMobileNav,
      showLargeNav: (actions) => actions.layout.showLargeNav
    }),
    handleEnterMobile() {
      if (!this.isMobileNavVisible) {
        this.showMobileNav();
      }
    },
    handleEnterLarge() {
      if (this.isMobileNavVisible) {
        this.showLargeNav();
      }
    }
  }
}
</script>