<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <avue-crud
        :data="tableData"
        :option="tableOption"
        :permission="permissionList"
        v-model="obj"
        :page.sync="page"
        @on-load="getList"
        @search-change="searchChange"
        @search-reset="searchReset"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-save="add"
        @row-update="edit"
        @row-del="handleDel"
      ></avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchList, addObj, putObj, delObj } from "@/api/areas/area";
import vPinyin from "@/util/getPinYin.js"; //汉字转拼音的js文件

export default {
  name: "areaManagement",
  data() {
    //自定义的验证规则（验证经度、纬度）//有小数点，就验证小数点后不能超过十位
    var validateLon = function (rule, value, callback) {
      var longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,10})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,10}|180)$/;
      if (value && !longrg.test(value)) {
        callback(new Error("格式不正确，请重新填写"));
      } else {
        callback();
      }
    };
    var validateLat = function (rule, value, callback) {
      var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,10}|90\.0{0,10}|[0-8]?\d{1}|90)$/;
      if (value && !latreg.test(value)) {
        callback(new Error("格式不正确，请重新填写"));
      } else {
        callback();
      }
    };

    return {
      obj: {
        name: null,
        pinyin: null,
        pinyinShort: null
      }, //新增、修改时提交的数据
      // permissionList: {
      //   //初始权限
      //   addBtn: false,
      //   delBtn: false,
      //   editBtn: false
      // },
      page: {
        size: 10,
        current: 1,
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      searchParams: {},
      tableData: [
        //表格数据
      ],
      tableOption: {
        //表格字段配置
        viewBtn: true, //开启查看按钮
        searchMenuSpan: 24,
        searchSize: "mini", //搜索按钮的大小
        labelWidth: 130,
        refreshBtn: true,
        columnBtn: true,
        searchBtn: true,
        dialogClickModal: false,
        column: [
          {
            label: "国家统计局编号",
            searchLabelWidth: 120,
            span: 24,
            search: true,
            searchClearable: true,
            prop: "code",
            rules: [
              {
                required: true,
                message: "请输入编号",
                trigger: "blur"
              }
            ]
          }, {
            label: "上级编码",
            prop: "parentCode",
            // searchLabelWidth: 120,
            display: false,
            search: true,
          },
          {
            label: "编码",
            prop: "id",
            // searchLabelWidth: 120,
            searchClearable: true,
            hide:true,
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入编码",
                trigger: "blur"
              }
            ]
          },
          {
            label: "地名",
            prop: "name",
            // searchLabelWidth: 120,
            search: true,
            searchClearable: true,
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入地名",
                trigger: "blur"
              }
            ]
          },
          {
            label: "地名全拼",
            prop: "pinyin",
            span: 24
            // addDisabled: true,
            // editDisabled: true
          },
          {
            label: "地名拼音缩写",
            prop: "pinyinShort",
            span: 24
            // addDisabled: true,
            // editDisabled: true
          },
          {
            label: "地区等级", //省、市、区
            type: "select",
            span: 24,
            viewDisplay: false, //查看时不可见
            prop: "level",
            dataType: 'number',
            dicUrl: "/admin/dict/type/area_level",
            search: true,
            rules: [
              {
                required: true,
                message: "请选择地区等级",
                trigger: "change"
              }
            ]
          },
          {
            label: "邮政编码",
            prop: "zipCode",
            span: 24
          },
          {
            label: "经度",
            // type: "number",
            prop: "longitude",
            span: 24,
            rules: [{ validator: validateLon, trigger: ["blur", "change"] }]
          },
          {
            label: "纬度",
            // type: "number",
            prop: "latitude",
            span: 24,
            rules: [{ validator: validateLat, trigger: ["blur", "change"] }]
          }
        ]
      }
    };
  },
  created() {
  },
  mounted() {
    this.getList(this.page); //初始展示表格
  },
  computed: {
    ...mapGetters(["permissions"]), //获取权限
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.area_add, false),
        delBtn: this.vaildData(this.permissions.area_del, false),
        editBtn: this.vaildData(this.permissions.area_edit, false),
      };
    },
  },
  methods: {
    getList() {
      this.tableLoading = true
      fetchList(Object.assign({
        current: this.page.currentPage,
        size: this.page.pageSize
      }, this.searchParams)).then(res => {
        this.tableData = res.data.data.records;
        this.page.total = res.data.data.total;
        this.tableLoading = false
      });
    },
    searchChange(form, done) {
      this.page.currentPage = 1;
      this.searchParams = form;
      this.getList();
      //搜索
      done();
    },
    /**
     * 清空按钮
     */
    searchReset() {
      this.page.currentPage = 1;
      this.page.pageSize = 10;
      this.searchParams = {};
      this.getList();
    },
    sizeChange(pageSize) {//分页条数变化时
      this.page.pageSize = pageSize
    },
    currentChange(current) { //当前页码变化时
      this.page.currentPage = current
    },
    refreshChange() {
      this.getList(this.page)
    },
    add(done, loading) {
      //新增
      addObj(this.obj).then(res => {
        loading();
        this.page.current = 1;
        this.page.currentPage = 1;
        this.getList(this.page);
      });
    },
    edit(row, done, loading) {
      //修改
      putObj(this.obj).then(res => {
        loading();
        this.page.current = 1;
        this.page.currentPage = 1;
        this.getList(this.page);
      });
    },
    handleDel(row, done, loading) {
      //删除
      this.$confirm("是否确认删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delObj(row.id).then(res => {
            this.page.current = 1;
            this.page.currentPage = 1;
            this.getList(this.page);
          });

          //  this.$message.success('删除成功')
        })
        .catch(function () {
        });
    }
  },
  watch: {
    "obj.name": {
      //监听obj里面的name字段
      handler(x) {
        if (x) {
          this.obj.pinyin = vPinyin.toPinYinXX(x); //赋值，汉字全拼
          //汉字拼音缩写
          let py = vPinyin.chineseToPinYin(x);
          let SX = "";
          for (var i = 0; i < py.length; i++) {
            var c = py.charAt(i);
            if (/^[A-Z]+$/.test(c)) {
              SX += c;
            }
          }
          this.obj.pinyinShort = SX.toLowerCase(); //赋值
        } else if (!x) {
          this.obj.pinyin = "";
          this.obj.pinyinShort = "";
        }
      }
    }
  }
};
</script>
