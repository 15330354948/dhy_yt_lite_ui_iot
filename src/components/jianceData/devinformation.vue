<template>
  <div class="dev_infor">
    <div class="basic_all">
      <div class="basic_infor">
        <!-- <table class="basic_table" border="1px" width="100%">
          <tr align="center">
            <td class="basic_title">监测点名称</td>
            <th>{{ msgData.disasterName || '--' }}</th>
            <td class="basic_title">监测点编号</td>
            <th>{{ msgData.disasterCode || '--' }}</th>
             <td class="basic_title">通信协议</td>
            <th>{{ msgData.registerAgreement || '--'}}</th>
          <tr align="center">
            <td class="basic_title">行政区</td>
            <th>{{ msgData.cityName + msgData.countyName || '--'}}</th>
            <td class="basic_title">设备编号</td>
            <th>{{ msgData.code || '--' }}</th>
             <td class="basic_title">运营商</td>
            <td>{{ msgData.operator || '--'}}</td>
          </tr>
          <tr align="center">
            <td class="basic_title">供应商名称</td>
            <th>{{ msgData.factoryId == 4 || msgData.factoryId == 10 ? "深圳地环院" : msgData.factoryId == 5 ? msgData.factoryName : ""}}</th>
            <td class="basic_title">社区名称</td>
            <th colspan="">{{ msgData.communityName || '--'}}</th>
            <td class="basic_title">设备型号</td>
            <th>{{ msgData.model || '--'}}</th>
          </tr>
          <tr align="center">
            <td class="basic_title">安装地址</td>
            <th>{{ msgData.location || '--'}}</th>
            <td class="basic_title">安装日期</td>
            <th>{{ msgData.installationTime || '--'}}</th>
          </tr>
          <tr align="center">
            <td class="basic_title">设备经度</td>
            <th>{{ msgData.longitude || '--'}}</th>
            <td class="basic_title">设备纬度</td>
            <th>{{ msgData.latitude || '--'}}</th>
          </tr>
        </table> -->
        <el-row style="line-height: 40px">
          <el-col :span="12">
            <label class="el-form-item__label">点位名称:</label>
            {{ msgData.name || "" }}
          </el-col>
          <el-col :span="12">
            <label class="el-form-item__label">设备编号:</label>
            {{ msgData.code || "" }}
          </el-col>
          <el-col :span="12">
            <label class="el-form-item__label">设备类型:</label>
            {{ msgData.type || "" }}
          </el-col>
          <el-col :span="12">
            <label class="el-form-item__label">设备厂商:</label>
            {{ getTypes(msgData.factoryId) }}
          </el-col>
          <el-col :span="12">
            <label class="el-form-item__label">监测点名称:</label>
            {{ msgData.disasterName || "" }}
          </el-col>
          <el-col :span="12">
            <label class="el-form-item__label">行政区域:</label>
            {{ msgData.provinceName+msgData.cityName+msgData.countyName+msgData.streetName+msgData.communityName|| "" }}
          </el-col>
          <el-col :span="12">
            <label class="el-form-item__label">安装位置:</label>
            {{ msgData.location || "" }}
          </el-col>
          <el-col :span="12">
            <label class="el-form-item__label">经度:</label>
            {{ msgData.longitude || "" }}
          </el-col>
          <el-col :span="12">
            <label class="el-form-item__label">纬度:</label>
            {{ msgData.latitude || "" }}
          </el-col>
          <el-col :span="12">
            <label
              class="el-form-item__label">使用状态:</label>{{ msgData.useStatus == 0 ? "使用" : msgData.useStatus == 1 ? "损坏" : ""}}
          </el-col>
          <el-col :span="12">
            <label class="el-form-item__label">安装时间:</label>
            {{ msgData.registerTime || "" }}
          </el-col>
          <el-col :span="12">
            <label class="el-form-item__label">MARK值:</label>
            {{ msgData.registerAgreementName || "" }}
          </el-col>
          <el-col :span="24">
            <label class="el-form-item__label">传感器:</label>
            <el-row>
              <el-col :span="18">
                <avue-crud :option="infoOption" :data="infoData">
                  <template slot="stateHeader" slot-scope="{column}">
                    <span>{{(column || {}).label}}</span>
                    <el-tooltip class="item" placement="top-start" effect="light" :open-delay="300">
                      <div slot="content">
                        <span>使用：</span><span style="color: #606266">该传感器使用中，可正常显示该传感器的监测数据；</span> <br /> <br />
                        <span>未使用：</span><span style="color: #606266">该传感器未使用，不显示该传感器的监测数据；</span>
                      </div>
                      <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                  </template>
                  <template slot="menu" slot-scope="{row}">
                    <el-button type="text" @click='writeBtn(row)'>修改记录</el-button>
                  </template>
                </avue-crud>
              </el-col>
            </el-row>
          </el-col>
          <!-- <el-col :span="12" v-show="typeNum == 6">
            <label class="el-form-item__label">通道:</label>
            {{ msgData.videoPassage || "" }}
          </el-col>
          <el-col :span="12" v-show="typeNum == 6">
            <label class="el-form-item__label">序列号:</label>
            {{ msgData.videoSerial || "" }}
          </el-col>
          <el-col :span="12" v-show="typeNum == 6">
            <label class="el-form-item__label">是否旋转:</label>
            {{ msgData.videoOperable == 0 ? "是" : "否" || "" }}
          </el-col>
          <el-col :span="24" v-show="typeNum == 6">
            <label class="el-form-item__label">监控地址:</label>
            {{ msgData.videoMonitorAddress || "" }}
          </el-col>
          <el-col :span="24" v-show="typeNum == 6">
            <label class="el-form-item__label">appkey:</label>
            {{ msgData.videoAppkey || "" }}
          </el-col>
          <el-col :span="24" v-show="typeNum == 6">
            <label class="el-form-item__label">secret:</label>
            {{ msgData.videoAppsecret || "" }}
          </el-col>
          <el-col :span="24" v-show="typeNum == 6">
            <label class="el-form-item__label">播放地址:</label>
            {{ msgData.videoPlayAddress || "" }}
          </el-col> -->
          <el-col :span="24">
            <label class="el-form-item__label">离线时长设置:</label>
            超过{{ msgData.offlineDuration || "" }}分钟未收到监测数据为离线。
          </el-col>
        </el-row>

        <el-dialog :visible.sync="writeBox" v-if="writeBox" width="1000px" @close="closeWriteBox" title="修改记录"
          class="avue-dialog" append-to-body>
          <avue-crud ref="crudMofig" v-model="writeObj" :page.sync="writepage" :data="writetableData"
            :option="writeOption" @size-change="writesizeChange" @current-change="writecurrentChange"
            @search-change="searchChangewrite" @search-reset="searchResewrite"></avue-crud>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2';

  import {
    deviceType,
    senerInfo,
    mofigPage,
    factoryType
  } from "@/api/monitorManage/device";
  import {
    infoOption,
    writeOption
  } from "@/const/crud/monitorManage/deviceList";
  import {
    deviceInformation,
    searchSersorType
  } from "@/api/monitorManage/quxian";
  import {
    mapGetters
  } from "vuex";
  export default {
    name: "devinformation",
    props: ["devData"],
    data() {
      return {
        msgData: {},
        devTypeList: {},
        infoOption: infoOption,
        infoData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          projectId: "",
          pageSize: 20, // 每页显示多少条,
          pageSizes: [10, 20, 50, 100, 200],
        },
        writepage: {
          total: 0, // 总页数
          current: 1, // 当前页数
          size: 10, // 每页显示多少条,
        },
        sensorId: "",
        writeOption: writeOption,
        writetableData: [],
        writeBox: false,
        writeObj: {},
        factorydicData: [],
        registerAgreementList: {
          0: "NB-Iot",
          1: "MQTT",
          2: "其他"
        }
      };
    },
    computed: {
      ...mapGetters(["projectId"]),
    },

    watch: {
      devData: {
        handler(value) {
          if (
            value.deviceId !== undefined ||
            value.deviceId !== null ||
            value.deviceId !== ""
          ) {
            if (value.deviceId) {
              deviceInformation(value.deviceId).then(res => {
                if (res.data.data !== null) {
                  this.msgData = res.data.data;
                  // this.typeNum = this.msgData.type;
                  this.msgData.registerAgreement = this.registerAgreementList[this.msgData.registerAgreement];
                  // this.creactQrcode();
                }
              });
            }
          }
          factoryType({
            projectId: this.projectId
          }).then(v => {
            this.factorydicData = v.data.data;
          })
          if (value.deviceId) {
            senerInfo({
              deviceId: value.deviceId,
              projectId: this.projectId
            }).then(
              (v) => {
                this.infoData = v.data.data;
              }
            );
          }

        },
        immediate: true
      },
    },
    created() {

    },
    mounted() {},
    methods: {
      getTypes(e) {
        let val = this.factorydicData.filter(item => item.id == e)
        return val[0] ? val[0].name : ''
      },
      creactQrcode() {
        var url = "https://139.159.189.117/H5/index.html?id=" + this.devData.deviceId;
        document.getElementById('qrcode').innerHTML = '';
        let qrcode = new QRCode('qrcode', {
          width: 120, //图像宽度
          height: 120, //图像高度
          colorDark: "#000000", //前景色
          colorLight: "#ffffff", //背景色
          typeNumber: 4,
          correctLevel: QRCode.CorrectLevel
            .H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
        })
        qrcode.clear() //清除二维码
        qrcode.makeCode(url) //生成另一个新的二维码
      },
      closeWriteBox() {
        this.writeBox = false
      },
      async getListWrite(page, params, form) {
        await mofigPage({
          current: page.currentPage,
          size: page.pageSize,
          sensorId: params,
          ...form
        }).then(v => {
          if (v.data.data.records) {
            this.writeBox = true;
            this.writetableData = v.data.data.records
            this.writepage.total = v.data.data.total;
          }
        })
      },
      searchChangewrite(params, done) {
        if (params.operatorTime) {
          this.writeObj.beginTime = params.operatorTime[0]
          this.writeObj.endTime = params.operatorTime[1]
        }
        if (params.operator) {
          this.writeObj.operator = params.operator
        }
        this.getListWrite(this.writepage, this.sensorId, this.writeObj);
        done();
      },
      writecurrentChange(current) {
        this.writepage.current = current;
        this.getListWrite(this.writepage, this.sensorId, );
      },
      writeBtn(row) {
        if (row.id) {
          this.sensorId = row.id;
          this.getListWrite(this.writepage, row.id, )
        } else {
          this.$message.warning("该传感器暂无修改记录")
        }
      },
      writesizeChange(pageSize) {
        this.writepage.size = pageSize;
        this.getListWrite(this.writepage, this.sensorId, );
      },
      searchResewrite() {
        this.getListWrite(this.writepage, this.sensorId);
      },
      getdata() {
        deviceType().then((w) => {
          w.data.data.map((v) => {
            if (this.msgData.type == v.value) {
              this.msgData.type = v.label;
            }
          });
        });
      }
    }
  };

