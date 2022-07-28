<template>
     <avue-crud ref="crudMofig" v-model="writeObj" :page.sync="writepage1" :data="writetableData1" :option="writeOption"
        @size-change="writesizeChange" @current-change="writecurrentChange" @search-change="searchChangewrite"
        @search-reset="searchResewrite">
    </avue-crud>
</template>
<script>
import { mofigPage } from "@/api/monitorManage/device";
import {  writeOption } from "@/const/crud/monitorManage/deviceList";
export default {
  name: "Remand",
  props: ["writetableData","sensorId","writepage"],
  data() {
    return {
      writeObj: {},
      writeOption: writeOption,
      writetableData1:[],
      writepage1: {
        total: 0, // 总页数
        current: 1, // 当前页数
        size: 10, // 每页显示多少条,
      },
    };
  },
  watch:{
      writetableData:{
          handler(val){
              this.writetableData1=val
          },
          immediate:true,
      },
      writepage:{
           handler(val){
              this.writepage1=val
          },
          immediate:true,
      }
  },
  methods: {
    searchResewrite() {
      this.getListWrite(this.writepage1, this.sensorId);
    },
    searchChangewrite(params, done) {
      if (params.operatorTime) {
        this.writeObj.beginTime = params.operatorTime[0];
        this.writeObj.endTime = params.operatorTime[1];
      }
      params.operator
        ? (this.writeObj.operator = params.operator)
        : delete this.writeObj.operator;
      this.getListWrite(this.writepage1, this.sensorId, this.writeObj);
      done();
    },
    async getListWrite(page, params, form) {
      await mofigPage({
        current: page.currentPage,
        size: page.pageSize,
        sensorId: params,
        ...form,
      }).then((v) => {
        if (v.data.data.records) {
          this.writeBox = true;
          this.writetableData1 = v.data.data.records;
          this.writepage1.total = v.data.data.total;
        }
      });
    },
    writesizeChange(pageSize) {
      this.writepage1.size = pageSize;
      this.getListWrite(this.writepage1, this.sensorId);
    },
    writecurrentChange(current) {
      this.writepage1.current = current;
      this.getListWrite(this.writepage1, this.sensorId);
    },
  },
};
</script>