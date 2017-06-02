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


</style>

<template>
  <div>
    <!-- entire app rendered within router-view -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>