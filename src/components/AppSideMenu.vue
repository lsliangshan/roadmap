<template>
  <div class="developer_side_menu_container">
    <Menu theme="dark" width="auto" class="main_menu_container" @on-select="navToPluginView" :active-name="`${mainMenu}-${subMenu}`">
      <Submenu name="data">
        <template slot="title">
          <Icon type="stats-bars"></Icon>
          数据管理
        </template>
        <MenuItem name="data-statistics">数据统计</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>
<style>
  .developer_side_menu_container {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .main_menu_container {
    height: 100%;
    overflow-y: auto;
  }
</style>
<script>
  export default {
    name: 'AppSideMenu',
    data () {
      return {
        contentRouterViewLoader: this.$store.state.contentRouterViewLoader,
        eventHub: this.$store.state.eventHub,
        events: this.$store.state.events
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      },
      mainMenu () {
        return this.$route.path.split('/')[1]
      },
      subMenu () {
        return this.$route.path.split('/')[2]
      }
    },
    created () {
    },
    methods: {
      navToPluginView (e) {
        this.$router.replace(`/${e.split('-')[0]}/${e.split('-')[1]}`)
      }
    }
  }
</script>
