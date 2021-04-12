<template>
  <div class="main-wrapper">
    <APIForm />
  </div>
</template>

<script>
import APIForm from './APIForm.vue';

export default {
  name: 'Main',

  components: {
    APIForm
  }
}
</script>

<style scope>
  .main-wrapper {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
</style>