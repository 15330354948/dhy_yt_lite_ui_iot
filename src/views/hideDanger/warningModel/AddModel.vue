<template>
    <div>
        <el-form ref="add-form" :model="addForm" label-width="150px">
            <el-form-item label="模型名称">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="模型简介">
                <el-input v-model="addForm.content" type="textarea"></el-input>
            </el-form-item>
            <el-form-item  label="预警频率">
                <el-input v-model="addForm.pl" class="small"></el-input>
                <span>时/次（注释：如在设置的频率内如无更高等级的预警则不发送预警消息）</span>
            </el-form-item>
            <el-form-item>
                <el-button size="medium">选择预警模型</el-button>
                <el-button size="medium">绑定监测点</el-button>
            </el-form-item>
            <el-form-item label="当前权重比之和 :">
                <el-button disabled size="medium">{{sum}}</el-button>
                <span>（注释：权重比之和不能超过100）</span>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            addForm:{}
        }
    },
    computed:{
        sum(){
            return 100;
        }
    }
}
</script>
<style lang="scss" scoped>
.small{width: 100px;margin-right: 10px;}
</style>