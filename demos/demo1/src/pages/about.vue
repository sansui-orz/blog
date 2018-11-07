<template lang="html">
  <div class="about">
    <div>{{word}}</div>
    <router-link to="/">点击返回</router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        word: '这里是about'
      };
    }
  }
</script>

<style>
.about {
  color: green;
}
</style>