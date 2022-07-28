<template>
    <basic-container>
        <div class="msgbtn">
            <div class="msgtitle" :class="show==1?'action1':''" @click="send(1)">自动发送记录</div>
            <div class="msgtitle" :class="show==2?'action1':''" @click="send(2)">手动发送记录</div>
        </div>
        <div class="text-msg" v-show="show==1">
            <!-- @on-load="getTable" -->
        <avue-crud :option="sendOption"
            :page="page"
            ref="cruds"
            v-model="sendForm"
            
            @size-change="sizeChange"
            @current-change="currentChange"
            :table-loading="listLoading"
            @search-change="handleFilter"
            @refresh-change="handleRefreshChange"
            @search-reset="searchReset"
            :data="tableData"></avue-crud>
        </div>
        <div class="text-msg" v-show="show==2">
            <MsgRecords :show='show' v-if="show==2"></MsgRecords>
        </div>
    </basic-container>
</template>
<script>
import { mapGetters } from 'vuex'
import {sendOption} from './sendRecordsOption'
import {sendRecord} from '@/api/warningRecord'
import MsgRecords from "../../warningTextMsg1/sendRecords/index.vue"
export default {
    components:{MsgRecords},
    data(){
        return{
            show:1,
            sendOption:sendOption,
            sendForm:{},
            listLoading:false,
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 10, // 每页显示多少条,
                isAsc: false//是否倒序
            },
            tableData:[],
            searchForm:{},

        }
    },
    computed: {
    ...mapGetters(['permissions',"projectId"]),
  },
    watch: {
        projectId:{
            immediate: true,
            handler(val, oVal) {
                window.sessionStorage.setItem('projectId', val)
                this.getTable(this.page);
            },
            deep: true,
        }
    },
    created(){
        // this.getTable(this.page);

    },
    methods:{
        send(num){
            this.show=num;
            if(num==1){
                this.getTable(this.page);
            }
            
        },
        getTable(page,query){
            this.listLoading = true;
            sendRecord(
                Object.assign({
                  current: page.currentPage,
                  size: page.pageSize,
                  projectId:this.projectId
                },query)
            ).then( res => {
                this.tableData = res.data.data.records;
                this.page.total = res.data.data.total
                this.listLoading = false;
                
            })
        },
        sizeChange(pageSize) {
            this.page.pageSize = pageSize
            this.getTable(this.page);
        },
        currentChange(current) {
            this.page.currentPage = current
            this.getTable(this.page);
        },
        handleFilter(form, done) {
            if(form.sendTime&&form.sendTime.length==2){
                form.startTimeParam =form.sendTime[0]
                form.endTimeParam =form.sendTime[1]
                delete form.sendTime
            }
            this.searchForm = form;
            this.page.currentPage = 1;
            this.getTable(this.page, form);
            done()
        },
        handleRefreshChange() {
            this.getTable(this.page)
        },
        searchReset() {
            this.searchForm = {};
            this.page.currentPage = 1;
            this.page.pageSize = 20;
            this.getTable(this.page);
        },
        
    }
}
</script>
<style lang="scss" scoped>
.action1{
    background: #54a9fd;
    border: 1px solid #409EFF;
    color: #fff;
    border-radius: 5px;
}
.msgbtn{
    display: flex;
    padding: 10px;
    // margin-bottom: 20px;
    color: gray;
    .msgtitle{
        margin-left: 15px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
}

</style>