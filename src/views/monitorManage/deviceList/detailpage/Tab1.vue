<template>
  <div>
    <el-row style="line-height: 40px">
      <el-col :span="12">
        <label class="el-form-item__label">点位名称:</label>
        {{ tabOption.name || "" }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">设备编号:</label>
        {{ tabOption.code || "" }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">设备类型:</label>
        {{ tabOption.type || "" }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">设备厂商:</label>
        {{ tabOption.factoryId || "" }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">监测点名称:</label>
        {{ tabOption.disasterName || "" }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">行政区域:</label>
        {{
          tabOption.provinceName +
            tabOption.cityName +
            tabOption.countyName +
            tabOption.streetName +
            tabOption.communityName || ""
        }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">安装位置:</label>
        {{ tabOption.location || "" }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">经度:</label>
        {{ tabOption.longitude || "" }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">纬度:</label>
        {{ tabOption.latitude || "" }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">使用状态:</label
        >{{
          tabOption.useStatus == 0
            ? "使用"
            : tabOption.useStatus == 1
            ? "损坏"
            : ""
        }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">安装时间:</label>
        {{ tabOption.registerTime || "" }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">MARK值:</label>
        {{ tabOption.registerAgreementName || "" }}
      </el-col>
      <el-col :span="12">
        <label class="el-form-item__label">所属项目:</label>
        {{ tabOption.subProjectName || "" }}
      </el-col>
      <el-col :span="24" v-show="typeNum != 6">
        <label class="el-form-item__label">传感器:</label>
        <el-row>
          <el-col :span="18">
            <avue-crud :option="infoOption" :data="infoData">
              <template slot="stateHeader" slot-scope="{ column }">
                <span>{{ (column || {}).label }}</span>
                <el-tooltip
                  class="item"
                  placement="top-start"
                  effect="light"
                  :open-delay="300"
                >
                  <div slot="content">
                    <span>使用：</span
                    ><span style="color: #606266"
                      >该传感器使用中，可正常显示该传感器的监测数据；</span
                    >
                    <br />
                    <br />
                    <span>未使用：</span
                    ><span style="color: #606266"
                      >该传感器未使用，不显示该传感器的监测数据；</span
                    >
                  </div>
                  <i class="el-icon-warning-outline"></i>
                </el-tooltip>
              </template>
              <template slot="menu" slot-scope="{ row }">
                <el-button v-show="modify" type="text" @click="writeBtn(row)"
                  >修改记录</el-button
                >
              </template>
            </avue-crud>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" v-show="typeNum == 6">
        <label class="el-form-item__label">通道:</label>
        {{ tabOption.videoPassage || "" }}
      </el-col>
      <el-col :span="12" v-show="typeNum == 6">
        <label class="el-form-item__label">序列号:</label>
        {{ tabOption.videoSerial || "" }}
      </el-col>
      <el-col :span="12" v-show="typeNum == 6">
        <label class="el-form-item__label">是否旋转:</label>
        {{ tabOption.videoOperable == 0 ? "是" : "否" || "" }}
      </el-col>
      <el-col :span="24" v-show="typeNum == 6">
        <label class="el-form-item__label">监控地址:</label>
        {{ tabOption.videoMonitorAddress || "" }}
      </el-col>
      <el-col :span="24" v-show="typeNum == 6">
        <label class="el-form-item__label">appkey:</label>
        {{ tabOption.videoAppkey || "" }}
      </el-col>
      <el-col :span="24" v-show="typeNum == 6">
        <label class="el-form-item__label">secret:</label>
        {{ tabOption.videoAppsecret || "" }}
      </el-col>
      <el-col :span="24" v-show="typeNum == 6">
        <label class="el-form-item__label">播放地址:</label>
        {{ tabOption.videoPlayAddress || "" }}
      </el-col>
      <el-col :span="24">
        <label class="el-form-item__label">离线时长设置:</label>
        超过{{ tabOption.offlineDuration || "0" }}分钟未收到监测数据为离线。
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="writeBox"
      v-if="writeBox"
      width="1000px"
      @close="closeWriteBox"
      title="修改记录"
      class="avue-dialog"
      append-to-body
    >
      <Remand :sensorId="sensorId" :writetableData="writetableData" :writepage="writepage"></Remand>
    </el-dialog>
  </div>
</template>
<script>
import Remand from "./remend";
import { mofigPage } from "@/api/monitorManage/device";
import { infoOption } from "@/const/crud/monitorManage/deviceList";
export default {
  name: "Tab1",
  props: ["tabOption", "typeNum", "infoData"],
  components: { Remand },
  data() {
    return {
      writeBox: false,
      writetableData: [],
      writeObj: {},
      sensorId: "",
      modify: true,
      infoOption: infoOption,
      writepage: {
        total: 0, // 总页数
        current: 1, // 当前页数
        size: 10, // 每页显示多少条,
      },
    };
  },
  methods: {
    async getListWrite(page, params, form) {
      await mofigPage({
        current: page.currentPage,
        size: page.pageSize,
        sensorId: params,
        ...form,
      }).then((v) => {
        if (v.data.data.records) {
          this.writeBox = true;
          this.writetableData = v.data.data.records;
          this.writepage.total = v.data.data.total;
        }
      });
    },
    writeBtn(row) {
      if (row.id) {
        this.sensorId = row.id;
        this.getListWrite(this.writepage, row.id);
      } else {
        this.$message.warning("该传感器暂无修改记录");
      }
    },
    closeWriteBox() {
      this.writeBox = false;
    },
  },
};
</script>