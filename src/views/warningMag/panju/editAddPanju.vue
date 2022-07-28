<template>
    <div class="infor_all_div">
    <div class="panju_tanc" ref="devInforAllStetion" style="left:50%;margin-left:-600px;top:84px;width:1200px;height:calc(100% - 144px);">
        <div class="infor-title" @mouseup="mouseup" @mousedown="mousedown">
            <span>{{titleName}}</span>
            <div class="indor-icon">
                <i class="el-icon-full-screen" @click="screen"></i>
                <i class="el-icon-close" @click="inforHidden"></i>
            </div>
        </div>
        <div class="panju_infor">
            <div class="panju_topline"></div>
            <div class="panju_content">
                <div class="panju_content_left">
                    <div class="panju_nei">
                        <div class="panju_input">
                            <el-form ref="addForm" :model="addForm" :rules="rulesPanju" label-width="100px">
                                <div class="panju_from">
                                    <el-form-item label="判据名称" prop="name">
                                        <el-input v-model="addForm.name" placeholder="请输入判据名称"></el-input>
                                    </el-form-item>
                                    <span class="yanzhengClass" @click="yanzhengPanjuM">验证判据名</span>
                                    <el-form-item label="传感器类型" prop="region">
                                        <el-select
                                            v-model="addForm.region"
                                            @change="qiehuan"
                                            :disabled="disabledChoise"
                                        >
                                            <el-option v-for="(item,index) in jianceleixing" :key="index" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-tooltip placement="top">
                                        <div slot="content" style="max-width:300px">
                                            <div>{{jianceleixingStr}}</div>
                                        </div>
                                        <i class="el-icon-warning-outline yanzhengClass" style="color:red"></i>
                                    </el-tooltip>
                                </div>
                                <el-form-item label="判据简介" prop="desc">
                                    <el-input type="textarea" v-model="addForm.desc"></el-input>
                                </el-form-item>

                                <div class="panju_dengji">
                                    <label class="el-form-item__label" style="width:80px;">预警等级</label>
                                    <div class="panju_all_lei">
                                        <div class="panju_leixnig" v-for="(item,index) in panjuList" :key="index" >
                                            <div :class="['panju_title_top',item.class]">{{item.modelName}}</div>
                                            <div class="panju_biaoda">
                                                <label>表达式</label>
                                                <div class="biaoda_title">
                                                    <span class="font-color" @click="verification(item.modelValue,index)">公式检验</span>
                                                    <span @click="clearInput(item.modelValue,index)">清空</span>
                                                </div>
                                            </div>
                                            <div class="panju_padding biaoda_fuewn">
                                                <el-input :ref="item.ref" class="inputFuwenben" type="textarea" v-model="item.modelValue" @focus="inputClick(index)"></el-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panju_btn">
                <div class="panju_computer">
                    <div class="jianpan_title">
                        <span>公式编辑器</span>
                        <el-tooltip placement="top">
                            <div slot="content" style="max-width:300px">
                                <div>示例</div><br/>
                                <div v-for="(item,index) in panjuGongshi[addForm.region]" :key="index">
                                    <div>{{item.value}}</div>
                                    <br />
                                </div>
                            </div>
                            <i class="el-icon-warning-outline"></i>
                        </el-tooltip>
                    </div>
                    <div class="jianpan_content">
                        <el-button :class="['jianpan_btn',item.class]" v-for="(item,index) in typeShare" :key="index" :disabled="index<3&&disabled" @click="cursorInput(item.table,item.value)">{{item.table}}</el-button>
                        <el-button :class="['jianpan_btn',item.class]" v-for="(item,index) in jianceTypeFormula" :key="index+23" @click="cursorInput(item.table,item.value)">{{item.table}}</el-button>
                    </div>
                </div>
                <div class="panju_btn_bottom">
                    <el-button @click="inforHidden">取消</el-button>
                    <el-button class="addpanju_btn" @click="panjuadd_queren" :loading="loading">确认</el-button>
                </div>
            </div>
        </div>

        <div class="linshi" v-if="lianxuShow">
            <div class="linshi_div">
                <div class="add_title">
                    <span>连续公式设置</span>
                    <i class="el-icon-close close_add" @click="delLinshi"></i>
                </div>
                <div class="fromClas">
                    <div class="lianxudiv">
                        <span>连续</span>
                        <el-input class="shijiannumber" type="text" v-model="dayNumber" maxlength="1" @input="numberInput"></el-input>
                        <el-select class="shijianname" v-model="daytime" @change="danweiName">
                            <el-option
                                v-for="(item,index) in dayOptions"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="lianxudiv" v-for="num of Number(dayNumber)" :key="num">
                        <span>前{{num - 1}}~{{num}}{{timeName}}</span>
                        <el-select class="shijianname" v-model="jiancetypeName" @change="bianliangName($event)">
                            <el-option
                                v-for="(item,index) in jiancetypeOptions"
                                :key="index"
                                :label="item.fieldDesc"
                                :value="item">
                            </el-option>
                        </el-select>
                        <span>>=</span>
                        <el-input class="shijiannumber" type="text" v-model="yusheValue" @input="numberValue"></el-input>
                        <span>{{jiancetypeName.unit}}</span>
                    </div>
                </div>
                <div class="lianxu_btn">
                    <el-button @click="delLinshi">取消</el-button>
                    <el-button type="primary" @click="querenAddLianxu">确认</el-button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
