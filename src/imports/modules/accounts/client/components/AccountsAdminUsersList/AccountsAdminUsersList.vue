<style>
/* can't do scoped styles here because iView table doesn't prepend the unique class scope to classnames */
.AccountsAdminUsersList .table-loading {
  margin: 0 auto;
  width: 50px;
  height: 300px;
  vertical-align: center;
  padding-top: 125px;
}
.AccountsAdminUsersList .table-loading .ivu-spin-dot{
  height: 100px;
  width: 100px;
}
.AccountsAdminUsersList th {
  text-align: center;
}
.AccountsAdminUsersList .ivu-btn {
  width: 12em;
}
.AccountsAdminUsersList .role-column {
  text-align: center;
}

.AccountsAdminUsersList .ivu-icon-arrow-down-b {
  position: absolute;
  right: 1em;
}

.AccountsAdminUsersList td.current-user {
  /* background-color: #dffffe; */
  border-left: 10px solid #a5f6f3;
  box-sizing: border-box;
}
</style>

<template>
  <div class='AccountsAdminUsersList'>
    <Spin v-if='getUsersWithRolesLoading' size='large' class='table-loading'></Spin>
    <Table v-if='!getUsersWithRolesLoading' :columns='tableData.columns' :data='tableData.rows' no-data-text='No Data'></Table>
  </div>
</template>

<script>
import { Roles } from 'meteor/alanning:roles';
import { globalUserRoles } from './../../../shared/constants/global-user-roles';
import { mapActions, mapState } from 'vuex-alt';
import Vue from 'vue';

export default {
  name: 'AccountsAdminUsersList',
  async created() {
    try {
      const usersWithRoles = await this.getUsersWithRoles({ startIndex: 0 });
      Vue.set(this.usersData, 'usersWithRoles', usersWithRoles);
    } catch (e) {
      // handled in vuex
    }
  },
  destroyed() {
    this.clearGetUsersWithRolesFailure();
  },
  data() {
    return {
      usersData: {
        usersWithRoles: []
      }
    }
  },
  methods: {
    ...mapActions({
      getUsersWithRoles: (actions) => actions.accounts.getUsersWithRoles,
      clearGetUsersWithRolesFailure: (actions) => actions.accounts.clearGetUsersWithRolesFailure,
    }),
    isCurrentUserAndAdmin(userId) {
      if (Meteor.userId() === userId) {
        return Roles.userIsInRole(userId, [globalUserRoles.ADMIN, globalUserRoles.SUPER_ADMIN], Roles.GLOBAL_GROUP);
      }
    },
    isUserSuperAdmin(userId) {
      return Roles.userIsInRole(userId, [globalUserRoles.SUPER_ADMIN], Roles.GLOBAL_GROUP);
    }
  },
  computed: {
    ...mapState({
      getUsersWithRolesLoading: (state) => state.accounts.getUsersWithRolesLoading
    }),
    tableData() {
      // store for access in render() function
      const isCurrentUserAndAdmin = this.isCurrentUserAndAdmin;
      const isUserSuperAdmin = this.isUserSuperAdmin;
      return {
        columns: [
          {
            title: 'Email',
            key: 'email'
          }, {
            title: 'Role',
            key: 'role',
            className: 'role-column',
            render: (h, params) => {
              // user Vue render function (vdom) to build custom dropdown for this cell
              return h('Dropdown', {
                props: {
                  trigger: 'click'
                },
                on: {
                  'on-click': (name) => {
                    // this.changeStatus(name)
                    console.log('clicked ' + name)
                  }
                }
              }, [
                h('Button', [
                  h('span', params.row.role),
                  h('Icon', {
                    props: {
                      type: 'arrow-down-b'
                    }
                  })
                ]),
                h('Dropdown-menu', {
                  slot: 'list'
                }, Object.values(globalUserRoles).map((item, index) => {
                  return h('Dropdown-item', {
                    props: {
                      name: item,
                      disabled:
                      (
                        // if current user is an admin
                        isCurrentUserAndAdmin(params.row._id) &&
                        // don't allow them to remove themselves from admin
                        ([globalUserRoles.SUPER_ADMIN, globalUserRoles.ADMIN].indexOf(item) === -1)
                      ) ||
                      (
                        // if current user isn't Super Admin, don't allow them to set others as Super Admin
                        !isUserSuperAdmin(Meteor.userId()) &&
                        item === globalUserRoles.SUPER_ADMIN
                      )
                    }
                  }, item)
                }))
              ])
            }
          }
        ],
        rows: this.usersData.usersWithRoles.length ? this.usersData.usersWithRoles.sort((a,b) => a.emails[0].address > b.emails[0].address).map((thisUser) => {
          console.log(thisUser);
          const thisCell = {
            _id: thisUser._id,
            email: thisUser.emails[0].address,
            role: thisUser.roles[Roles.GLOBAL_GROUP][0]
          };

          // add 'current-user' class to yourself
          if (thisUser._id === Meteor.userId()) {
            thisCell.cellClassName = thisCell.cellClassName || {
              email: 'current-user'
            };
          }
          return thisCell;
        }) : []
      };
    }
  }
}
</script>