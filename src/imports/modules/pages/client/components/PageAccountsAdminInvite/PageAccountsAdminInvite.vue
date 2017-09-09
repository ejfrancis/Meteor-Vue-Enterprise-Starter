<style scoped>
h2 {
  text-align: center;
}
</style>

<template>
  <page-base>
    <div class='PageAccountsAdminInvite'>
      <h2>Invites</h2>
    </div>
  </page-base>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import PageBase from './../PageBase/PageBase';
// import AccountsAdminUsersList from '/src/imports/modules/accounts/client/components/AccountsAdminUsersList/AccountsAdminUsersList.vue';

export default {
  name: 'PageAccountsAdmin',
  components: {
    PageBase
    // AccountsAdminUsersList
  }
}
</script>