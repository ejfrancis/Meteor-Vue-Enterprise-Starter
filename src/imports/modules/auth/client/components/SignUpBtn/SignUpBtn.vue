<style scoped>
.light .ivu-btn {
  color: white;
  border-color: white;
}
.dark .ivu-btn {
  color: black;
  border-color: black;
}
a {
  text-decoration: none;
}
</style>

<template>
  <span v-bind:class='{ "light": isLightTheme, "dark": isDarkTheme }'>
    <Button class='SignUpBtn' type='ghost' @click='handleClick'>
      Sign Up
    </Button>
  </span>
</template>

<script>

export default {
  name: 'SignUpBtn',
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
    handleClick() {
      this.$router.push({ path: 'sign-up' });
    }
  }
}
</script>
