<style scoped>
.config-example {
  color: blue;
}

.counter-wrapper {
  margin-top: 20px;
}
</style>

<template>
  <page-base>
    <div class='PageHome'>
      <h2>Home Page</h2>
      <p>This is some content for the home page.</p>
      <p>Example config.json value on Meteor.settings.public.someConfigValue: <span class='config-example'>{{configValue}}</span> </p>
      
      <div class='counter-wrapper'>
        <counter />
      </div>
    </div>
  </page-base>
</template>

<script>
import Counter from '/src/imports/modules/counter/client/components/Counter/Counter.vue';
import { Meteor } from 'meteor/meteor';
import PageBase from './../PageBase/PageBase';

export default {
  name: 'PageHome',
  components: {
    Counter,
    PageBase
  },
  data() {
    return {
      configValue: Meteor.settings.public.someConfigValue
    }
  }
}
</script>