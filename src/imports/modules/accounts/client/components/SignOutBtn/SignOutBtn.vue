<style scoped>
.light > .ivu-btn {
  color: white;
  border-color: white;
}
.dark > .ivu-btn {
  color: black;
  border-color: black;
}
a {
  text-decoration: none;
}
</style>

<template>
  <span class='SignOutBtn' v-bind:class='{ "light": isLightTheme, "dark": isDarkTheme }'>
    <Button type='ghost' @click='logoutUserAndRedirect'>
      Logout
    </Button>
  </span>
</template>

<script>
import { mapActions } from 'vuex-alt';

export default {
  name: 'SignOutBtn',
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
  computed: {
    isLightTheme() {
      return this.theme == 'light'
    },
    isDarkTheme() {
      return this.theme == 'dark'
    }
  },
  methods: {
    ...mapActions({
      logoutUser: (actions) => actions.accounts.logoutUser
    }),
    async logoutUserAndRedirect() {
      try {
        const worked = await this.logoutUser();
        if (worked) {
          this.$Message.success({
            content: 'Signed out. See you later!',
            duration: 10,
            closable: true
          });
          this.$router.push('/');
        }
      } catch (e) {
        this.$Message.error({
          content: e.message,
          duration: 10,
          closable: true
        });
      }
    }
  }
}
</script>
