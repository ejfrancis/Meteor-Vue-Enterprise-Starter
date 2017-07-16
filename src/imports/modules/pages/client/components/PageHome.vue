<style scoped>
.config-example {
  color: blue;
}
</style>

<template>
  <layout>
    <div class='PageHome'>
      <h2>Home Page</h2>
      <p>This is some content for the home page.</p>
      <p>Example config.json value on Meteor.settings.public.someConfigValue: <span class='config-example'>{{configValue}}</span> </p>
      <counter />
    </div>
  </layout>
</template>

<script>
import Layout from './../../../layout/client/components/Layout.vue';
import Counter from './../../../counter/client/components/Counter.vue';
import { Meteor } from 'meteor/meteor';

export default {
  components: {
    Layout,
    Counter
  },
  data() {
    return {
      configValue: Meteor.settings.public.someConfigValue
    }
  }
}
</script>