<style scoped>

</style>

<template>
  <div class='AccountsAdminUsersList'>
    <Table :columns="tableData.columns" :data="tableData.rows" no-data-text='No Data'></Table>
  </div>
</template>

<script>
import { Roles } from 'meteor/alanning:roles';
import { accountsPublicationNames } from './../../../shared/constants/accounts-publication-names';

export default {
  name: 'AccountsAdminUsersList',
  meteor: {
    users() {
      const users = Meteor.users.find();
      return users;
    }
  },
  created() {
    this.$subscribe(accountsPublicationNames.USERS_ADMIN);
  },
  computed: {
    tableData() {
      return {
        columns: [
          {
            title: 'Email',
            key: 'email'
          }, {
            title: 'Role',
            key: 'role'
          }
        ],
        rows: this.users.length ? this.users.map((thisUser) => {
          return {
            email: thisUser.emails[0].address,
            role: thisUser.roles[Roles.GLOBAL_GROUP][0]
          }
        }) : []
      }; 
    }
  }
}
</script>