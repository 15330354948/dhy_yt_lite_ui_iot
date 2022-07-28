
export const configuration = [{
  useStatus: false,
  modName: "spike",
  navTitle: '突刺设置',//模块展示名字
  templateUrl: 'spikeMod/index',//配置模块文件路径
  toolPromptList: { //提示信息
    "other": "均采用累计变化值（累计变化值=监测值-初始值）作为判断标准",
    "l3_yl": "雨量计采用当日累计雨量作为判断标准"
  }
},{
  useStatus: false,
  modName: "range",
  navTitle: '数据范围设置',//模块展示名字
  templateUrl: 'rangeMod/index',//配置模块文件路径
  toolPromptList: { //提示信息
    "other": "均采用累计变化值（累计变化值=监测值-初始值）作为判断标准",
    "l3_yl": "雨量计采用当日累计雨量作为判断标准"
  }
},{
  useStatus: false,
  modName: "unchange",
  navTitle: '数据长期不变设置',//模块展示名字
  templateUrl: 'unchangeMod/index',//配置模块文件路径
  toolPromptList: { //提示信息
    "other": "均采用累计变化值（累计变化值=监测值-初始值）作为判断标准",
    "l3_yl": "雨量计采用当日累计雨量作为判断标准"
  }
},{
  useStatus: false,
  modName: "repeat",
  navTitle: '数据重复设置',//模块展示名字
  templateUrl: 'repeatMod/index',//配置模块文件路径
  toolPromptList: { //提示信息
    "other": "均采用累计变化值（累计变化值=监测值-初始值）作为判断标准",
    "l3_yl": "雨量计采用当日累计雨量作为判断标准"
  }
}]
