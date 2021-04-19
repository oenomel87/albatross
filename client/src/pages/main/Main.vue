<template>
  <div class="main-wrapper">
    <Explore />
  </div>
</template>

<script>
import Explore from './explore/Explore.vue';

export default {
  name: 'Main',

  components: {
    Explore
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