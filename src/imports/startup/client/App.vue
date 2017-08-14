<style lang="scss">
/* iView framework overrides */
.ivu-btn {
  border-radius: 0;
}
// hide * before required fields
.ivu-form-item-required .ivu-form-item-label::before {
  display: none;
}
.ivu-input, .ivu-input-group-append, .ivu-input-group-prepend {
  border-radius: 0;
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