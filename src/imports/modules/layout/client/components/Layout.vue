<style scoped>

.Layout-children {
  padding: 20px 30px;
}
</style>

<template>
  <div class='Layout'>
    <app-header/>
    <app-navigation/>
    <div class='Layout-children'>
      <slot></slot> <!--child components rendered in slot -->
    </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue';
import AppNavigation from './AppNavigation.vue';

export default {
  components: {
    AppHeader,
    AppNavigation
  }
}
</script>