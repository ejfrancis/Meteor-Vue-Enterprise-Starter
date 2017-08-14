<style lang="scss">

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