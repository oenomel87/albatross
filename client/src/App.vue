<template>
  <div id="app">
    <Loader v-show="isLoading" />
    <Login v-if="isUnauthenticated"
      @login-success="loginSuccess"
      @login-fail="loginFail"
    />
    <Main v-else />
  </div>
</template>

<script>
import Loader from '../../client/src/pages/common/Loader.vue';
import Login from '../../client/src/pages/login/Login.vue';
import Main from '../../client/src/pages/main/Main.vue';

import { checkAuthTokenIsValid } from '../../client/src/helper/auth-helper.js';

export default {
  name: 'App',

  components: {
    Loader, Login, Main
  },

  created() {
    this.checkAuthentication();
  },

  computed: {
    isUnauthenticated() {
      return !(this.isLoading || this.isAuthenticated);
    }
  },

  data() {
    return {
      isLoading: true,
      isAuthenticated: false
    }
  },

  methods: {
    async checkAuthentication() {
      this.isAuthenticated = await checkAuthTokenIsValid();
      setTimeout(() => this.isLoading = !this.isLoading, 1000);
    },

    loginSuccess() {
      this.isAuthenticated = true;
    },

    loginFail() {
      this.isAuthenticated = false;
    }
  }
}
</script>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
