<template>
  <div class="field_data">
    <div class="field_data__tree">
      <p class="field_data__title">监测点信息</p>
      <div class="button-right" v-if="permissions.JCD_detail_baseInfo_edit&&isEditTpl">
        <el-button v-if="!isSave" icon="el-icon-edit" @click="handleSubmit">编辑</el-button>
        <el-button v-else icon="el-icon-check" @click="saveForm" type="primary">保存</el-button>
        <!-- <el-button icon="el-icon-download">导出</el-button> -->
      </div>
      <avue-form v-loading="isloading" ref="form" v-model="form" :option="option">
        <!-- <template slot="menuForm">
          <el-button icon="el-icon-user" type="primary" @click="handleSubmit">提 交</el-button>
          <el-button icon="el-icon-delete" @click="handleEmpty">清 空</el-button>
        </template> -->
        <template slot="cascader" slot-scope>
          <el-cascader :props="props" v-model="form.cascader" :disabled="!isSave" size="mini" ref="cascaderDev"
            @change="locationsChange" clearable placeholder="请输入行政区划" @visible-change="visibleChange"></el-cascader>
        </template>

        <template slot="longitude">
          <el-input v-model="form.longitude" placeholder="请输入经度" :disabled="!isSave" clearable size="small">
            <el-button style="padding-right:10px" slot="suffix" type="text" :disabled="!isSave" @click="getLocation">定位
            </el-button>
          </el-input>
        </template>

        <template slot="rockType">
          <el-select v-if="rockType.length" :disabled="!isSave" v-model="form.rockType" placeholder="请选择岩石特征">
            <el-option v-for="item in rockType" :key="item.value*1" :label="item.label" :value="item.value*1">
            </el-option>
          </el-select>
        </template>
        <template slot="steady">
          <el-select v-if="steadyType.length" :disabled="!isSave" v-model="form.steady" placeholder="请选择稳定性">
            <el-option v-for="item in steadyType" :key="item.value*1" :label="item.label" :value="item.value*1">
            </el-option>
          </el-select>
        </template>
        <template slot="extentHarm">
          <el-select v-if="extentharmType.length" :disabled="!isSave" v-model="form.extentHarm" placeholder="请选择危害程度">
            <el-option v-for="item in extentharmType" :key="item.value*1" :label="item.label" :value="item.value*1">
            </el-option>
          </el-select>
        </template>
        <template slot="risk">
          <el-select v-if="riskType.length" :disabled="!isSave" v-model="form.risk" placeholder="请选择危险性">
            <el-option v-for="item in riskType" :key="item.value*1" :label="item.label" :value="item.value*1">
            </el-option>
          </el-select>
        </template>

        <template slot="level">
          <el-select v-if="levelType.length" v-model="form.level" :disabled="!isSave" placeholder="请选择隐患等级">
            <el-option v-for="item in levelType" :key="item.value*1" :label="item.label" :value="item.value*1">
            </el-option>
          </el-select>
        </template>

        <!-- <template slot="state">
          <el-select v-if="runningType.length" v-model="form.state" @change="runningChange" :disabled="!isSave"
            placeholder="请选择隐患等级">
            <el-option v-for="item in runningType" :key="item.id*1" :label="item.label" :value="item.id*1"></el-option>
          </el-select>
        </template> -->
      </avue-form>

      <el-dialog title="定位" :visible.sync="lonLatOpen" v-if="lonLatOpen" width="1000px" append-to-body>
        <lon-lat :LatAndLon="LatAndLon"></lon-lat>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    readOnlyOption
  } from "./readOnly";
  import {
    disasters_lope_field_questionnaire_update,
    disasters_lope_field_questionnaire
  } from "@/api/fieldSurvey";
  import {
    mapGetters
  } from "vuex";
  import {
    fieldOption
  } from "./fieldOption"
  import {
    qcqfPersonData,
    dictionary,
    areaData,
    getArea,
    editPageList,
    queryLatAndLon
  } from "@/api/hideDanger/obj";
  import {
    searchPageList
  } from '@/api/hideDanger/obj'
  import LonLat from "@/components/Location";
  export default {
    name: "hidedanger",
    props: ['dialogFormVisible', "disasterBase"],
    components: {
      LonLat
    },
    data() {
      let that = this;
      return {
        isMap: false,
        qcqfPersonDatas: [],
        jcyfzrdwPersonDatas: [], //预防联系人
        qcqfPhone: null,
        qcqfId: null,
        form: {
          warnHornBroadcast: 0
        },
        loading: true,
        option: fieldOption,
        readOnlyOption: readOnlyOption,
        readOnlyForm: {},
        isSave: false,
        levelType: [], //隐患等级
        // runningType: [], //运行状态
        // pbType: [], //坡边类别
        extentharmType: [], //危害程度
        riskType: [], //危险性
        steadyType: [], //稳定性
        rockType: [], //岩石特性
        isloading: false,
        lonLatOpen: false,
        LatAndLon: {
          longitude: '',
          latitude: ''
        },
        isEditTpl: true,
        props: {
          lazy: true,
          checkStrictly: true,
          expandTrigger: 'hover',
          async lazyLoad(node, resolve) {
            const {
              level
            } = node;
            if (level == 0) {
              const {
                data
              } = await getArea(0); //获取省接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  longitude: item.longitude,
                  latitude: item.latitude,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 1) {
              const {
                data
              } = await getArea(node.data.value); //获取市接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  longitude: item.longitude,
                  latitude: item.latitude,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 2) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 3) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: false
                };
              });
              resolve(nodes);
            } else if (level == 4) {
              const {
                data
              } = await getArea(node.data.value); //获取区/县接口
              var nodes = data.data.map(item => {
                return {
                  value: item.code,
                  label: item.name,
                  leaf: true
                };
              });
              resolve(nodes);
            } else if (level == 5) {
              document.querySelectorAll('.el-icon-loading').forEach(e => {
                e.style.display = 'none'
              })
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters(["permissions"])
    },
    watch: {
      dialogFormVisible(val) {
        // if(val){
        //   this.getTypeData()
        // }
        // this.form = this.isMap ? this.$store.getters.analysisDetails.data.data : JSON.parse(window.sessionStorage.getItem('disasterData'));
        // this.isMap = false;
        this.isSave = false;
        this.option.disabled = true;
      },
      // openTab(val){
      //   this.isSave = false;
      //   this.option.disabled = true;
      //   if(val == 1){
      //     this.isMap = false;
      //     this.getTypeData();
      //         }
      // },
      // mapOpenTab(val){
      //   this.isSave = false;
      //   this.option.disabled = true;
      //   if(val == 1){
      //     this.isMap = true;
      //     this.getTypeData();
      //   }
      // },
      disasterBase(val, pas) {
        if (val) {
          this.form = val;
        }
      },
    },
    mounted() {
      // this.getForm()
      setInterval(function () {
        document.querySelectorAll('.el-cascader-node__label').forEach(el => {
          el.onclick = function () {
            if (this.previousElementSibling) this.previousElementSibling.click()
          }
        })
      }, 200)
      this.form = this.disasterBase;
    },
    created() {
      this.$bus.$off("getPoints");
      this.$bus.$on("getPoints", (points) => {
        if (points) {
          let longitude = Number(points.longitude);
          let latitude = Number(points.latitude);
          this.$nextTick(() => {
            this.form.longitude = longitude.toFixed(6);
            this.form.latitude = latitude.toFixed(6);
            this.form.location = points.province + points.city + points.district + points.street + points
              .streetNumber
          });
          this.lonLatOpen = false;
        }
      })
      // this.sys_user_add = this.permissions["sys_user_add"];
      // this.sys_user_edit = this.permissions["sys_user_edit"];
      // this.sys_user_del = this.permissions["sys_user_del"];
      // this.sys_user_reset_password = this.permissions["sys_user_reset_password"];
    },
    methods: {
      visibleChange() {
        document.querySelectorAll('.el-icon-loading').forEach(e => {
          e.style.display = 'none'
        })
      },
      typeChange(type) { //坡边类型选择
      },
      getTypeData() {
        this.isloading = true;
        // this.getDictionary("disaster_type");
        // this.getDictionary("risk_type");
        // this.getDictionary("extent_harm");
        // this.getDictionary("steady_type");
        // this.getDictionary("rock_type");
        // this.getDictionary("level_type");

      },
      getAreaData(id, type) {
        areaData(id).then(res => {
          if (type == 1) {
            this.streetData = res.data.data;
          } else {
            this.communityData = res.data.data;
          }
        })
      },
      getDictionary(type) {
        dictionary(type).then(res => {
          let typeData = res.data.data;
          if (type == "steady_type") {
            this.steadyType = typeData; //稳定性
          } else if (type == "risk_type") {
            this.riskType = typeData;
          } else if (type == "extent_harm") {
            this.extentharmType = typeData;
          } else if (type == "level_type") {
            this.levelType = typeData;
          } else {
            this.rockType = typeData;
          }
        })
      },
      // 行政区划change
      locationsChange(e) {
        this.$refs.cascaderDev.toggleDropDownVisible();
        setTimeout(() => {
          let label = this.$refs.cascaderDev.inputValue;
          let city = (label.split('/')[0] + label.split('/')[1]).replace(/\s*/g, "")
          let postStr = {
            searchWord: city,
            searchType: 1
          }
          let query = {
            postStr: JSON.stringify(postStr),
            tk: '8a743b3f6afa6a0d96747f0bf9a152ff'
          }
          var _this = this;
          this.ajax({
            method: 'get',
            url: 'http://api.tianditu.gov.cn/administrative',
            data: query,
            success: function (res) {
              if (res.msg == 'ok') {
                _this.form.longitude = res.data[0].lnt
                _this.form.latitude = res.data[0].lat
              } else {
                _this.form.longitude = '116.3'
                _this.form.latitude = '39.9'
              }
            },
            async: true,
            //异常处理
            error: function (e) {
              throw e;
            }
          })
        }, 0);
      },
      createXHR() {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        return xhr;
      },
      // ajax
      ajax(obj) {
        var xhr = this.createXHR();
        obj.data = params(obj.data);
        if (obj.method === "get") {
          obj.url += obj.url.indexOf("?") == -1 ? "?" + obj.data : "&" + obj.data;
        }
        if (obj.async === false) {
          callback();
        }
        if (obj.async === true) {
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              callback();
            }
          }
        }
        xhr.open(obj.method, obj.url, obj.async);
        if (obj.method === "post") {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(obj.data);
        } else {
          xhr.send(null);
        }

        function callback() {
          if (xhr.status == 200) {
            obj.success(JSON.parse(xhr.responseText));
          } else {
            obj.error("请求错误");
          }
        }
        //键值对转换字符串
        function params(data) {
          var arr = [];
          for (var i in data) {
            arr.push(i + "=" + data[i]);
          }
          return arr.join("&");
        }
      },
      // 定位
      async getLocation() {
        if (this.form.longitude && this.form.latitude) {
          this.LatAndLon.longitude = this.form.longitude
          this.LatAndLon.latitude = this.form.latitude
        }
        this.lonLatOpen = true
      },
      handleSubmit() { //编辑
        this.isSave = true;
        this.option.disabled = false;
      },
      saveForm() {
        var r = this.form.cascader.filter(function (s) {
          return s && s.trim();
        });
        this.form.cascader = r
        if (this.$refs.cascaderDev.inputValue) {
          let cascader = this.$refs.cascaderDev.inputValue.split('/');
          this.form.cascader[4] ? this.form.communityCode = this.form.cascader[4] : this.form.communityCode = "";
          this.form.cascader[3] ? this.form.streetCode = this.form.cascader[3] : this.form.streetCode = "";
          this.form.cascader[2] ? this.form.countyCode = this.form.cascader[2] : this.form.countyCode = "";
          this.form.cascader[1] ? this.form.cityCode = this.form.cascader[1] : this.form.cityCode = "";
          this.form.cascader[0] ? this.form.provinceCode = this.form.cascader[0] : this.form.provinceCode = "";
          cascader[4] ? this.form.communityName = cascader[4] : this.form.communityName = "";
          cascader[3] ? this.form.streetName = cascader[3] : this.form.streetName = "";
          cascader[2] ? this.form.countyName = cascader[2] : this.form.countyName = "";
          cascader[1] ? this.form.cityName = cascader[1] : this.form.cityName = "";
          cascader[0] ? this.form.provinceName = cascader[0] : this.form.provinceName = "";
        }
        if (this.form.runningStatus != "cancellation") {
          this.form.cancellationTime = ""
          this.form.cancellationRemark = ""
        }

        this.$refs.form.validate((valid, done, msg) => {
          if (valid) {
            editPageList(this.form).then(
              res => {
                this.getForm();
                this.isSave = false;
                this.option.disabled = true;
                this.$message.success("操作成功!");
                this.isloading = true;
              }
            ).catch(err => {
              this.$message.error(err);
            })
          }
          done()
        })

      },
      async getForm() {
        this.isloading = true;
        const request = await searchPageList(this.disasterBase.id);
        let objTpl = request.data.data
        objTpl.cascader = [
          objTpl.provinceCode,
          objTpl.cityCode,
          objTpl.countyCode,
          objTpl.streetCode,
          objTpl.communityCode,
        ]
        objTpl.cascader = objTpl.cascader.filter(function (s) {
          return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
        });
        this.form = objTpl;
        this.isloading = false;
      },
    }
  };

