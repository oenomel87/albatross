<template>
  <a-layout :style="{ background: '#ffffff' }">
    <a-layout-content>
      <div>
        <a-row :gutter="16">
          <a-col :span="4">
            <a-select :default-value="method" @change="changeMethod" :style="{ width: '100%' }">
              <a-select-option value="GET">GET</a-select-option>
              <a-select-option value="POST">POST</a-select-option>
              <a-select-option value="PUT">PUT</a-select-option>
              <a-select-option value="PATCH">PATCH</a-select-option>
              <a-select-option value="DELETE">DELETE</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="16">
            <a-input placeholder="URL을 입력해주세요" v-model="uri" :style="{ width: '100%' }" />
          </a-col>
          <a-col :span="4">
            <a-button type="primary" :style="{ width: '100%' }" @click="sendRequest">Send</a-button>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <Response :result="response" :error="error" />
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import axios from 'axios';

import { getAuthToken } from '../../../helper/auth-helper.js';
import globalConfig from '../../../config.js';
import Response from './Response.vue';

export default {
  name: 'Explore',

  components: { Response },

  data() {
    return {
      method: 'GET',
      uri: '',
      response: null,
      error: null
    }
  },

  methods: {
    async sendRequest() {
      this.error = null;
      this.response = null;

      try {
        this.response = await axios({
          method: 'POST',
          url: `${globalConfig.apiServer}/api/explore`,
          headers: {
            'x-access-token': getAuthToken()
          },
          data: {
            method: this.method,
            uri: this.uri
          }
        });
      } catch (err) {
        console.error(err.message);
        this.error = err.message;
        this.response = null;
      }
    },

    changeMethod(value) {
      this.method = value;
    }
  }
}
</script>

<style>

</style>