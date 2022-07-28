(function (RongCall) {
  /* 弹框 */

  var utils = RongCall.utils;

  function removeSelf($el) {
    var parent = $el.parentElement;
    parent.removeChild($el);
  }

  /* 选择人员弹框 */
  var selectUser = function (options) {
    options = options || {};

    var userList = options.userList;
    userList = userList.map(function (user) {
      user.isSelected = false;
      return user;
    });

    return utils.mountDialog({
      name: 'rong-select-dialog',
      template: '#rong-template-dialog-users',
      data: function () {
        return {
          isShow: true,
          userList: userList,
          selectedUserList: []
        };
      },
      computed: {
        hasSelectedUser: function () {
          // var selectedUser = this.userList.filter(function (user) {
          //   return user.isSelected;
          // });
          return this.selectedUserList.length;
        }
      },
      methods: {
        selectUser: function (user) {
          user.isSelected = true;
          this.selectedUserList.push(user);

          this.userList.forEach((item,index) => {
            if(item.id == user.id){
              this.userList.splice(index, 1);
            }
          });
        },
        search(){
          console.log("搜索人员");
        },
        unSelectUser(user) {
          user.isSelected = false;
          this.userList.push(user);
          this.selectedUserList.forEach((item,index) => {
            if(item.id == user.id){
              this.selectedUserList.splice(index, 1);
            }
          });
        },
        cancel: function () {
          this.isShow = false;
          options.canceled && options.canceled();
        },
        confirm: function () {
          // var userList = this.userList;
          // userList = userList.filter(function (user) {
          //   return user.isSelected;
          // });
          options.confirmed && options.confirmed(this.selectedUserList);
          this.selectedUserList.map(v=>{
            // console.log(v.userName,12121);
          })
          
          this.isShow = false;
        }
      },
      watch: {
        isShow: function (isShow) {
          !isShow && removeSelf(this.$el);
        }
      }
    });
  };

  /* 提示弹框 */
  var toast = function (options) {
    
    options = options || {};

    return utils.mountDialog({
      name: 'rong-toast-dialog',
      template: '#rong-template-dialog-toast',
      data: function () {
        return {
          isShow: true,
          content: options.content
        };
      },
      watch: {
        isShow: function (isShow) {
          !isShow && removeSelf(this.$el);
        }
      },
      mounted: function () {
        var context = this;
        setTimeout(function () {
          if (context.isShow) {
            context.isShow = false;
            options && options.onDestoryed();
          }
        }, options.destroyTimeout || 5000);
      }
    });
  };

  RongCall.dialog = {
    selectUser: selectUser,
    toast: toast
  };
})(window.RongCall, {
  win: window
});