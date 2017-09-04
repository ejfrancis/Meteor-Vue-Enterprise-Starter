<style scoped>
.accounts-admin-users-list-wrapper {
  margin-top: 20px;
}
h2 {
  text-align: center;
}
</style>

<template>
  <page-base>
    <div class='PageAccountsAdmin'>
      <h2>Accounts Admin</h2>
      
      <div class='accounts-admin-users-list-wrapper'>
        <accounts-admin-users-list />
      </div>
    </div>
  </page-base>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import PageBase from './../PageBase/PageBase';
import AccountsAdminUsersList from '/src/imports/modules/accounts/client/components/AccountsAdminUsersList/AccountsAdminUsersList.vue';

export default {
  name: 'PageAccountsAdmin',
  components: {
    PageBase,
    AccountsAdminUsersList
  }
}
</script>