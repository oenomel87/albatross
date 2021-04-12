<template>
  <div class="load-wrapper">
    <a-spin tip="Not loading..." />
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
  .load-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>