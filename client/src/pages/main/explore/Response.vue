<template>
  <div class="response-container">
    <div v-if="result !== null && error == null">
      <pre>{{ responseData }}</pre>
    </div>
    <div v-else-if="error != null">
      <a-alert
        message="서비스 장애"
        :key="error"
        type="error"
      />
    </div>
    <div v-else>
      <a-empty />
    </div>
  </div>
</template>

<script>
export default {

  name: 'Response',

  props: {
    result: {
      type: Object,
      default() {
        return null;
      }
    },

    error: {
      type: String,
      default: null
    }
  },

  computed: {
    responseData() {
      return this.result == null ? '' : this.result.data;
    }
  }
}
</script>

<style scope>
.response-container {
  margin: 2vh 0;
}

.response-container pre {
max-height: 30vh;
  overflow-y: auto;
}
</style>