// import { getSensorList } from '@/api/menus/panjuHoutai';
import { typeShare, typeObj, jianceLianxu ,panjuGongshi ,guanbiTime ,jianceleixingStr } from '@/util/panju/panjuObj.js';
import { panjuComponents } from '@/util/panju/panju.js';
import { searchSersorType } from "@/api/monitorManage/quxian";

// import {
//     panjuyanzheng,
//     panjuadd,
//     editpanju,
//     panjuNameYanzheng
// } from "@/api/menus/dangerCriterion";

export default{
    name:"editAddPanju",
    props:["editpanjudata"],
    data(){
        return{
            
            titleName:"新增判据",
            jianceleixingStr:jianceleixingStr,
            panjuGongshi:panjuGongshi,
            yusheValue:'',
            timeName:'日',
            jiancetypeName:{},
            jiancetypeOptions:[],
            dayNumber:2,
            daytime:'day',
            dayOptions:[
                {
                    label:'日',
                    value:'day',
                },{
                    label:'时',
                    value:'houre',
                }
            ],
            lianxuShow:false,
            typeShare:typeShare,
            jianceTypeFormula:[],
            loading:false,
            rulesPanju:{
                name: [
                    { required: true, message: '判据名称不能为空', trigger: 'blur' },
                ],
                region: [
                    { required: true, message: '请选择监测类型', trigger: 'change' },
                ],
                desc: [
                    { required: false, message: '', trigger: 'blur' }
                ]
            },
            addForm:{
                name:'',
                region:'',
                desc:''
            },
            jianceleixing:[],
            disabled:false,
            panjuList:[
                {
                    modelValue:'',
                    class:'lanse',
                    ref:'lanse',
                    modelName:'蓝色预警',
                    fenxiData:[]
                },
                {
                    modelValue:'',
                    class:'huangse',
                    ref:'huangse',
                    modelName:'黄色预警',
                    fenxiData:[]
                },
                {
                    modelValue:'',
                    class:'chengse',
                    ref:'chengse',
                    modelName:'橙色预警',
                    fenxiData:[]
                },
                {
                    modelValue:'',
                    class:'hongse',
                    ref:'hongse',
                    modelName:'红色预警',
                    fenxiData:[]
                }
            ],
            focusNum:0,
            allFenxiList:{},//传给后台的所有参数
            typeValue:0,

            disabledChoise:false,

            xX:0,
            yY:0,
        }
    },
    created(){
        searchSersorType("sensor_type").then(res => {
            this.jianceleixing = res.data.data;
        })
        // getSensorList().then(res => {
        //     if(res.status == 200){
        //         this.jianceleixing = res.data.data;
        //     }
        // });
        if(this.editpanjudata.id){
            if(this.editpanjudata.jingzhiChoiseType === false){
                this.disabledChoise = true
            }
            this.titleName = "修改判据"
            this.addForm = {
                name:this.editpanjudata.criterionName,
                region:this.editpanjudata.monitorType,
                desc:this.editpanjudata.criterionInfo,
            };
            this.panjuList = [
                {
                    modelValue:this.editpanjudata.blueCriterionExpression,
                    class:'lanse',
                    ref:'lanse',
                    modelName:'蓝色预警',
                    fenxiData:[]
                },
                {
                    modelValue:this.editpanjudata.yellowCriterionExpression,
                    class:'huangse',
                    ref:'huangse',
                    modelName:'黄色预警',
                    fenxiData:[]
                },
                {
                    modelValue:this.editpanjudata.orangeCriterionExpression,
                    class:'chengse',
                    ref:'chengse',
                    modelName:'橙色预警',
                    fenxiData:[]
                },
                {
                    modelValue:this.editpanjudata.redCriterionExpression,
                    class:'hongse',
                    ref:'hongse',
                    modelName:'红色预警',
                    fenxiData:[]
                }
            ];
            if(guanbiTime.indexOf(this.editpanjudata.monitorType) != -1){
                this.disabled = true;
            }else{
                this.disabled = false;
            }
            this.jianceTypeFormula = typeObj[this.editpanjudata.monitorType];
            this.typeValue = this.editpanjudata.monitorType
        }
    },
    mounted(){
        
    },
    watch:{
        
    },
    methods:{
        yanzhengPanjuM:function(){
            if(this.addForm.name == ""){
                this.$message({
                    message: '判据名不能为空',
                    type: 'warning'
                });
            }else{
                var yanzheng = {};
                yanzheng.criterionName = this.addForm.name;
                if(this.editpanjudata.id){
                    yanzheng.criterionId = this.editpanjudata.id
                }else{
                    yanzheng.criterionId = ""
                }
                // panjuNameYanzheng(
                //     yanzheng
                // ).then((res) => {
                //     if(res.data.data == false){
                //         this.$message({
                //             message: '该判据名可用',
                //             type: 'success'
                //         });
                //     }else{
                //         this.$message({
                //             message: '已存在该判据名',
                //             type: 'warning'
                //         });
                //     }
                // })
            }
        },
        inputClick:function(num){//获取光标在第几个预警位置
            this.focusNum = num;
        },
        panjuadd_queren:function(){//新增判据
            var yanzheng = {};
            yanzheng.criterionName = this.addForm.name;
            if(this.editpanjudata.id){
                yanzheng.criterionId = this.editpanjudata.id
            }
            if(this.addForm.name == "" || this.addForm.region == ""){
                this.$message({
                    message: '请补全填写信息',
                    type: 'warning'
                });
            }else{
                // panjuNameYanzheng(
                //     yanzheng
                // ).then((res) => {
                //     if(res.data.data == false){
                //         for(var i=0;i<this.panjuList.length;i++){
                //             // this.panjuList[i].fenxiData = panjuComponents(this.panjuList[i].modelValue,this.typeValue,this.jianceTypeFormula);
                //             var dataListPanju = panjuComponents(this.panjuList[i].modelValue,this.typeValue,this.jianceTypeFormula);
                //             var inputValue = this.panjuList[i].modelValue.replace(/\s+/g," ");//多个空格改为一个空格
                //             if(dataListPanju == "noData"){
                //                 if(inputValue == " " || inputValue == ""){

                //                 }else{
                //                     this.$message({
                //                         message: '请填写正确的判据格式',
                //                         type: 'warning'
                //                     });
                //                     return false;
                //                 }
                //             }else{
                //                 this.panjuList[i].fenxiData = dataListPanju
                //             };
                //             switch (this.panjuList[i].modelName) {
                //                 case "蓝色预警":
                //                     this.allFenxiList.blueCriterionExpression = this.panjuList[i].modelValue;
                //                     this.allFenxiList.blueFormulaDTO = this.panjuList[i].fenxiData;
                //                     break;
                            
                //                 case "黄色预警":
                //                     this.allFenxiList.yellowCriterionExpression = this.panjuList[i].modelValue;
                //                     this.allFenxiList.yellowFormulaDTO = this.panjuList[i].fenxiData;
                //                     break;

                //                 case "橙色预警":
                //                     this.allFenxiList.orangeCriterionExpression = this.panjuList[i].modelValue;
                //                     this.allFenxiList.orangeFormulaDTO = this.panjuList[i].fenxiData;
                //                     break;

                //                 case "红色预警":
                //                     this.allFenxiList.redCriterionExpression = this.panjuList[i].modelValue;
                //                     this.allFenxiList.redFormulaDTO = this.panjuList[i].fenxiData;
                //                     break;
                //             }
                //         }

                //         this.allFenxiList.criterionName = this.addForm.name;
                //         this.allFenxiList.monitorType = this.addForm.region;
                //         this.allFenxiList.criterionInfo = this.addForm.desc;

                //         if(this.editpanjudata.id){
                //             // console.log("修改")
                //             this.allFenxiList.id = this.editpanjudata.id;
                //             // editpanju(
                //             //     this.allFenxiList
                //             // ).then((res) => {
                //             //     this.loading = false;
                //             //     if(res.data.data){
                //             //         this.$emit("close_addPanju",'shuaxinData')
                //             //         this.$message({
                //             //             message:'修改判据成功。',
                //             //             type:'success',
                //             //         })
                //             //     }else{
                //             //         this.$message({
                //             //             message:'修改判据失败。',
                //             //             type:'warning',
                //             //         })
                //             //     }
                                
                //             // })
                //         }else{
                //             // console.log("新增")
                //             // panjuadd(
                //             //     this.allFenxiList
                //             // ).then((res) => {
                //             //     this.loading = false;
                //             //     if(res.data.data){
                //             //         this.$emit("close_addPanju",'shuaxinData')
                //             //         this.$message({
                //             //             message:'新增判据成功。',
                //             //             type:'success',
                //             //         })
                //             //     }else{
                //             //         this.$message({
                //             //             message:'新增判据失败。',
                //             //             type:'warning',
                //             //         })
                //             //     }
                //             // })
                //         }
                //     }else{
                //         this.$message({
                //             message: '已存在该判据名',
                //             type: 'warning'
                //         });
                //     }
                // })
            }
        },
        verification:function(val,num){//公式验证
            var yanzheng = panjuComponents(this.panjuList[num].modelValue,this.typeValue,this.jianceTypeFormula);
            var inputValue = this.panjuList[num].modelValue.replace(/\s+/g," ");//多个空格改为一个空格
            if(yanzheng == "noData"){
                if(inputValue == " " || inputValue == ""){
                    this.$message({
                        message: '请输入正确的表达式',
                        type: 'warning'
                    });
                }else{
                    this.$message({
                        message: '公式验证失败',
                        type: 'warning'
                    });
                }
            }else{
                for(var j=0;j<yanzheng.length;j++){
                    if(yanzheng[j].thresholdValue == "" || yanzheng[j].thresholdValue == undefined || yanzheng[j].operator == undefined || yanzheng[j].fieldDesc == undefined){
                        this.$message({
                            message: '公式验证失败',
                            type: 'warning'
                        });
                        return false;
                    }
                }
                

                console.log(yanzheng)
                // panjuyanzheng(
                //     yanzheng,
                //     this.typeValue
                // ).then((res) => {
                //     if(res.data.data){
                //         this.$message({
                //             message: '公式验证正确',
                //             type: 'success'
                //         });
                //     }else{
                //         this.$message({
                //             message: '公式验证失败',
                //             type: 'warning'
                //         });
                //     }
                // })
            }
        },
        clearInput:function(val,num){//清空
            this.panjuList[num].modelValue = "";
        },
        cursorInput:function(val,valueShuxing){//点击键盘
            if(val == "删除"){
                var inputValue = this.panjuList[this.focusNum].modelValue;
                if (inputValue.indexOf("  ") == -1) {
                    // alert("没有两个空格");
                    inputValue = inputValue.replace(/(^\s*)|(\s*$)/g, '');
                    var valueArr = inputValue.split(" ");
                    valueArr.pop();
                    this.panjuList[this.focusNum].modelValue = valueArr.join(" ");
                } else {
                    // alert("有两个空格");
                    var regEx = /\s+/g;
                    this.panjuList[this.focusNum].modelValue = this.panjuList[this.focusNum].modelValue.replace(regEx," ");
                }
            }else if(val == "连续"){
                this.daytime = "day";
                this.timeName = "日";
                this.dayNumber = 2;
                this.yusheValue = "";

                if(this.typeValue == 101){
                    // console.log("连续裂缝弹窗")
                    this.lianxuShow = true;
                    this.jiancetypeOptions = jianceLianxu[this.typeValue];
                    this.jiancetypeName = this.jiancetypeOptions[0]
                }else if(this.typeValue == 102){
                    // console.log("连续地表位移弹窗")
                    this.lianxuShow = true;
                    this.jiancetypeOptions = jianceLianxu[this.typeValue];
                    this.jiancetypeName = this.jiancetypeOptions[0]
                }
            }else{
                const addValue = " " + val + " ";
                this.panjuList[this.focusNum].modelValue = this.panjuList[this.focusNum].modelValue + addValue;
            }
        },
        danweiName:function(e){
            if(e == 'day'){
                this.timeName = "日";
            }else if(e == "houre"){
                this.timeName = "时";
            }
        },
        numberInput:function(e){
            var that = this;
            var number = Number(e);
            var reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
            var pattern = new RegExp(reg);
            if(pattern.test(number)){
                if(number <2 && number != 0){
                    this.$message({
                        message: '请输入2~5整数',
                        type: 'warning'
                    });
                    that.dayNumber = "";
                }else if(number >5){
                    this.$message({
                        message: '请输入2~5整数',
                        type: 'warning'
                    });
                    that.dayNumber = "";
                }
            }else{
                that.dayNumber = "";
                this.$message({
                    message: '请输入2~5整数',
                    type: 'warning'
                });
            }
        },
        numberValue:function(e){
            var that = this;
            var number = Number(e);
            var reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
            var pattern = new RegExp(reg);
            if(pattern.test(number)){

            }else{
                that.yusheValue = "";
                this.$message({
                    message: '请输入数字',
                    type: 'warning'
                });
            }
        },
        bianliangName:function(e){
            console.log(this.jiancetypeName)
        },
        querenAddLianxu:function(){
            if(this.dayNumber == ""){
                this.$message({
                    message: '请输入连续天数',
                    type: 'warning'
                });
                return false;
            }else if(this.yusheValue == ""){
                this.$message({
                    message: '请输入连续阈值',
                    type: 'warning'
                });
                return false;
            }

            var aa = "";
            var name = "";
            if(this.daytime == 'day'){
                name = "日";
            }else if(this.daytime == "houre"){
                name = "时";
            }
            for(var i=0;i<Number(this.dayNumber);i++){
                if(i != Number(this.dayNumber) - 1){
                    aa = aa + "  前  " + i + "~" + (i + 1) + "  " + name + "  " + this.jiancetypeName.table + "  " + "≥" + "  " + this.yusheValue + "  " + "且"
                }else{
                    aa = aa + "  前  " + i + "~" + (i + 1) + "  " + name + "  " + this.jiancetypeName.table + "  " + "≥" + "  " + this.yusheValue
                }
            }
            this.panjuList[this.focusNum].modelValue = aa;
            this.delLinshi();
        },
        qiehuan:function(e){

            for(var i=0;i<this.panjuList.length;i++){
                this.panjuList[i].modelValue = '';
            }

            var typeValue = e;
            this.typeValue = e;
            if(guanbiTime.indexOf(typeValue) != -1){
                this.disabled = true;
            }else{
                this.disabled = false;
            }
            this.jianceTypeFormula = typeObj[typeValue];
            
        },
        mouseup:function(e){
            // console.log("松开了")
            document.removeEventListener("mousemove",this.mousemove);
            document.onselectstart = function() { return true; };
        },
        mousedown:function(e){
            // console.log("点击了")
            this.startX = e.pageX;
            this.startY= e.pageY;
            if(this.$refs.devInforAllStetion.style.left.indexOf("%") != -1){
                this.xX = (this.$refs.devInforAllStetion.style.left.split('%')[0]/100).toFixed(2)*document.body.clientWidth;
            }else{
                this.xX = this.$refs.devInforAllStetion.style.left.split('px')[0];
            }
            this.yY = this.$refs.devInforAllStetion.style.top.split('px')[0];
            document.addEventListener("mousemove",this.mousemove);
        },
        mousemove:function(e){
            // console.log("移动")
            var str = {
                moveX:e.pageX - this.startX,
                moveY:e.pageY - this.startY,
            }
            this.$refs.devInforAllStetion.style.left = Number(this.xX) + str.moveX + "px";
            this.$refs.devInforAllStetion.style.top = Number(this.yY) + str.moveY + "px";
        },
        screen:function(){//放大缩小移动框
            this.inforScreenType = !this.inforScreenType
            if(this.inforScreenType){
                this.devFangda()
            }else{
                this.devSuoxiao()
            }
        },
        inforHidden:function(){//关闭移动框
            this.$emit("close_addPanju",false)
        },
        devSuoxiao:function(){
            this.$refs.devInforAllStetion.style.top = "84px";
            this.$refs.devInforAllStetion.style.left = "50%";
            this.$refs.devInforAllStetion.style.width = "1200px";
            this.$refs.devInforAllStetion.style.marginLeft = "-600px";
            this.$refs.devInforAllStetion.style.height = "calc(100% - 144px)";
        },
        devFangda:function(){
            this.$refs.devInforAllStetion.style.top = '0px';
            this.$refs.devInforAllStetion.style.left = '0px';
            this.$refs.devInforAllStetion.style.marginLeft = "0px";
            this.$refs.devInforAllStetion.style.width = "100%";
            this.$refs.devInforAllStetion.style.height = "100%";
        },
        delLinshi:function(){
            this.lianxuShow = false;
        },
    }
}

