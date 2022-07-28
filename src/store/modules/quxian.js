const quxian = {
    state: {
      cavasRefresh: "",
      modelTimeChange:"",
    },
    actions: {},
    mutations: {
      echartCanvasRefresh: (state,data) => {
        state.cavasRefresh = data;
      },
      ThreeModelTime:(state,data) => {
        state.modelTimeChange = data;
      }
    }
  }
export default quxian
  