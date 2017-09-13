<style scoped>
h2 {
  text-align: center;
}
</style>

<template>
  <page-base>
    <div class='PageAccountsAdminInvites'>
      <h2>Invites</h2>
    </div>
  </page-base>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import PageBase from './../PageBase/PageBase';
// import AccountsAdminUsersList from '/src/imports/modules/accounts/client/components/AccountsAdminUsersList/AccountsAdminUsersList.vue';

export default {
  name: 'PageAccountsAdminInvites',
  components: {
    PageBase
  }
}
</script>