<style lang="scss">
/* global app styles */
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;

  h1, h2, h3, h4, h5 {
    margin: 10px 0px;
  }
  h1 {
    font-size: 2.4em;
  }
  h2 {
  font-size: 2.0em;
  }
  h3 {
    font-size: 1.6em;
  }
  h4 {
    font-size: 1.4em;
  }
  h5 {
    font-size: 1.2em;
  }
}
html {
  height: 100%;
}

em {
  font-style: italic;
}
strong {
  font-weight: 600;
}
p {
  padding: 5px 0px;  
}
input, button {
  padding: 5px 5px;
}

/* iView framework overrides */
.ivu-btn {
  border-radius: 0;
}
/* end iView framework override */


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