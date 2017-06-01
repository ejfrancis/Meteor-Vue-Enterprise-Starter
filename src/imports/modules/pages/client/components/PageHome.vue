<style scoped>

</style>

<template>
  <layout>
    <div class='PageHome'>
      <h2>Home Page</h2>
      <p>This is some content for the home page.</p>
      <counter />
    </div>
  </layout>
</template>

<script>
import Layout from './../../../layout/client/components/Layout.vue';
import Counter from './../../../counter/client/components/Counter.vue';

export default {
  components: {
    Layout,
    Counter
  }
}
</script>