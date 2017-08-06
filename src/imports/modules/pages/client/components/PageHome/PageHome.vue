<style scoped>
.config-example {
  color: blue;
}
</style>

<template>
  <div class='PageHome'>
    <h2>Home Page</h2>
    <p>This is some content for the home page.</p>
    <p>Example config.json value on Meteor.settings.public.someConfigValue: <span class='config-example'>{{configValue}}</span> </p>
    <counter />
  </div>
</template>

<script>
import Counter from '/src/imports/modules/counter/client/components/Counter/Counter.vue';
import { Meteor } from 'meteor/meteor';

export default {
  components: {
    Counter
  },
  data() {
    return {
      configValue: Meteor.settings.public.someConfigValue
    }
  }
}
</script>