<style scoped>
.PageBase {
  background: #ffffff;
  margin-top: 20px;
  padding: 15px;
}
</style>

<template>
  <div class='PageBase'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageBase'
}
</script>