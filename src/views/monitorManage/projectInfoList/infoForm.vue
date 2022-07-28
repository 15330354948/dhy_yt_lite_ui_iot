<template>
  <div class="field_data">
    <div class="field_data__tree">
      <p class="field_data__title">项目信息</p>
      <!-- <div class="button-right" v-if="permissions.disaster_base_info_edit"> -->
      <div class="button-right">
        <el-button v-if="!isSave" icon="el-icon-edit" @click="handleSubmit" :disabled="disabledState">编辑</el-button>
        <el-button v-else icon="el-icon-check" @click="saveForm" type="primary">保存</el-button>
      </div>
      <avue-form v-loading="isloading" ref="form" v-model="form" :option="option">
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
        <template slot="cycle">
          <el-date-picker v-model="form.cycle" :disabled="!isSave" type="daterange" range-separator="至"
            start-placeholder="开始时间" end-placeholder="结束时间" prefix-icon="clear-icon" value-format="yyyy-MM-dd">
          </el-date-picker>
        </template>
      </avue-form>
      <el-dialog title="定位" :visible.sync="lonLatOpen" v-if="lonLatOpen" width="1000px" append-to-body>
        <lon-lat :LatAndLon="LatAndLon"></lon-lat>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    options
  } from "./infoForm";
  import LonLat from "@/components/Location";
  import {
    getProjectInfo,
    editData
  } from "@/api/monitorManage/projectInfo";
  import {
    getArea,
  } from "@/api/hideDanger/obj";
  export default {
    props: ["infoData"],
    components: {
      LonLat
    },
    data() {
      return {
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
        },
        lonLatOpen: false,
        LatAndLon: {
          longitude: '',
          latitude: ''
        },
        isSave: false,
        form: {
          cycle: ""
        },
        isloading: false,
        option: options,
        disabledState: false
      }
    },
    watch: {
      'form.status': {
        immediate: true,
        handler(val) {
          if (val == 2) {
            this.disabledState = true;
          } else {
            this.disabledState = false;
          }
        }
      }
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
            this.form.address = points.province + points.city + points.district + points.street + points
              .streetNumber
          });
          this.lonLatOpen = false;
        }
      })
    },
    mounted() {
      this.isSave = false;
      this.option.disabled = true;
      this.form = this.infoData
    },
    methods: {
      visibleChange() {
        document.querySelectorAll('.el-icon-loading').forEach(e => {
          e.style.display = 'none'
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
              console.log(e);
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
          console.log(data);
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
      async getForm() {
        this.isloading = true;
        const request = await getProjectInfo(this.infoData.id);
        let objTpl = request.data.data
        objTpl.cascader = [
          objTpl.province,
          objTpl.city,
          objTpl.county,
          objTpl.streetCode,
          objTpl.communityCode,
        ]
        objTpl.type /= 1;
        objTpl.cascader = objTpl.cascader.filter(function (s) {
          return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
        });
        if (objTpl.beginTime && objTpl.endTime) {
          objTpl.cycle = [objTpl.beginTime, objTpl.endTime]
        }
        this.form = objTpl;
        this.isloading = false;
      },
      handleSubmit() {
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
          this.form.cascader[2] ? this.form.county = this.form.cascader[2] : this.form.county = "";
          this.form.cascader[1] ? this.form.city = this.form.cascader[1] : this.form.city = "";
          this.form.cascader[0] ? this.form.province = this.form.cascader[0] : this.form.province = "";
          cascader[4] ? this.form.communityName = cascader[4] : this.form.communityName = "";
          cascader[3] ? this.form.streetName = cascader[3] : this.form.streetName = "";
          cascader[2] ? this.form.countyName = cascader[2] : this.form.countyName = "";
          cascader[1] ? this.form.cityName = cascader[1] : this.form.cityName = "";
          cascader[0] ? this.form.provinceName = cascader[0] : this.form.provinceName = "";
        }
        this.$set(this.form, 'beginTime', this.form.cycle[0]);
        this.$set(this.form, 'endTime', this.form.cycle[1]);
        // delete this.form.cycle;
        delete this.form.createTime;
        delete this.form.updateTime;
        this.$refs.form.validate((valid, done, msg) => {
          if (valid) {
            editData(this.form).then(
              res => {
                this.getForm();
                this.isSave = false;
                this.option.disabled = true;
                this.$message.success("操作成功!");
                this.isloading = false;
              }
            ).catch(err => {
              this.$message.error(err);
            })
          }
          done()
        })
      },


    }
  }

</script>

<style lang="scss" scoped>
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

  // ::v-deep .el-range-editor.is-disabled input {
  //   color: #000 !important;
  // }

</style>
