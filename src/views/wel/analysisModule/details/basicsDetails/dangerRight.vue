<!--
 * @Author:张峻霖
 * @Date: 2021-03-04 14:53:28
 * @LastEditTime: 2021-03-17 11:14:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @Description: 监测点详情右侧
 * @FilePath: \LH-UI\src\views\wel\analysisModule\details\danger\dangerLeft.vue
-->
<template>
  <div class="dangerRight" :class="{ isanalysisDetails: isanalysisDetails }">
    <div class="child_module warning_situation">
      <el-collapse v-model="activeName">
        <el-collapse-item name="1" title="预警情况">
          <div class="warning_situation_body body_module">
            <div class="pageSwitching">
              <div :class="{ isactive: isactive == 1 }" @click="change(1)">
                综合告警
              </div>
              <div :class="{ isactive: isactive == 2 }" @click="change(2)">
                设备告警
              </div>
              <div :class="{ isactive: isactive == 3 }" @click="change(3)">
                定量告警
              </div>
              <div :class="{ isactive: isactive == 4 }" @click="change(4)">
                宏观告警
              </div>
            </div>
            <div class="warning_situation_synthesize">
              <div>
                <div>
                  <img src="@/assets/img/ordinary/no_data.png" alt="" />
                </div>
                <div>暂无数据</div>
              </div>
              <div>
                <div>
                  <p>综合预警数量</p>
                  <p>0</p>
                </div>
                <div></div>
              </div>
              <div>
                <div>
                  <img src="@/assets/img/ordinary/no_data.png" alt="" />
                </div>
                <div>暂无数据</div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="child_module personnel">
      <el-collapse v-model="activeName">
        <el-collapse-item name="2" title="四重网格人员">
          <div class="personnel_body body_module">
            <div>
              <div>
                <img src="@/assets/img/ordinary/personnel.jpg" alt="" />
              </div>
              <div>
                <p>群测群防员</p>
                <p>张某</p>
                <p>18523516***</p>
              </div>
            </div>
            <div>
              <div>
                <img src="@/assets/img/ordinary/personnel.jpg" alt="" />
              </div>
              <div>
                <p>群测群防员</p>
                <p>张某</p>
                <p>18523516***</p>
              </div>
            </div>
            <div>
              <div>
                <img src="@/assets/img/ordinary/personnel.jpg" alt="" />
              </div>
              <div>
                <p>群测群防员</p>
                <p>张某</p>
                <p>18523516***</p>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="child_module device">
      <el-collapse v-model="activeName">
        <el-collapse-item name="3" title="设备名称">
          <div class="device_body body_module">
            <el-scrollbar>
              <el-table :data="tableData" style="width: 100%" stripe>
                <el-table-column width="100" prop="date" label="日期">
                </el-table-column>
                <el-table-column width="100" prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="address" label="地址"> </el-table-column>
              </el-table>
            </el-scrollbar>
            <div class="block">
              <el-pagination
                small
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000"
              >
              </el-pagination>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["analysisDetails"]),
  data() {
    return {
      activeName: ["1", "2", "3"],
      isactive: 1,
      currentPage3: 3,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      isanalysisDetails: false,
    };
  },
  components: {},
  mounted() {},
  methods: {
    change(val) {
      this.isactive = val;
    },
    handleSizeChange() {
    },
    handleCurrentChange() {
    },
  },
  watch: {
    analysisDetails: {
      handler(val) {
        if (val.status) {
          this.isanalysisDetails = true;
          this.activeName = ["1", "2", "3"];
        } else {
          this.isanalysisDetails = false;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.dangerRight {
  position: absolute;
  top: 0;
  right: -25%;
  overflow: hidden;
  width: 25%;
  transition: right 0.6s;

  > div {
    width: 100%;
    background: rgba(0, 54, 99, 0.85);
    margin: 20px 0 0 0;
    border-radius: 6px;
  }
  .body_module {
    height: 230px;
  }
  .warning_situation_body {
    padding: 2%;
    .pageSwitching {
      display: flex;
      justify-content: center;

      > div {
        display: inline-block;
        width: 25%;
        border: 1px solid #1EE7F2;
        height: 44px;
        line-height: 44px;
        cursor: pointer;
      }

      > div:first-child {
        border-bottom-left-radius: 2px;
        border-top-left-radius: 2px;
      }

      > div:last-child {
        border-bottom-right-radius: 2px;
        border-top-right-radius: 2px;
      }

      .isactive {
        background: rgba(30, 231, 242, 0.4);
      }
    }
    .warning_situation_synthesize {
      display: flex;
      justify-content: center;
      > div {
        width: 27.33%;
        padding-top: 22px;
        img {
          width: 100%;
        }
      }
      > div:nth-child(2) {
        position: relative;
        width: 26%;
        > div {
          > P {
            line-height: normal;
            margin: 0;
          }
          > p:nth-child(2) {
            color: #0096ff;
            font-size: 24px;
            font-weight: bold;
            padding: 5px 0;
          }
        }
        > div:nth-child(2) {
          position: absolute;
          bottom: 0;
          margin-left: calc(50% - 2px);
          width: 1px;
          height: 54px;
          background-image: linear-gradient(
            rgba(255, 2552, 255, 0),
            rgba(255, 2552, 255, 1),
            rgba(255, 2552, 255, 0)
          );
        }
      }
    }
  }
  .personnel {
    .personnel_body {
      padding: 0px 16px;
      overflow: hidden;
      > div {
        float: left;
        width: calc(50% - 12px);
        height: 100px;
        margin: 6px 6px 6px 6px;
        background: rgba(2, 19, 58, 0.5);
        padding: 10px;
        div {
          height: 100%;
          float: left;
          img {
            height: 100%;
          }

          p {
            margin: 0;
            text-align: left;
            font-size: 14px;
          }
        }

        > div:nth-child(2) {
          width: calc(100% - 80px);
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
  .device_body {
    padding: 10px;
    .el-table {
      background: none;
      border-radius: 2px;
      td,
      tr,
      th {
        color: #fff;
        text-align: center;
        font-weight: 100;
        background: none;
        background: rgba(40, 118, 172, 0.3);
        border: none;
        padding: 0px;
        font-size: 14px;
        .cell {
          line-height: 36px;
        }
      }
      tr:hover > td {
        background: none;
      }
      .el-table__row--striped > td {
        background: rgba(39, 96, 136, 0.3);
      }
      thead {
        tr {
          background: rgba(0, 150, 255, 0.5);
          th {
            background: none;
            font-size: 16px;
            padding: 0;
            line-height: 32px;
          }
        }
      }
    }
    .el-table::before {
      height: 0;
    }
    .el-scrollbar {
      height: 180px;
    }
    .btn-prev,
    .btn-next {
      width: 22px;
      padding: 0;
    }
    .el-pagination--small .el-pager li,
    .btn-prev,
    .btn-next,
    .el-pagination__editor.el-input {
      background: none;
      color: #fff;
      border: 1px solid #f9f9f9;
      margin: 0 2px 0 2px;
    }
    .block {
      margin-top: 5px;
      span {
        color: #fff;
      }
      .el-pagination__editor.el-input {
        width: 26px;
        background: none;
        input {
          background: none;
          border: none;
          color: #fff;
        }
      }
    }
  }
}
.dangerRight.isanalysisDetails {
  right: 20px;
}
</style>
