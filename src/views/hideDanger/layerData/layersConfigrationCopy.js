/*
 * @Author: 帅泊成
 * @Date: 2021-12-16 11:40:38
 * @LastEditTime: 2021-12-16 11:40:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: src\views\hideDanger\mapLayer\layersConfigration.js
 */
export const configuration = [{
  moduleName: "dangerScope",
  moduleTitle: '监测范围', //模块展示名字
  templateUrl: 'hiddenDanger', //模块文件路径
  moduleSave: false, //模块保存状态
  moduleShow: true, //模块显影状态
},{
  moduleName: "evaRoute",
  moduleTitle: '撤离路线图', //模块展示名字
  templateUrl: 'evacuationRoute', //模块文件路径
  moduleSave: false, //模块保存状态
  moduleShow: true, //模块显影状态
},{
  moduleName: "midas",
  moduleTitle: '倾斜摄影', //模块展示名字
  templateUrl: 'tiltPhotography', //模块文件路径
  moduleSave: false, //模块保存状态
  moduleShow: true, //模块显影状态
},{
  moduleName: "orthophoto",
  moduleTitle: '正射影像图', //模块展示名字
  templateUrl: 'orthoPhoto', //模块文件路径
  moduleSave: false, //模块保存状态
  moduleShow: true, //模块显影状态
},{
  moduleName: "panorama",
  moduleTitle: '全景图', //模块展示名字
  templateUrl: 'panorama', //模块文件路径
  moduleSave: false, //模块保存状态
  moduleShow: true, //模块显影状态
},{
  moduleName: "imageMap",
  moduleTitle: '影像图', //模块展示名字
  templateUrl: 'imgMap', //模块文件路径
  moduleSave: false, //模块保存状态
  moduleShow: true, //模块显影状态
},{
  moduleName: "pointCloud",
  moduleTitle: '点云', //模块展示名字
  templateUrl: 'pointCloud', //模块文件路径
  moduleSave: false, //模块保存状态
  moduleShow: true, //模块显影状态
},{
  moduleName: "altitude",
  moduleTitle: '高程', //模块展示名字
  templateUrl: 'altitudeView', //模块文件路径
  moduleSave: false, //模块保存状态
  moduleShow: true, //模块显影状态
}]
