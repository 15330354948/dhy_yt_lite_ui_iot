const documentTopMenu = {
    state: {
        viewsTopTranstion: "",
        getMenuYujing:{},
    },
    actions: {},
    mutations: {
      TOP_MENUS_TYPE: (state,data) => {
        state.viewsTopTranstion = data;
        // localStorage.setItem('viewsTopTranstion', JSON.stringify(data));
      },
      getMenu:(state,data) => {
        state.getMenuYujing = data;
      }
    }
  }
export default documentTopMenu