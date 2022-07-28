<template>
    <div class="text-msg">
        <div class="field_data__tree">
            <p class="field_data__title"></p>
<!--            <el-tabs tab-posision="top"  @tab-click="tabClick" v-model="activeName" v-loading="isLoading">-->
<!--                <el-tab-pane :name="item.label" v-for="item in warnLevel" :key="item.value" :label="item.label">-->
                    <el-form label-position="top"
                     label-width="80px"
                     >
                     <el-form-item v-for="(item,index) in warnLevel" :key="index" :label="item.label" class="box-shadow pd-20">
                         <el-input type="textarea" v-model="item.content" readonly></el-input>
                     </el-form-item>
                     </el-form>
<!--                </el-tab-pane>-->
<!--            </el-tabs>-->
        </div>
    </div>
</template>
<script>
// import { dictionary } from "@/api/hideDanger/obj";

import { getZTDic,dictionary } from "@/api/public";
import {sendRecordmodel} from '@/api/warningRecord'
import { log } from 'three';

export default {
    data(){
        return{
            isLoading:true,
            warnLevel:[],
            activeName:'',
            moduleForm:{
                people:[
                    {
                        name:'其他人员',
                        content:''
                    },
                    {
                        name:'群测群防员',
                        content:''
                    },
                    {
                        name:'管理人员',
                        content:''
                    },
                    {
                        name:'专业人员',
                        content:''
                    }
                ]
            },
            contents:{
                "1":'',
                "2":'',
                "3":'',
                "4":'',
                "5":''
            },
        }
    },
    created(){
      this.$nextTick(() => {
        this.getDictionary();
      })
    },
    methods:{
        handleChange(column){
            switch(column.prop){
                case 'blue':this.moduleForm.people.forEach(item => item.content = this.blueContent);break;
                case 'yellow':this.moduleForm.people.forEach(item => item.content = this.yellowContent);break;
                case 'orange':this.moduleForm.people.forEach(item => item.content = this.orangeContent);break;
                case 'red':this.moduleForm.people.forEach(item => item.content = this.redContent);break;
            }
        },
        async getFormData(){
          return new Promise((resolve,reject) => {
            sendRecordmodel().then( res => {
              console.log("smsContentBlueStencil",res)
              this.contents["1"] = res.data.data.smsContentRedStencil;
              this.contents["3"] = res.data.data.smsContentYellowStencil;
              this.contents["2"] = res.data.data.smsContentOrangeStencil;
              this.contents["4"] = res.data.data.smsContentBlueStencil;
              this.contents["5"] = "无需告警"
              this.moduleForm.people.forEach(item => item.content = res.data.data.smsContentRedStencil)
              console.log("this.moduleForm",this.moduleForm)
              resolve(this.contents)
            })
          })
        },
        saveForm(){
        },
        getDictionary(){
            if(this.warnLevel.length){
                this.getFormData();
                return;
            }
            dictionary('warn_level').then(
                    res => {
                        this.warnLevel = res.data.data.warn_level.filter(item => {return item.value*1 < 5});
                        if(this.warnLevel&&this.warnLevel.length>0){
                            this.activeName = this.warnLevel[0].label;
                            this.getFormData().then(res => {
                              this.warnLevel.forEach( item => {
                                item.content = res[item.value]
                              })
                              this.warnLevel = Object.assign({},this.warnLevel)
                              this.isLoading = false;
                            })
                        }else{
                            this.isLoading = false;
                        }
                    }
                );
        },
        tabClick(tab,event){
            this.moduleForm.people.forEach(item => item.content = this.contents[tab.$vnode.data.key]);
        }
    }
}
</script>
<style lang="scss" scoped>
.box-shadow{box-shadow: 3px 5px 10px #ddd;}
.el-tabs{
    padding: 0 !important;
    ::v-deep .el-tabs__nav-wrap{box-shadow: 3px 5px 28px #eee;}
    ::v-deep .el-tabs__item{font-size: 16px;}
}
.el-form {
    ::v-deep .el-form-item__label{font-size: 18px;}
    ::v-deep .el-textarea__inner{height: 80px;font-size: 16px !important;}
}
</style>