</script>

<style lang="scss" scoped>
$back_color : #238bf1;
$font_color : #3a3a3a;
$font_big : 18px;
$font-small : 14px;

.lanse{
    background:#06bdf2!important;
}
.huangse{
    background:#e8db09!important;
}
.chengse{
    background:#fbac01!important;
}
.hongse{
    background:#ff0303!important;
}

.font-color{
    color:$back_color;
    cursor:pointer;
}
.addpanju_btn{
    background:$back_color;
    color:white;
}
.panju_tanc{
    position:fixed;
    background:white;
    box-shadow: 1px 1px 15px rgba(0,0,0,.3);
    z-index:2000;

    ::-webkit-scrollbar{  
        width: 3px!important;
        height:10%!important;
    }

    .panju_infor{
        width:100%;
        height:calc(100% - 45px);

        .panju_topline{
            height:20px;
            width:100%;
            background:white;
        }
        .panju_content{
            width:100%;
            height:calc(100% - 100px);
            overflow-y:auto;

            .panju_content_left{
                width:72%;

                .panju_nei{
                    padding-left:20px;
                    padding-right:20px;
                    
                    ::v-deep.el-textarea>.el-textarea__inner{
                        height:70px;
                    }
                    
                    .panju_from{
                        display :flex;
                        align-items :center;

                        .yanzhengClass{
                            margin-left:8px;
                            margin-right:8px;
                            color:$back_color;
                            margin-bottom: 22px;
                            cursor:pointer;
                        }
                        
                        ::v-deep.el-form-item{
                            width:40%;
                        }

                        ::v-deep.el-form-item__content>.el-input{
                            width:100%;
                        }

                        ::v-deep.el-select{
                            width:100%;
                        }
                    }

                    ::v-deep.panju_dengji{
                        width:100%;
                        display :flex;
                        justify-content :space-between;
                        
                        .panju_all_lei{
                            width:calc(100% - 80px);
                        }
                        .panju_leixnig{
                            width:100%;
                            background:#f2f2f2;
                            position :relative;
                            padding-bottom:10px;
                            border-top:1px solid transparent;
                            margin-bottom:30px;

                            .panju_title_top{
                                position :absolute;
                                top:-10px;
                                padding:3px 15px;
                                left:15px;
                                background:#06bdf2;
                                border-radius :3px;
                                color:white;
                            }

                            .panju_biaoda{
                                padding-left:15px;
                                padding-right:15px;
                                margin-top:25px;
                                display :flex;
                                align-items:center;
                                justify-content :space-between;

                                .biaoda_title{

                                    span{
                                        margin-left:15px;
                                        cursor:pointer;
                                    }
                                }                                
                            }
                            .biaoda_fuewn{
                                margin-top:10px;
                            }
                            .inputFuwenben{
                                width:96%;
                                margin-left:2%;
                            }
                        }

                    }
                }
            }
        }
        .panju_btn{
            width:100%;
            background:white;
            position :relative;

            .panju_computer{
                position :absolute;
                left:72%;
                bottom:0;
                width:260px;

                .jianpan_title{
                    display :flex;
                    align-items :center;
                    justify-content :space-between;
                    padding:8px 10px;
                    font-size:14px;
                    background:$back_color;
                    font-weight: 700;
                    border-radius: 4px 4px 0 0;
                    color:white;
                }

                .jianpan_content{
                    padding-left:4%;
                    padding-right:4%;
                    background:#f5f5f5;
                    padding-bottom:8px;
                    display :flex;
                    flex-wrap :wrap;
                    justify-content :space-between;

                    .jianpan_btn{
                        width:22%;
                        height:30px;
                        line-height :30px;
                        padding:0;
                        margin-top:8px;
                        margin-left:0;
                    }
                }
                .pjw_50{
                    width:48%!important;
                }
                .pjw_80{
                    width:80%!important;
                }
                .pjw_100{
                    width:100%!important;
                }
                .pjw_70{
                    width:70%!important;
                }
                .pjw_60{
                    width:60%!important;
                }
                .pjw_30{
                    width:30%!important;
                }
                .pjw_35{
                    width:35%!important;
                }

            }
            .panju_btn_bottom{
                float:right;
                margin-top:20px;
                margin-right:20px;
            }
        }
    }
}

