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
      let html = '';
      if(this.result == null) {
        return '';
      }

      try {
        if(this.result?.headers && this.result?.headers['content-type'].indexOf('json') >= 0) {
           html = JSON.stringify(JSON.parse(this.result.data.body), undefined, 4);
        } else {
          html = this.result == null ? '' : this.result.data;
        }
      } catch (err) {
        console.warn(err.message);
        return '';
      }
      
      const lines = html.split('\n');
      return lines.map(line => `<span>${line}</span>`).join('');
    }
  }
}
</script>

<style scope>
.response-container {
  margin: 2vh 0;
  border: 1px solid #d9d9d9;
}

.response-container pre {
  max-height: 30vh;
  overflow-y: auto;
  line-height: 0;
  counter-reset: line;
}

.response-container pre span {
    display: block;
    line-height: 1.5rem;
}
    
.response-container pre span:before {
  counter-increment: line;
  content: counter(line);
  display: inline-block;
  border-right: 1px solid #ddd;
  padding: 0 .5em;
  margin-right: .5em;
  color: #888
}
</style>
