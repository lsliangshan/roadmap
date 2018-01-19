<template>
    <div class="data_statistics_container">
      <div class="data_statistics_wrapper"></div>
    </div>
</template>
<style>
    .data_statistics_container {
      width: 100%;
      height: 100%;
      padding: 15px;
    }
  .data_statistics_wrapper {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: rgba(169,134,255,0.38);
  }
</style>
<script>
  export default {
    name: 'Statistics',
    data () {
      return {
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      }
    },
    methods: {
    },
    components: {}
  }
</script>