</script>

<style lang="scss" scoped>
  .el-cascader-panel .el-radio {
    width: 132px;
    height: 34px;
    line-height: 34px;
    padding: 0 10px;
    z-index: 10;
    position: absolute;
  }

  .el-cascader-panel .el-radio__input {
    visibility: hidden;
  }

  .el-cascader-panel .el-cascader-node__postfix {
    top: 10px;
  }

  .field_data {
    display: flex;
    height: 100%;

    &__btn {
      margin-bottom: 5px;
    }

    &__title {
      margin: 0;
      height: 30px;
      line-height: 30px;
      font-weight: 700;
      font-size: 20px;
      text-align: center;
    }

    &__tree {
      // max-height: 63vh;
      padding-top: 3px;

      .button-right {
        display: flex;
        justify-content: flex-end;
        padding: 10px;
      }
    }
  }

  ::v-deep .el-textarea.is-disabled .el-textarea__inner {
    color: #000 !important;
  }

  ::v-deep .el-input.is-disabled .el-input__inner {
    color: #000 !important;
  }

  .el-cascader.color_dark {
    ::v-deep .el-input__inner::-webkit-input-placeholder {
      color: #606266;
    }

    ::v-deep .el-input__inner::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #606266;
    }

    ::v-deep .el-input__inner:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #606266;
    }

    ::v-deep .el-input__inner:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #606266;
    }
  }

  .field_data__tree {
    overflow-y: auto;
    padding: 40px 80px;
  }

</style>

<style lang="scss">
  .avue-tree .el-tree {
    overflow-y: scroll;
    overflow-x: hidden;
    // max-height: 55vh;
  }

</style>
