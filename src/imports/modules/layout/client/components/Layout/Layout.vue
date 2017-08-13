<style scoped>
.Layout-children {
  padding: 20px 30px;
}

.nav-mobile-container {
  background: #464c5b;
}
</style>

<template>
  <div class='Layout'>
    <media :query='{ maxWidth: 600 }' @media-enter='handleEnterMobile' @media-leave='handleEnterLarge'>
      <div v-if='isMobileNavVisible'>
        <layout-mobile v-if='isMobileNavVisible'>
          <slot></slot>
        </layout-mobile>
      </div>
    </media>
    <media :query='{ minWidth: 600 }' @media-enter='handleEnterLarge' @media-leave='handleEnterMobile'>
      <div v-if='!isMobileNavVisible'>
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
      isMobileNavVisible: (state) => state.layout.isMobileNavVisible
    })
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