.linshi{
    position :fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.7);
    z-index:2001;
    
    .linshi_div{
        margin:10% auto 0;
        width:600px;
        background:white;
        border-radius :5px;
        overflow:hidden;

        .add_title{
            display :flex;
            justify-content :space-between;
            align-items :center;
            font-size:16px;
            padding:16px 24px;
            border-bottom:1px solid #e8e8e8;

            .close_add{
                cursor :pointer;
            }
        }
        .lianxu_btn{
            border-top:1px solid #e8e8e8;
            padding:15px 20px 15px 0;
            display:flex;
            justify-content :flex-end;
        }
    }

    .fromClas{
        padding-left:50px;
        margin:20px auto 0;

        .lianxudiv{
            display:flex;
            align-items :center;
            margin-bottom:20px;
            
            .shijiannumber{
                width:70px;
                margin-left:30px;
            }
            .shijianname{
                margin:0 30px;
                width:200px;
            }
        }
    }
}
.infor-title:hover{
    cursor:move;
}
.infor-title{
    height: 45px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(0,0,0,.85);
    padding: 0 15px;
    border-bottom:1px solid #e8dede;
    span{
        font-size: 16px;
    }
    .indor-icon{
        display: flex;
        align-items: center;
        i{
            margin-left: 10px;
            font-size: 18px;
            cursor: pointer;
        }
    }

}
.infor_all_div{
    position: fixed;
    width: 100%;
    z-index: 1999;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}
</style>