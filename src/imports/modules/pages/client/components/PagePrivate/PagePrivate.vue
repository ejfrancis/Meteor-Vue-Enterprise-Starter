<style scoped>

</style>

<template>
  <page-base>
    <div class='PagePrivate'>
      <h2>Private Page</h2>
      <p>You can only view this page if you're signed in.</p>
    </div>
  </page-base>
</template>

<script>
import PageBase from './../PageBase/PageBase';

export default {
  components: {
    PageBase
  }
}
</script>