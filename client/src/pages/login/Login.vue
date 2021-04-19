<template>
  <div class="form-wrapper">
    <div class="form">
      <h1>Albatross</h1>
      <a-form-model :model="user" layout="vertical" :style="{ width: '400px' }">
        <a-form-model-item label="아이디" :validate-status="hasError">
          <a-input v-model="user.accountId" placeholder="아이디를 입력해주세요"></a-input>
        </a-form-model-item>
        <a-form-model-item label="비밀번호" :validate-status="hasError">
          <a-input-password v-model="user.password" @keyup.enter="signIn" placeholder="비밀번호를 입력해주세요"></a-input-password>
        </a-form-model-item>
      </a-form-model>
      <a-button type="primary" size="large" block @click="signIn">로그인</a-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import { setAuthToken, resetAuthToken } from '../../helper/auth-helper.js';
import globalConfig from '../../config.js';

export default {
  name: 'Login',

  data() {
    return {
      user: {},
      status: true
    }
  },

  computed: {
    hasError() {
      return this.status ? null : 'error';
    }
  },

  methods: {
    async signIn() {

      resetAuthToken();

      try {
        const result = await axios.post(`${globalConfig.apiServer}/login`, this.user);

        if(result.status === 200 && result.data.token) {
          setAuthToken(result.data.token);
          this.status = true;
          this.$emit('login-success');
          return;
        }

        console.error(`login fail - ${result.data?.message}`);
        this.status = false;
        this.$emit('login-fail', result.data?.message);
      } catch(err) {
        console.error(`login fail - ${err.message}`);
        this.status = false;
        this.$emit('login-fail');
      }
    }
  }
}
</script>

<style scope>
.form-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  margin-top: -100px;
}
</style>