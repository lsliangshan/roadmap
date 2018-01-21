<template>
    <div class="data_statistics_container">
      <div class="data_statistics_wrapper">
        <Tabs :value="results[currentIndex].group" @on-click="tabChanged" style="height: 100%;">
          <TabPane v-for="(item, index) in results" :key="index" :label="item.group" :name="item.group">
            <div class="screen_conditions_container">
              <Form :label-width="80">
                <FormItem label="查询时间">
                  <DatePicker type="datetimerange" :options="searchTimeTags" format="yyyy-MM-dd HH:mm" placeholder="请选择查询起止时间" @on-change="searchTimeChanged" style="width: 300px"></DatePicker>
                </FormItem>
              </Form>
              <div class="export_xlsx_container">
                <Button type="primary" size="small" :loading="exportXlsxLoading" @click="exportXlsx">
                  <span v-if="!exportXlsxLoading">导出xlsx</span>
                  <span v-else>导出中...</span>
                </Button>
              </div>
            </div>
            <!--<div class="screen_conditions_toggle">-->
              <!--<p class="screen_conditions_toggle_text" @click="toggleScreenCondition">-->
                <!--{{showScreenConditions ? '收起' : '筛选'}}-->
                <!--<Icon class="arrow_down" :type="showScreenConditions ? 'ios-arrow-up' : 'ios-arrow-down'"></Icon>-->
              <!--</p>-->
            <!--</div>-->
            <Table border :columns="userKeys" :data="item.interFaces" :stripe="true"></Table>
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
    position: relative;
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
  .export_xlsx_container {
    width: 100px;
    height: 32px;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
<script>
  import XLSX from 'xlsx'
  export default {
    name: 'statistics',
    data () {
      return {
        screenConditions: {
          startTime: '',
          endTime: ''
        },
        exportXlsxLoading: false,
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
            'group': 'mi',
            'interFaces': [
              {
                'fivePlusRequests': 1284,
                'fivePlusRequestsPercent': '1.04%',
                'name': '灰度项目信息',
                'oneThreeRequests': 3192,
                'oneThreeRequestsPercent': '2.59%',
                'threeFiveRequests': 785,
                'threeFiveRequestsPercent': '0.64%',
                'totalRequests': 12323136,
                'urlPath': 'https://mi.zhaopin.com/android/myext/GetGrayscaleProjectInfo'
              }
            ]
          },
          {
            'group': 'm站',
            'interFaces': [
              {
                'fivePlusRequests': 3,
                'fivePlusRequestsPercent': '0.02%',
                'name': 'js资源获取',
                'oneThreeRequests': 18,
                'oneThreeRequestsPercent': '0.15%',
                'threeFiveRequests': 13,
                'threeFiveRequestsPercent': '0.11%',
                'totalRequests': 1215372,
                'urlPath': 'https://m.zhaopin.com/Scripts/raty/jquery.raty.js'
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
            key: 'totalRequests'
          },
          {
            title: '1-3秒',
            key: 'oneThreeRequests'
          },
          {
            title: '3-5秒',
            key: 'threeFiveRequests'
          },
          {
            title: '大于5秒',
            key: 'fivePlusRequests'
          },
          {
            title: '1-3秒比例',
            key: 'oneThreeRequestsPercent'
          },
          {
            title: '3-5秒比例',
            key: 'threeFiveRequestsPercent'
          },
          {
            title: '大于5秒比例',
            key: 'fivePlusRequestsPercent'
          },
          {
            title: '请求地址',
            key: 'urlPath',
            width: 200
          }
        ],
        xlsxKey: {},
        xlsxData: [],
        xlsxOpts: {
          bookType: 'xlsx',
          bookSST: false,
          type: 'binary'
        }
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      }
    },
    created () {
      this.formatXlsxData()
    },
    methods: {
      tabChanged (evt) {
        let outIndex = this.currentIndex
        let i = 0
        for (i; i < this.results.length; i++) {
          if (this.results[i].group === evt) {
            outIndex = i
            i = this.results.length
          }
        }
        this.currentIndex = outIndex
      },
      toggleScreenCondition () {
        this.showScreenConditions = !this.showScreenConditions
      },
      searchTimeChanged (evt) {
        this.screenConditions.startTime = evt[0]
        this.screenConditions.endTime = evt[1]
      },
      exportXlsx () {
        this.exportXlsxLoading = true
        this.formatXlsxData()
        let wb = {SheetNames: ['Sheet1'], Sheets: {}, Props: {}}
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(this.xlsxData)
        this.saveAs(new Blob([this.s2ab(XLSX.write(wb, this.xlsxOpts))], {type: 'application/octet-stream'}), this.results[this.currentIndex].group + '-数据报表.' + (String(this.xlsxOpts.bookType) === 'biff2' ? 'xls' : this.xlsxOpts.bookType))
        setTimeout(() => {
          this.exportXlsxLoading = false
        }, 800)
      },
      getXlsxKey () {
        let userKeys = JSON.parse(JSON.stringify(this.userKeys))
        let i = 0
        let outKey = {}
        for (i; i < userKeys.length; i++) {
          if (!outKey[userKeys[i].title]) {
            outKey[userKeys[i].title] = userKeys[i].key
          }
        }
        this.xlsxKey = outKey
      },
      formatXlsxData () {
        let _originData = JSON.parse(JSON.stringify(this.results[this.currentIndex].interFaces))
        this.getXlsxKey()
        let i = 0
        let outData = []
        for (i; i < _originData.length; i++) {
          let tempData = JSON.parse(JSON.stringify(this.xlsxKey))
          // for (let k in tempData) {
          //   tempData[k] = _originData[i][tempData[k]]
          // }
          Object.keys(tempData).forEach((item) => {
            tempData[item] = _originData[i][tempData[item]]
          })
          outData.push(tempData)
        }
        this.xlsxData = outData
      },
      saveAs (obj, fileName) {
        let tempa = document.createElement('a')
        tempa.download = fileName || '数据报表'
        tempa.href = URL.createObjectURL(obj)
        tempa.click()
        setTimeout(() => {
          URL.revokeObjectURL(obj)
        }, 100)
      },
      s2ab (s) {
        if (typeof ArrayBuffer !== 'undefined') {
          let buf = new ArrayBuffer(s.length)
          let view = new Uint8Array(buf)
          for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
          return buf
        } else {
          let buf = new Array(s.length)
          for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF
          return buf
        }
      }
    },
    components: {}
  }
</script>
