<!--
  功能：数据分析详情左侧菜单树
  作者：张峻霖
  创建时间：2021年02月25日 09:43:53
-->
<template>
  <div
    class="menu_tree"
    :class="{
      isanalysisDetails: isanalysisDetails || !isHomePage,
    }"
  >
    <div
      class="menu_tree_module"
      v-for="(i, index) in configuration"
      :key="index"
      @click="menuClick(i, index)"
    >
      <el-tooltip
        class="item"
        effect="dark"
        :content="i.chartTitle"
        placement="left"
      >
        <div class="img_div">
          <img
            v-if="isActive != index"
            class="box-img"
            :src="require('@/assets/img/icon/' + i.icon + '.png')"
            alt=""
          />
          <img
            v-if="isActive == index"
            class="box-img"
            :src="require('@/assets/img/icon/' + i.icon + '_active.png')"
            alt=""
          />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { configuration } from "./configuration";
export default {
  computed: mapGetters(["isDataAnalysis", "analysisDetails"]),
  data() {
    return {
      isActive: 0, //选中的菜单
      configuration: [],
      isanalysisDetails: false,
      isHomePage: false,
    };
  },
  components: {},
  mounted() {
    this.configuration = configuration;
  },
  methods: {
    /**
     * @description: 菜单点击事件
     * @param {*} index 具体选中的下标
     */
    menuClick(val, index) {
      this.$store.commit("IS_DATA_ANALYSIS", {
        status: true,
        data: val,
      });
    },
    backHome() {
      this.$store.commit("IS_DATA_ANALYSIS", {
        status: false,
      });
    },
  },
  watch: {
    isDataAnalysis: {
      handler(val) {
        this.isHomePage = val.status;
        if (!val.data) return;
        for (var i = 0; i < configuration.length; i++) {
          if (configuration[i].moduleName == val.data.moduleName) {
            this.isActive = i;
            break;
          }
        }
      },
      deep: true,
    },
    analysisDetails: {
      handler(val) {
        if (val.status) {
          this.isanalysisDetails = true;
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
.menu_tree {
  position: absolute;
  top: 85px;
  left: 15px;
  transition: left 0.6s;
  .el-collapse-item__header {
    .el-collapse-item__arrow {
      font-size: 26px;
    }
  }
  .el-collapse-item__wrap {
    .el-collapse-item__content {
      div {
        width: 80%;
        margin: 1.11% 10% 0 10%;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
      .isActive {
        background-image: linear-gradient(
          to right,
          rgba(0, 54, 99, 0),
          rgba(2, 101, 174, 0.5),
          rgba(0, 54, 99, 0)
        );
      }
    }
  }
  .menu_tree_module {
    background: rgba(0, 0, 0, 0.5);
    width: 40px;
    height: 40px;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    .img_div {
      width: 100%;
      cursor: pointer;
      height: 100%;
      img {
        width: 26px;
        margin: 7px;
      }
    }
  }
}
.menu_tree.notUnfold {
  height: 48px;
}
.menu_tree.isanalysisDetails {
  left: -100px;
}
.menu_tree.isDataAnalysis {
  left: -100px;
}
</style>
