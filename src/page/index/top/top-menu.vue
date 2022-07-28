<template>
  <div class="top_menu">
    <el-menu :default-active="activeIndex" mode="horizontal" text-color="#333">
      <template v-for="(item, index) in items">
        <el-menu-item
          :index="'top_menu_' + item.id"
          @click.native="openMenu(item)"
          :key="index"
        >
          <template slot="title">
            <span>{{ generateTitle(item) }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
    <!-- <div class="top_menu_title">
      <div>{{userInfo.projectName}}</div>
     <div v-if="userInfo">智能监测平台</div>
    </div> -->
    <!-- <el-menu :default-active="activeIndex" mode="horizontal" text-color="#333">
      <template v-for="(item, index) in itemsRight">
        <el-menu-item
          :index="'top_menu_' + item.id"
          @click.native="openMenu(item)"
          :key="index"
        >
          <template slot="title">
            <span>{{ generateTitle(item) }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "top-menu",
  data() {
    return {
      activeIndex: "",
      items: [],
      itemsRight: [],
    };
  },
  inject: ["index"],
  computed: {
    ...mapGetters(["tagCurrent", "menu", "menuId", "userInfo"]),
  },
  mounted() {
    this.getMenu();
    if (this.menuId) {
      this.activeIndex = "top_menu_" + this.menuId.id;
    }
  },
  methods: {
    openMenu(item) {
      this.activeIndex = 'top_menu_' + item.id
      this.index.openMenu(item);
      if(item.sort == 1){
        this.$bus.$emit('defaultViewLode', true)
      }
    },
    getMenu() {
      this.$store.dispatch("GetTopMenu").then((res) => {
        this.items = [];
        // this.itemsRight = [];
        res.forEach((e, i) => {
          if (e) {
            this.items.push(e);
          }
          // if (i > res.length / 2 - 0.5) {
          //   this.itemsRight.push(e);
          // } else {
          //   this.items.push(e);
          // }
        });
      });
    },
    generateTitle(item) {
      // console.log(this.$router.$avueRouter.generateTitle(
      //   item.label,
      //   (item.meta || {}).i18n
      // ))
      return this.$router.$avueRouter.generateTitle(
        item.label,
        (item.meta || {}).i18n
      );
    },
  },
  watch:{
    menu:{
      handler(val){
        this.getMenu()
      },
      deep:true
    }
  }
};
</script>
<style lang="scss" scoped>
.top_menu {
  display: flex;
  justify-content: right;
  // justify-content: center;
  &_title {
    width: auto;
    text-align: center;
    position: relative;
    line-height: 36px;
    color: #fff;
    font-size: 25px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-shadow: 0px 4px 6px #000000;
    margin: 0 30px;
  }
  .el-menu--horizontal {
    width: 100%;
    // width: 570px;
    display: flex;
    justify-content: space-evenly;
  }
  .top_menu_title:after {
    background: rgba(0, 0, 0, 0);
    background: rgba(0, 0, 0, 0);
    position: absolute;
    left: 0;
    text-align: center;
  }
  .el-menu-item {
    border-bottom-color: transparent;
    text-align: center;
    color: #fff !important;
    height: 100%;
    padding: 25px 10px 20px 10px;
    line-height: inherit;
    span {
      font-size: 16px;
      font-family: "Alibaba-PuHuiTi-Regular";
    }
  }
  .is-active{
    border-bottom: 2px solid #409eff !important;
    color: #409eff !important;
  }
  .top_menu_title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-evenly;
    height: 70px;
    div {
      font-size: 24px;
      height: 36px;
      width: 100%;
      line-height: 40px;
    }
    > div:last-child {
      height: 36px;
      line-height: 32px;
      font-size: 22px;
    }
  }
}
</style>