</script>

<style lang="scss" scoped>
  $height : calc(100% - 49px);
  $back_color : #EEEEEE;
  $back_hover : #E2E1E1;
  $font_color : #9a9a9a;

  .dev_infor {
    padding: 0 10px;
    height: 100%;
    overflow-y: auto;

    .dev_title {
      margin: 0 0 15px 0 !important;
      padding: 0px 0 0 0;
    }

    .basic_table {
      border-color: #ccc;
      border: 1px solid #ccc;
      color: #333333;
      font-size: 14px;
    }

    .basic_th_bottom {
      width: 55%;
    }

    th {
      width: 22%;
      font-weight: normal;
      word-wrap: break-word;
    }

    .basic_title {
      background: #F6F5F5;
    }

    tr {
      width: 100%;
    }

    td {
      width: 11%;
      line-height: 40px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .basic_all {
      width: 100%;
      background: $back_color;

      .basic_infor {
        background: white;
        color: #000;
      }
    }

    .chuanganqi_title {
      margin: 15px 0 15px 0 !important;
    }

    .panju_div_content {
      height: 310px;
      padding-bottom: 20px;

      .biaodan {
        height: 100%;
      }

      ::v-deep.el-table__header-wrapper {
        .el-table__header {
          .has-gutter {
            th {
              background: #e4e4e4;
              border: none;
              color: $font_color;
              text-overflow: ellipsis;
              white-space: normal;
              word-break: break-all;
              line-height: 23px;
              font-weight: bold;
            }
          }
        }
      }

      ::v-deep.el-table__body-wrapper {
        max-height: calc(100% - 45px);
        overflow-y: auto;
      }

      ::v-deep.cell {
        text-align: center;
      }
    }
  }

</style>
