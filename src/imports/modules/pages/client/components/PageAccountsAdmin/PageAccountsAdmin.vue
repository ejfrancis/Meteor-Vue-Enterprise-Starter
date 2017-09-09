<style scoped>
.accounts-admin-users-list-wrapper {
  margin-top: 20px;
}
h2 {
  text-align: center;
}
.invites-btn-wrapper {
  margin-top: 5px;
  height: 3em;
}
.invites-btn {
  float: right;
}
</style>

<template>
  <page-base>
    <div class='PageAccountsAdmin'>
      <h2>Accounts Admin</h2>
      <div class='invites-btn-wrapper'>
        <Button type='primary' class='invites-btn' @click='goToInvitesPage()'>Invites</Button>
      </div>
      
      <div class='accounts-admin-users-list-wrapper'>
        <accounts-admin-users-list />
      </div>
    </div>
  </page-base>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import { mapState } from 'vuex-alt';
import PageBase from './../PageBase/PageBase';
import AccountsAdminUsersList from '/src/imports/modules/accounts/client/components/AccountsAdminUsersList/AccountsAdminUsersList.vue';

export default {
  name: 'PageAccountsAdmin',
  components: {
    PageBase,
    AccountsAdminUsersList
  },
  methods: {
    goToInvitesPage() {
      this.$router.push({ name: 'accounts-admin-invite' });
    }
  }
}
</script>