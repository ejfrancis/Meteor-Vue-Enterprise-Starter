<style scoped>
.AuthLoadingMask {
  position: relative;
}
.loading-mask-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.loading-mask {
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(227, 176, 146, 0.32);
  position: absolute;
}
</style>
<template>
  <div class='AuthLoadingMask'>
    <div v-if='loggingIn' class='loading-mask'></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  meteor: {
    loggingIn: () => Meteor.loggingIn()
  }
}
</script>