<template>
  <div class="app_header layout">
    <Row type="flex">
      <Col :span="spanLeft" class="layout-menu-left">
        <router-link :to="{path: '/'}">
          <div class="layout-logo-left" v-text="appName"></div>
        </router-link>
      </Col>
      <Col :span="spanRight">
        <div class="layout-header">
          <div class="user_role" v-text="loginInfo.username"></div>
          <Poptip trigger="click" placement="bottom-end" width="200" class="user-badge">
            <Badge dot>
              <Avatar size="large" :src="assets.maleAvatar" class="user-avatar"></Avatar>
            </Badge>
            <div class="api" slot="content">
              <Card :bordered="false" :padding="0">
                <p slot="title" v-text="loginInfo.username"></p>
                <a href="#" slot="extra" @click.prevent="logout">
                  退出
                  <Icon type="log-out"></Icon>
                </a>
              </Card>
            </div>
          </Poptip>
        </div>
      </Col>
    </Row>
  </div>
</template>
<style>
  .app_header {
    width: 100%;
    height: 60px;
    background-color: #ffffff;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .layout-header-icon-container {
    height: 100%;
    margin-right: 20px;
    display: flex;
    align-items: center;
  }
  .message-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .message-icon .message-count-badge {
    right: -6px;
  }
  .user-badge {
    /* position: absolute;
    right: 30px; */
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 30px;
    cursor: pointer;
  }
  .user-avatar {
    background-color: #87d068;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .user_role {
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 16px;
    /* position: absolute;
    right: 80px; */
  }
  .layout-logo-left {
    width: 100%;
    height: 60px;
    /*background: #5b6270;*/
    border-radius: 3px;
    margin: 0 auto;
    padding: 15px 0;
    color: #FFFFFF;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    text-shadow: 0 0 10px #ffffff;
    overflow: hidden;
    border-bottom: 1px solid rgba(30, 36, 50, 0.36);
  }
  .ivu-col{
    transition: width .2s cubic-bezier(.215,.61,.355,1);
  }
  .user-badge .ivu-poptip-body {
    padding: 0!important;
  }
</style>
<script>
  import utils from '../utils'
  export default {
    name: 'AppHeader',
    data () {
      return {
        appName: this.$store.state.appName,
        assets: this.$store.state.assets,
        eventHub: this.$store.state.eventHub,
        events: this.$store.state.events,
        spanLeft: 4,
        spanRight: 20
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      }
    },
    methods: {
      logout () {
        if (!utils.isEmptyObj(this.loginInfo)) {
          utils.storage.clear()
          this.$Message.success('您已经退出')
          this.$router.replace('/login')
        }
      }
    },
    components: {}
  }
</script>
