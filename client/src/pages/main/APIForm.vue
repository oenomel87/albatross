<template>
  <a-layout :style="{ background: '#ffffff' }">
    <a-layout-content>
      <div>
        <a-row :gutter="16">
          <a-col :span="4">
            <a-select default-value="get" :style="{ width: '100%' }">
              <a-select-option value="get">GET</a-select-option>
              <a-select-option value="post">POST</a-select-option>
              <a-select-option value="put">PUT</a-select-option>
              <a-select-option value="delete">DELETE</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="16">
            <a-input placeholder="URL을 입력해주세요" :style="{ width: '100%' }" />
          </a-col>
          <a-col :span="4">
            <a-button type="primary" :style="{ width: '100%' }" @click="sendRequest">Send</a-button>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: 'APIForm',

  data() {
    return {
      api: {}
    }
  },

  methods: {
    sendRequest() {

    }
  }
}
</script>

<style>

</style>