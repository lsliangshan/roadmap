<template>
  <div class="app_content">
    <Row type="flex" class="h100p">
      <Col :span="spanLeft">
        <app-side-menu></app-side-menu>
      </Col>
      <Col :span="spanRight">
        <app-main-content-blank v-if="showBlankContent"></app-main-content-blank>
        <div class="content_router_container" v-else>
          <transition name="content-router-transition"
                      enter-active-class="animated fadeIn"
                      leave-active-class="animated fadeOut"
          >
            <keep-alive>
              <router-view class="content_router_view" name="ContentRouter"/>
            </keep-alive>
          </transition>
        </div>
      </Col>
    </Row>
  </div>
</template>
<style scoped>
  .h100p {
    height: 100%;
  }
  .app_content {
    position: absolute;
    top: 61px;
    left: 0;
    width: 100%;
    height: calc(100% - 62px);
    border-left: 1px solid #d7dde4;
    box-sizing: border-box;
    overflow: hidden;
  }
  .content_router_container {
    width: 100%;
    height: 100%;
  }
</style>
<script>
  export default {
    name: 'AppContent',
    data () {
      return {
        appName: this.$store.state.appName,
        assets: this.$store.state.assets,
        spanLeft: 6,
        spanRight: 18
      }
    },
    computed: {
      showBlankContent () {
        return (this.$route.path === '/')
      }
    },
    components: {
      AppSideMenu: () => import('./AppSideMenu.vue'),
      AppMainContentBlank: () => import('./AppMainContentBlank.vue')
    }
  }
</script>
