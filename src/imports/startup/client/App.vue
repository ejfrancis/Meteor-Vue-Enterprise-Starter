<style lang="scss">
/* global app styles */
// body {
//   font-family: Helvetica, Arial, sans-serif;
//   font-size: 13px;

//   h1, h2, h3, h4, h5 {
//     margin: 10px 0px;
//   }
//   h1 {
//     font-size: 2.4em;
//   }
//   h2 {
//   font-size: 2.0em;
//   }
//   h3 {
//     font-size: 1.6em;
//   }
//   h4 {
//     font-size: 1.4em;
//   }
//   h5 {
//     font-size: 1.2em;
//   }
// }
// html {
//   height: 100%;
// }

// em {
//   font-style: italic;
// }
// strong {
//   font-weight: 600;
// }
// p {
//   padding: 5px 0px;  
// }
// input, button {
//   padding: 5px 5px;
// }

// button, a, p, label, input, strong, em {
//   font-size: 13px !important;
// }
// @media (max-width: 768px) {
//   html, body, button, a, p, label, input, strong, em, .ivu-btn, .ivu-menu-icon {
//     font-size: 1.1em !important;
//   }
// }
// @media (min-width: 768px) {
//   html, button, a, p, label, input, strong, em, .ivu-btn, .ivu-menu-icon {
//     font-size: 1em !important;
//   }
// }

/* iView framework overrides */
.ivu-btn {
  border-radius: 0;
}
.ivu-form-item-required .ivu-form-item-label::before {
  display: none;
}
/* end iView framework override */

/* custom iView extensions */
@media (max-width: 768px) {
  .hidden-xs {
    display: none;
  }
}
@media (min-width: 768px) {
  .hidden-sm {
    display: none;
  }
}
@media (min-width: 992px) {
  .hidden-md {
    display: none;
  }
}
@media (min-width: 1200px) {
  .hidden-lg {
    display: none;
  }
}
/* end custom iView extensions */

</style>

<template>
  <div>
    <!-- layout contains global header/nav/footer, and renders pages inside it -->
    <layout>
      <!-- entire app gets rendered within router-view by vue-router -->
      <router-view></router-view>
    </layout>
  </div>
</template>

<script>
import Layout from '/src/imports/modules/layout/client/components/Layout/Layout.vue';
export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>