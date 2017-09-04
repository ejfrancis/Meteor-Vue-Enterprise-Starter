<style scoped>
.Page {
  background: #ffffff;
  margin-top: 20px;
  padding: 15px;
}
</style>

<template>
  <div class='Page'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageBase'
}
</script>