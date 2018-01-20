<template>
    <div class="data_statistics_container">
      <div class="data_statistics_wrapper">
        <Tabs :value="results[currentIndex].name" style="height: 100%;">
          <TabPane v-for="(item, index) in results" :key="index" :label="item.name" :name="item.name">
            <div class="screen_conditions_container">
              <Form :label-width="80">
                <FormItem label="查询时间">
                  <DatePicker type="datetimerange" :options="searchTimeTags" format="yyyy-MM-dd HH:mm" placeholder="请选择查询起止时间" @on-change="searchTimeChanged" style="width: 300px"></DatePicker>
                </FormItem>
              </Form>
            </div>
            <!--<div class="screen_conditions_toggle">-->
              <!--<p class="screen_conditions_toggle_text" @click="toggleScreenCondition">-->
                <!--{{showScreenConditions ? '收起' : '筛选'}}-->
                <!--<Icon class="arrow_down" :type="showScreenConditions ? 'ios-arrow-up' : 'ios-arrow-down'"></Icon>-->
              <!--</p>-->
            <!--</div>-->
            <Table border :columns="userKeys" :data="item.children" :stripe="true"></Table>
          </TabPane>
        </Tabs>
      </div>
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
    overflow-y: auto;
    padding: 15px;
    background-color: #ffffff;
  }
  .screen_conditions_container {
    width: 100%;
    height: 48px;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    -webkit-transform-origin: center top;
    -moz-transform-origin: center top;
    -o-transform-origin: center top;
    transform-origin: center top;
  }
  .screen_conditions_toggle {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .screen_conditions_toggle_text {
    cursor: pointer;
  }
  .arrow_down {
    margin-left: 5px;
  }
</style>
<script>
  export default {
    name: 'statistics',
    data () {
      return {
        screenConditions: {
          startTime: '',
          endTime: ''
        },
        searchTimeTags: {
          shortcuts: [
            {
              text: '今天',
              value () {
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
                const end = new Date()
                return [start, end]
              }
            },
            {
              text: '昨天',
              value () {
                const end = new Date(new Date(new Date().toLocaleDateString()).getTime() - 1000)
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 + 1000)
                return [start, end]
              }
            },
            {
              text: '最近一个月',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                return [start, end]
              }
            },
            {
              text: '最近三个月',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                return [start, end]
              }
            }
          ]
        },
        showScreenConditions: false,
        currentIndex: 0,
        results: [
          {
            name: 'm站',
            children: [
              {
                name: '注册',
                total: 23161,
                oneThree: 250,
                threeFive: 443,
                moreThanFive: 13,
                oneThreePercent: 1,
                threeFivePercent: 2,
                moreThanFivePercent: 0,
                url: 'My/RegisterPassport'
              },
              {
                name: '登录',
                total: 366397,
                oneThree: 1031,
                threeFive: 842,
                moreThanFive: 209,
                oneThreePercent: 0,
                threeFivePercent: 0,
                moreThanFivePercent: 0,
                url: 'My/LoginPostPassport'
              },
              {
                name: '第三方注册、登录',
                total: 23946,
                oneThree: 184,
                threeFive: 283,
                moreThanFive: 17,
                oneThreePercent: 1,
                threeFivePercent: 1,
                moreThanFivePercent: 0,
                url: 'My/CreateOrValidUserByOAuth'
              }
            ]
          },
          {
            name: 'Mi',
            children: [
              {
                name: '获取个人信息',
                total: 11133987,
                oneThree: 16620,
                threeFive: 16137,
                moreThanFive: 5136,
                oneThreePercent: 0,
                threeFivePercent: 0,
                moreThanFivePercent: 0,
                url: 'My/GetUserDetail'
              },
              {
                name: '获取我的关注收藏',
                total: 3610774,
                oneThree: 7015,
                threeFive: 5018,
                moreThanFive: 2377,
                oneThreePercent: 0,
                threeFivePercent: 0,
                moreThanFivePercent: 0,
                url: 'My/GetUserSavedInfo'
              },
              {
                name: '搜索',
                total: 10308047,
                oneThree: 478349,
                threeFive: 37771,
                moreThanFive: 7849,
                oneThreePercent: 5,
                threeFivePercent: 0,
                moreThanFivePercent: 0,
                url: 'My/Search'
              }
            ]
          }
        ],
        userKeys: [
          {
            title: '接口',
            key: 'name',
            width: 150
          },
          {
            title: '总请求',
            key: 'total'
          },
          {
            title: '1-3秒',
            key: 'oneThree'
          },
          {
            title: '3-5秒',
            key: 'threeFive'
          },
          {
            title: '大于5秒',
            key: 'moreThanFive'
          },
          {
            title: '1-3秒比例',
            key: 'oneThreePercent'
          },
          {
            title: '3-5秒比例',
            key: 'threeFivePercent'
          },
          {
            title: '大于5秒比例',
            key: 'moreThanFivePercent'
          },
          {
            title: '请求地址',
            key: 'url',
            width: 200
          }
        ]
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      }
    },
    methods: {
      toggleScreenCondition () {
        this.showScreenConditions = !this.showScreenConditions
      },
      searchTimeChanged (evt) {
        this.screenConditions.startTime = evt[0]
        this.screenConditions.endTime = evt[1]
      }
    },
    components: {}
  }
</script>
