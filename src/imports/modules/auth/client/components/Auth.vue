<style scoped>
.Auth {
  position: relative;
  max-width: 300px;
  display: block;
}

.signed-in {
  position: relative;
  display: block;
}

.signed-out-button {
  display: inline-block;
}
</style>

<template>
  <div class='Auth'>
    <div v-if='user' class='signed-in'>
      <span class='hello'>Hello {{user.username}}</span>
      <span>
        <logout-btn />
      </span>
    </div>
    <div v-if='!user' class='signed-out'>
      <span class='signed-out-button'>
        <sign-in-btn />
      </span>
      <span class='signed-out-button'>
        <sign-up-btn />
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import { Meteor } from 'meteor/meteor';
import SignUpBtn from './SignUpBtn.vue';
import SignInBtn from './SignInBtn.vue';
import LogoutBtn from './LogoutBtn.vue';


// // only import the icons you use to reduce bundle size
// import 'vue-awesome/icons/flag';

// // or import all icons if you don't care about bundle size
// import 'vue-awesome/icons';

// /* Register component with one of 2 methods */

// import Icon from 'vue-awesome/components/Icon'


export default {
  components: {
    LogoutBtn,
    SignUpBtn,
    SignInBtn
  },
  props: {
    loginPath: '/'
  },
  meteor: {
    // load the user object
    setUserInStore() {
      this.setUser({ user: Meteor.user() });
    },
    user() {
      return Meteor.user()
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      isAuthVisible: (state) => state.auth.isAuthVisible
    })
  },
  methods: {
    ...mapActions({
      setUser: (actions) => actions.auth.setUser,
      toggleAuth: (actions) => actions.auth.toggleAuth
    })
  }
}
</script>
