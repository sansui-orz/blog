<template lang="html">
  <div class="index">
    <div>{{hello}}</div>
    <router-link to="/about">点击跳转到</router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hello: '这里是首页来的'
      };
    }
  }
</script>
<style lang="scss">
.index {
  div {
    color: red;
  }
}
</style>