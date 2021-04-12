<template>
  <div class="notification is-link" v-show="show">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Toast',

  props: {
    message: {
      type: String,
      required: true
    }
  },

  created() {
    this.$watch('show', (newValue, oldValue) => {
      
    });
  },

  data() {
    return {
      show: false
    }
  }
}
</script>

<style>

</style>