<style scoped>
.NavBarAccounts {
  /* position: relative; */
  /* max-width: 300px; */
  /* display: block; */
}

.signed-in {
  /* position: relative; */
  float: right;
}
.signed-out {
  float: right;
  /* margin-right: 20px; */
}

.user-name {
  color: white;
  padding-right: 10px;
}

@media(max-width: 768px) {
  .user-name {
    color: black;
  }
}

.signed-out-buttons {
  display: inline-block;
}
</style>

<template>
  <div class='NavBarAccounts'>
     <div v-if='user' class='signed-in'>
      <span class='user-name'>{{user.profile.firstName}} {{user.profile.lastName}}</span>
      <span>
        <sign-out-btn :theme='theme'/>
      </span>
    </div>
    <div v-if='!user' class='signed-out'>
      <span class='signed-out-buttons'>
        <sign-in-btn :theme='theme'/>
        <sign-up-btn :theme='theme'/>
      </span> 
      <!-- <span class='signed-out-button'>
        <sign-up-btn />
      </span> -->
    </div>  
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import { Meteor } from 'meteor/meteor';
import SignUpBtn from './../SignUpBtn/SignUpBtn.vue';
import SignInBtn from './../SignInBtn/SignInBtn.vue';
import SignOutBtn from './../SignOutBtn/SignOutBtn.vue';

export default {
  name: 'NavBarAccounts',
  props: {
    theme: {
      type: String,
      required: false,
      default: 'dark',
      validator: (val) => {
        return ['dark', 'light'].indexOf(val) !== -1;
      }
    }
  },
  components: {
    SignUpBtn,
    SignInBtn,
    SignOutBtn
  },
  meteor: {
    // load the user object
    setUserInStore() {
      this.setUser({ user: Meteor.user() });
      this.updateNavRoutes();
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.accounts.user,
      isAccountsVisible: (state) => state.accounts.isAccountsVisible
    })
  },
  methods: {
    ...mapActions({
      setUser: (actions) => actions.accounts.setUser,
      updateNavRoutes: (actions) => actions.layout.updateNavRoutes
    })
  }
}
</script>
