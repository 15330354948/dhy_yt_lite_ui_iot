import echarts from 'echarts';
import 'echarts-gl';
import { deepClone} from "@/util/util";

const generateData = function (totalNum, bigvalue, smallvalue, color) {
  let dataArr = [];
  for (var i = 0; i < totalNum; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: bigvalue,
        itemStyle: {
          normal: {
            color: color,
            borderWidth: 0,
          }
        }
      });
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: smallvalue,
        itemStyle: {
          normal: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
          }
        }
      });
    }
  }
  return dataArr;
}

export function echartsType(valNew, text, unit, danwei, code) {
  if (text.indexOf('地下水') !== -1) {
    if (valNew.data.length > 0) {
      var data = valNew.data.filter(data => {
        return data.alias !== "水温"
      })
    }
  } else {
    var data = valNew.data
  }


  // if(jidianType == undefined || jidianType == 'undefined'){
  //     jidianType = false;
  // }
  // var data = valNew.data;
  var xAxis = []; //x轴
  var yAxis = []; //y轴
  var danwei1 = []; //单位
  var nameTextStyle = [];
  var number = 0;
  var position = '';
  var series = [];
  var offset = 0;
  var left = 80;
  var right = 80;
  var legend = [];
  var color = ["#FF8635", "#70D340", "#1FC1AC", "#8C37FF"];
  var typeOn = [];
  var typeGG = 0;
  var bottom = 80;
  var top = 60;
  let xPosition = "bottom"
  var xAll = [];
  if (data.length != 0) {

    for (var i = 0; i < data.length; i++) {
      legend.push({
        bottom: 20,
        top: 20,
        name: data[i].alias,
        textStyle: {
          color: color[i],
        }
      })
      danwei1.push(data[i].unit)
      if (xAll.length < data[i].data.length) {
        xAll = data[i].data;
      }

      if (typeOn.indexOf(data[i].unit) > -1) {

      } else {

        offset = Math.floor(number / 2) * 50;
        if ((number + 1) % 2 === 0) {
          nameTextStyle = [20, 0, 0, 0]
          position = 'right';
          right = Math.floor(number / 2) * 50 + right;
        } else if ((number + 1) % 2 === 1) {
          nameTextStyle = [0, 0, 20, 0]
          position = 'left';
          left = Math.floor(number / 2) * 50 + left;
        }

        typeOn.push(data[i].unit)

        var YdataName = "";
        if (data[i].unit == "") {
          YdataName = data[i].name;
        } else {
          YdataName = data[i].unit;
        }

        yAxis.push({
          name: YdataName,
          nameLocation: 'center',
          nameTextStyle: {
            padding: nameTextStyle
          },
          position: position,
          type: 'value',
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function (value, index) {
              if (Math.abs(value) > 1) {
                return value.toFixed(1);
              } else {
                return value.toFixed(2);
              }
            }
          },
          offset: offset,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#D5D8DC",
              type: 'solid',
            },
          },
          // max: function (value) {
          //   if (value.max < 0) {
          //     return 0;
          //   } else if (value.max == 0) {
          //     return 0;
          //   } else {
          //     return value.max * 1.1;
          //   }
          // },
          // min: function (value) {
          //   if (value.min < 0) {
          //     return value.min * 1.1;
          //   } else if (value.min == 0) {
          //     return 0;
          //   } else {
          //     return 0;
          //   }
          // }
        })

        number++;
      }

      for (var kk = 0; kk < typeOn.length; kk++) {
        if (typeOn[kk] == data[i].unit) {
          typeGG = kk;
        }
      }

      var quxianListData = [];

      for (var j = 0; j < data[i].data.length; j++) {
        quxianListData.push(data[i].data[j].value)
      }

      series.push({
        name: data[i].alias,
        bottom: 20,
        top: 20,
        type: "line",
        smooth: true,
        data: quxianListData,
        yAxisIndex: typeGG,
        itemStyle: {
          color: color[i],
        },
        lineStyle: {
          width: 1
        },
        symbol: 'circle',
        symbolSize: 3,
      })

    }

    for (var i = 0; i < xAll.length; i++) {
      xAxis.push(xAll[i].time) //x轴
    }

  }

  //计算数据
  function avg(array) { //封装求平均值函数
    var len = array.length;
    var sum = 0;
    for (var i = 0; i < len; i++) {
      sum += array[i];
    }
    return sum / len;
  }
  //y轴数据合并
  let dataArr = []
  series.forEach(one => {
    dataArr.push(one.data)
  });
  let dataPing = dataArr.flat(Infinity) //压平成一个数组
  //计算平均值、最大值、最小值
  let avgPing = avg(dataPing)
  let maxPing = Math.max.apply(null, dataPing)
  let minPing = Math.min.apply(null, dataPing)
  // console.log('通用',avgPing,maxPing,minPing)
  if (maxPing > 0 && maxPing < 4 && minPing > 0 && minPing < 4) {
    //监测数据在0~4内，纵坐标从0开始，刻度为0、1、2、3、4、5；
    yAxis[0].max = 5
    yAxis[0].min = 0
  } else if (maxPing <= 0 && maxPing > -4 && minPing <= 0 && minPing > -4) {
    //监测数据在0~-4内，纵坐标从1开始，刻度为1、0、-1、-2、-3、-4、-5；
    yAxis[0].max = 1
    yAxis[0].min = -5
  } else {
    let maxR = Math.abs(maxPing - avgPing);
    let minR = Math.abs(minPing - avgPing);
    // let avgVal=(avgPing>0?Math.ceil(avgPing):Math.floor(avgPing))
    if (danwei == 'l3_hs' || danwei == 'l3_qw' || danwei == 'l3_db' || danwei == 'l3_dx') {
      //含水率、土壤温度、地表水位、地下水位、流速、流量计
      //流速、流量计(没有数据字典)
      if (maxR < 5 && minR < 5) {
        yAxis[0].max = parseInt(avgPing + 5)
        yAxis[0].min = parseInt(avgPing - 5)
      } else {
        if (maxPing > 0) {
          yAxis[0].max = Math.ceil(maxPing * 1.2 + 5)
        }
        if (minPing < 0) {
          yAxis[0].min = Math.floor(minPing * 1.2 - 5)
        }
      }
    } else {
      if (maxR < 2 && minR < 2) {
        yAxis[0].max = parseInt(avgPing + 2)
        yAxis[0].min = parseInt(avgPing - 2)
      } else {
        if (maxPing > 0) {
          yAxis[0].max = Math.ceil(maxPing * 1.2 + 2)
        }
        if (minPing < 0) {
          yAxis[0].min = Math.floor(minPing * 1.2 - 2)
        }
      }
    }
    // if (maxPing < 0 && minPing < 0) {
    //   xPosition = 'top'
    //   top = 100
    //   bottom = 60
    // }
  }


  let optionTpl = {
    title: {
      top: 10,
      show: true,
      text: text,
      x: 'center',
    },
    legend: {
      top: 35,
      bottom: 20,
      left: 'center',
      data: legend
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff'
      },
      formatter: params => {
        var datAll = params[0].name;
        var name = '';
        for (var i = 0; i < params.length; i++) {
          if (danwei == "l1_lf") {
            name = "裂缝偏移："
          } else {
            params[i].seriesName + '轴偏移 : '
          }
          datAll = datAll + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[i].color + "'></span>" + name + Number(params[i].value) + danwei1[i]; //unit
        }
        return datAll
      }
    },
    grid: {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
      show: false,
      borderWidth: '0'
    },
    dataZoom: [{
      type: 'inside', //图表下方的伸缩条
    }, {
      type: 'slider', //图表下方的伸缩条
      show: true, //是否显示
      realtime: true, //拖动时，是否实时更新系列的视图
      start: 0, //伸缩条开始位置（1-100），可以随时更改
      end: 100, //伸缩条结束位置（1-100），可以随时更改
      height: 15
    }],
    xAxis: [{
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false
      },
      type: 'category',
      data: xAxis,
      splitLine: {
        show: false,
        lineStyle: {
          color: '#D5D8DC',
          type: 'dashed'
        }
      },
      axisLabel: { //换行
        show: true,
        interval: parseInt(xAxis.length / 5),
        showMinLabel: true,
        showMaxLabel: true,
        formatter: function (value) {
          var t_date = new Date(value);
          // console.log(t_date)
          // console.log(t_date.getMinutes())
          return [t_date.getFullYear(), t_date.getMonth() + 1, t_date.getDate()].join('-') + "\n" + [t_date.getHours() < 10 ? '0' + t_date.getHours() : t_date.getHours(),
            t_date.getMinutes() < 10 ? '0' + t_date.getMinutes() : t_date.getMinutes(),
            t_date.getSeconds() < 10 ? '0' + t_date.getSeconds() : t_date.getSeconds()
          ].join(':');
        }
      },
    }, ],
    yAxis: yAxis,
    series: series
  }
  return optionTpl;
};

export function echartsTypeLF(valNew, text, unit, danwei, panjuData, code) {

  var data = valNew.data;
  var xAxis = []; //x轴
  var yAxis = []; //y轴
  var nameTextStyle = [];
  var number = 0;
  var position = '';
  var series = [];
  var offset = 0;
  var right = 80;
  var left = 80;
  var legend = [];
  var color = ["#FF8635", "#70D340", "#1FC1AC", "#8C37FF"];
  var typeOn = [];
  var typeGG = 0;
  var bottom = 80;
  var top = 60;
  let xPosition = "bottom"

  var xAll = [];
  if (data.length != 0) {
    var panjuDataList = [];
    var maxYujing = 0;
    var markLine = {};
    // console.log(panjuData)
    if (panjuData.length !== 0) {
      panjuDataList = [panjuData[0].warnValueSumBlue, panjuData[0].warnValueSumYellow, panjuData[0].warnValueSumOrange, panjuData[0].warnValueSumRed]

      maxYujing = Math.max(...panjuDataList) //最大的预警值
      markLine = {
        symbol: 'none',
        label: {
          show: true,
          position: 'end',
          fontSize: 12,
          fontWeight: 'bold'
        },
        lineStyle: {
          type: [5, 10],
          dashOffset: 5
        },
        data: [{
            yAxis: panjuDataList[0],
            lineStyle: {
              color: "blue"
            },
            label: {
              color: "blue"
            }
          },
          {
            yAxis: panjuDataList[1],
            lineStyle: {
              color: "#f3e001"
            },
            label: {
              color: "#f3e001"
            }
          },
          {
            yAxis: panjuDataList[2],
            lineStyle: {
              color: "orange"
            },
            label: {
              color: "orange"
            }
          },
          {
            yAxis: panjuDataList[3],
            lineStyle: {
              color: "red"
            },
            label: {
              color: "red"
            }
          }, {
            yAxis: -panjuDataList[0],
            lineStyle: {
              color: "blue"
            },
            label: {
              color: "blue"
            }
          },
          {
            yAxis: -panjuDataList[1],
            lineStyle: {
              color: "#f3e001"
            },
            label: {
              color: "#f3e001"
            }
          },
          {
            yAxis: -panjuDataList[2],
            lineStyle: {
              color: "orange"
            },
            label: {
              color: "orange"
            }
          },
          {
            yAxis: -panjuDataList[3],
            lineStyle: {
              color: "red"
            },
            label: {
              color: "red"
            }
          }
        ]
      }
    }


    for (var i = 0; i < data.length; i++) {
      legend.push({
        bottom: 20,
        top: 20,
        name: data[i].alias,
        textStyle: {
          color: color[i],
        }
      })
      if (xAll.length < data[i].data.length) {
        xAll = data[i].data;
      }

      if (typeOn.indexOf(data[i].unit) > -1) {

      } else {

        offset = Math.floor(number / 2) * 50;
        if ((number + 1) % 2 === 0) {
          nameTextStyle = [30, 0, 0, 0]
          position = 'right';
          right = Math.floor(number / 2) * 50 + right;
        } else if ((number + 1) % 2 === 1) {
          nameTextStyle = [0, 0, 30, 0]
          position = 'left';
          left = Math.floor(number / 2) * 50 + left;
        }

        typeOn.push(data[i].unit)

        var YdataName = "";
        if (data[i].unit == "") {
          YdataName = data[i].name;
        } else {
          YdataName = data[i].unit;
        }

        yAxis.push({
          name: YdataName,
          nameLocation: 'center',
          nameTextStyle: {
            padding: nameTextStyle
          },
          position: position,
          type: 'value',
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function (value, index) {
              // console.log(value)
              if (Math.abs(value) > 1) {
                return value.toFixed(1);
              } else {
                return value.toFixed(2);
              }
            }
          },
          offset: offset,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#D5D8DC",
              type: 'solid',
            },
          },
          // max: function (value) {
          //   if (Math.abs(maxYujing) > Math.abs(value.max)) {
          //     return Math.abs(maxYujing) * 1.1;
          //   } else {
          //     return Math.abs(value.max) * 1.1;
          //   }
          // },
          // min: function (value) {
          //   if (Math.abs(maxYujing) > Math.abs(value.min)) {
          //     return -Math.abs(maxYujing) * 1.1;
          //   } else {
          //     return -Math.abs(value.min) * 1.1;
          //   }
          // }
        })

        number++;
      }

      for (var kk = 0; kk < typeOn.length; kk++) {
        if (typeOn[kk] == data[i].unit) {
          typeGG = kk;
        }
      }

      var quxianListData = [];

      for (var j = 0; j < data[i].data.length; j++) {
        quxianListData.push(data[i].data[j].value)
      }


      series.push({
        name: data[i].alias,
        type: "line",
        smooth: true,
        data: quxianListData,
        yAxisIndex: typeGG,
        itemStyle: {
          color: color[i],
        },
        lineStyle: {
          width: 1
        },
        symbol: 'circle',
        symbolSize: 5,
        markLine: markLine
      })

    }

    for (var i = 0; i < xAll.length; i++) {
      xAxis.push(xAll[i].time) //x轴
    }

  }


  //计算数据
  function avg(array) { //封装求平均值函数
    var len = array.length;
    var sum = 0;
    for (var i = 0; i < len; i++) {
      sum += array[i];
    }
    return sum / len;
  }
  //y轴数据合并
  let dataArr = []
  series.forEach(one => {
    dataArr.push(one.data)
  });
  let dataPing = dataArr.flat(Infinity) //压平成一个数组
  //计算平均值、最大值、最小值
  let avgPing = avg(dataPing)
  let maxPing = Math.max.apply(null, dataPing)
  let minPing = Math.min.apply(null, dataPing)
  if (maxPing > 0 && maxPing < 4 && minPing > 0 && minPing < 4) {
    //监测数据在0~4内，纵坐标从0开始，刻度为0、1、2、3、4、5；
    yAxis[0].max = 5
    yAxis[0].min = 0
  } else if (maxPing < 0 && maxPing > -4 && minPing < 0 && minPing > -4) {
    //监测数据在0~-4内，纵坐标从1开始，刻度为1、0、-1、-2、-3、-4、-5；
    yAxis[0].max = 1
    yAxis[0].min = -5
  } else {
    let maxR = Math.abs(maxPing - avgPing);
    let minR = Math.abs(minPing - avgPing);
    // let avgVal=(avgPing>0?Math.ceil(avgPing):Math.floor(avgPing))

    if (maxR < 2 && minR < 2) {
      yAxis[0].max = parseInt(avgPing + 2)
      yAxis[0].min = parseInt(avgPing - 2)

    } else {
      if (maxPing > 0) {
        yAxis[0].max = Math.ceil(maxPing * 1.2 + 2)
      }
      if (minPing < 0) {
        yAxis[0].min = Math.floor(minPing * 1.2 - 2)
      }
    }
    // if (maxPing < 0 && minPing < 0) {
    //   xPosition = 'top'
    //   top = 100
    //   bottom = 60
    // }
  }


  let optionTpl = {
    title: {
      top: 10,
      show: true,
      text: text,
      x: 'center',
    },
    legend: {
      bottom: 20,
      top: 35,
      left: 'center',
      data: legend
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff'
      },
      formatter: params => {
        var datAll = params[0].name;
        var name = '';
        for (var i = 0; i < params.length; i++) {
          if (danwei == "l1_lf") {
            name = "裂缝偏移："
          } else {
            params[i].seriesName + '轴偏移 : '
          }
          datAll = datAll + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[i].color + "'></span>" + name + Number(params[i].value) + unit;
        }
        return datAll
      }
    },
    grid: {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
      show: false,
      // backgroundColor:"#FFFFF0",
      borderWidth: '0'
    },
    dataZoom: [{
      type: 'inside', //图表下方的伸缩条
    }, {
      type: 'slider', //图表下方的伸缩条
      show: true, //是否显示
      realtime: true, //拖动时，是否实时更新系列的视图
      start: 0, //伸缩条开始位置（1-100），可以随时更改
      end: 100, //伸缩条结束位置（1-100），可以随时更改
      height: 15
    }],
    xAxis: [{
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false
      },
      type: 'category',
      position: xPosition,
      data: xAxis,
      splitLine: {
        show: false,
        lineStyle: {
          color: '#D5D8DC',
          type: 'dashed'
        }
      },
      axisLabel: { //换行
        show: true,
        interval: parseInt(xAxis.length / 5),
        showMinLabel: true,
        showMaxLabel: true,
        formatter: function (value) {
          var t_date = new Date(value);
          return [t_date.getFullYear(), t_date.getMonth() + 1, t_date.getDate()].join('-') + "\n" + [t_date.getHours(), t_date.getMinutes(), t_date.getSeconds()].join(':');
        }
      },
    }, ],
    yAxis: yAxis,
    series: series
  }


  return optionTpl;
};

export function echartsTypeYL(valNew, text, unit, tuimes, code) {
  // var ylDataList = [
  //     50,
  //     50,
  //     50,
  //     100
  // ]
  // var maxYujing = Math.max(...ylDataList)//最大的预警值

  var data = valNew.data;
  var xAxis = []; //x轴
  var xAxis1 = []; //x轴
  var xAxis2 = []; //x轴
  var yAxis = []; //y轴
  var nameTextStyle = [];
  var number = 0;
  var position = '';
  var series = [];
  var offset = 0;
  var left = 80;
  var right = 80;
  var legend = [];
  var color = ["#FF8635", "#70D340", "#1FC1AC", "#8C37FF"];
  var typeOn = [];
  var typeGG = 0;
  var quxianListData = {
    0: [],
    1: []
  }
  var xAll = [];
  var xAll1 = [];
  if (data.length != 0) {

    var markLine = {};
    var tuimesData = [];
    // if(tuimes == 0){

    // }else if(tuimes == 3){//3小时
    //     tuimesData = [
    //         {
    //             yAxis: 50,
    //             lineStyle: {
    //                 color: "orange"
    //             },
    //             label: {
    //                 color: "orange"
    //             }
    //         },
    //         {
    //             yAxis:100,
    //             lineStyle: {
    //                 color: "red"
    //             },
    //             label: {
    //                 color: "red"
    //             }
    //         }
    //     ]
    // }else if(tuimes == 6){//6小时
    //     tuimesData = [
    //         {
    //             yAxis: 50,
    //             lineStyle: {
    //                 color: "yellow"
    //             },
    //             label: {
    //                 color: "yellow"
    //             }
    //         }
    //     ]
    // }else if(tuimes == 12){//12小时
    //     tuimesData = [
    //         {
    //             yAxis: 50,
    //             lineStyle: {
    //                 color: "blue"
    //             },
    //             label: {
    //                 color: "blue"
    //             }
    //         },
    //     ]
    // }

    // markLine = {
    //     symbol: 'none',
    //     label: {
    //         show: true,
    //         position: 'end',
    //         fontSize: 14,
    //         fontWeight: 'bold'
    //     },
    //     lineStyle: {
    //         type: 'dotted'
    //     },
    //     data: tuimesData
    // }

    for (var i = 0; i < data.length; i++) {
      legend.push({
        bottom: 20,
        top: 20,
        x: '300px',
        y: '5px',
        name: data[i].alias,
        textStyle: {
          color: color[i],
        }
      })

      offset = Math.floor(number / 2) * 50;
      if ((number + 1) % 2 === 0) {
        nameTextStyle = [0, 0, 30, 0]
        position = 'left';
        left = Math.floor(number / 2) * 50 + left;
      } else if ((number + 1) % 2 === 1) {
        nameTextStyle = [0, 0, 30, 0]
        position = 'left';
        left = Math.floor(number / 2) * 50 + left;
      }

      number++;

      var YdataName = "";
      if (data[i].unit == "") {
        YdataName = data[i].name;
      } else {
        YdataName = data[i].unit;
      }

      for (var k = 0; k < data[i].data.length; k++) {
        xAxis.push(data[i].data[k].time) //x轴
        if (data[i].data) {
          quxianListData[i].push([data[i].data[k].time, data[i].data[k].value])
        }
      }



      for (var kk = 0; kk < typeOn.length; kk++) {
        if (typeOn[kk] == data[i].unit) {
          typeGG = kk;
        }
      }

      series.push({
        name: data[i].alias,
        // type: "bar",
        // axisLine: {
        //   show: true,
        // },
        // axisTick: {
        //   show: false
        // },
        type: data[i].type,
        smooth: true,
        data: quxianListData[i],
        yAxisIndex: typeGG,
        barMaxWidth: 30,
        itemStyle: {
          color: color[i],
        },
        // label:{
        // show:true,
        // position:'top',
        // textStyle: {
        //     fontWeight:'bolder',
        //     fontSize : '10',
        //     fontFamily : '微软雅黑',
        //     color:'red',
        // },
        // formatter: prame => {
        //     if(prame.value <= 0){
        //         return "";
        //     }else{
        //         return prame.value
        //     }
        // }
        // },
        // markLine:markLine
      })
    }
    yAxis.push({
      name: YdataName,
      nameLocation: 'center',
      nameTextStyle: {
        padding: nameTextStyle
      },
      position: position,
      type: 'value',
      axisLine: {
        show: true
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function (value, index) {
          if (Math.abs(value) > 1) {
            return value.toFixed(1);
          } else {
            return value.toFixed(2);
          }
        }
      },
      // offset: offset,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#D5D8DC',
          type: 'solid'
        }
      },
      max: function (value) {
        if (value.max < 10 && value.max >= 0) {
          return 10
        } else if (value.max < 25 && value.max >= 10) {
          return 25
        } else if (value.max < 50 && value.max >= 25) {
          return 50
        } else if (value.max < 100 && value.max >= 50) {
          return 100
        } else if (value.max < 200 && value.max >= 100) {
          return 200
        } else if (value.max >= 200) {
          return Math.round(value.max + 10)
        }
        // return value.max * 1.1;
      },
      min: function (value) {
        return 0;
      }
    })
  }

  xAxis = xAxis.sort((a, b) => {
    return Date.parse(a.replace(/-/g, "/")) - Date.parse(b.replace(/-/g, "/"));
  })

  return {
    title: {
      top: 10,
      show: true,
      text: text,
      x: 'center',
    },
    legend: {
      top: 35,
      bottom: 20,
      left: 'center',
      data: legend
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff'
      },
      formatter: params => {
        var datAll = params[0].name;
        for (var i = 0; i < params.length; i++) {
          datAll = datAll + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[i].color + "'></span>" + params[i].seriesName + " : " + params[i].value[1] + unit;
        }
        return datAll
      }
    },
    grid: {
      left: left,
      right: right,
      top: 60,
      bottom: 80,
      show: false,
      // backgroundColor:"#FFFFF0",
      borderWidth: '0'
    },
    dataZoom: [{
      type: 'inside', //图表下方的伸缩条
    }, {
      type: 'slider', //图表下方的伸缩条
      show: true, //是否显示
      realtime: true, //拖动时，是否实时更新系列的视图
      start: 0, //伸缩条开始位置（1-100），可以随时更改
      end: 100, //伸缩条结束位置（1-100），可以随时更改
      height: 15
    }],

    xAxis: [{
      type: 'category',
      data: xAxis,
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
        // alignWithLabel: true
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#D5D8DC',
          type: 'dashed'
        }
      },
      axisLabel: { //换行
        show: true,
        interval: parseInt(xAxis.length / 5),
        showMinLabel: true,
        showMaxLabel: true,
        formatter: function (value) {
          var t_date = new Date(value);
          return [t_date.getFullYear(), t_date.getMonth() + 1, t_date.getDate()].join('-') + "\n" + [t_date.getHours(), t_date.getMinutes(), t_date.getSeconds()].join(':');
        }
      },
    }, ],
    yAxis: yAxis,
    series: series
  };
}

export function echartsTypeSW(valNew, text, unit, code) {

  var legendList = [];
  var newServerData = [];
  var maxNumberList = [];

  for (var i = 0; i < valNew.data.length; i++) {
    legendList.push(valNew.data[i][0].time);
    const serverDataList = [];
    // const bchearr = (valNew.data[i][0].allNodeList).reverse();
    // const nownode = (valNew.data[i][0].nodeList).reverse();
    for (var k = 0; k < valNew.data[i][0].xValueList.length; k++) {
      maxNumberList.push(valNew.data[i][0].xValueList[k], valNew.data[i][0].yValueList[k], valNew.data[i][0].zValueList[k])
      serverDataList.push([
        valNew.data[i][0].xValueList[k], valNew.data[i][0].yValueList[k], valNew.data[i][0].zValueList[k], valNew.data[i][0].nodeList[k] || valNew.data[i][0].allNodeList[k] // -bchearr[nownode[k] - 1
      ])
    }
    function getData(dataL,dataA){
          //仅供一组数据的处理
          //dataL为组装数据，dataA为组装之前的数据
          let nodeTpl=(deepClone(dataA.data[0][0].nodeList).sort().toString())
          let zTpl=(deepClone(dataA.data[0][0].zValueList).sort().toString())
          if(nodeTpl==zTpl){
              return  (dataL.reverse().map(function (item) {
                return {
                  value: [item[0], item[1], (item[2]*-1)],
                  nodeVal:item[3]
                }
              }))
          }else{
            return  (dataL.map(function (item) {
              return {
                value: [item[0], item[1], item[2]],
                nodeVal:item[3]
              }
            }))
          }

    }
    newServerData.push({
      type: 'scatter3D',
      name: valNew.data[i][0].time,
      symbolSize: 6,
      itemStyle: {
        // color: 'rgb( 49, 54,149)'  //点的颜色
      },
      label: {
        show: false,
        position: 'left',
        distance: 0,
        textStyle: {
          fontSize: 16,
        }
      },
      data:getData(serverDataList,valNew),
      // data: serverDataList.reverse().map(function (item) {
      //   // let arr = item[3].sort(function(a, b){return a-b})
      //   // console.log(arr);
      //   return {
      //     value: [item[0], item[1], item[2]],
      //     nodeVal: item[3]
      //   }
      // })
    }, {
      name: valNew.data[i][0].time,
      smooth: true,
      type: 'line3D',
      data:getData(serverDataList,valNew),
      // data: serverDataList.reverse().map(function (item) {
      //   // let arr = item[3].sort(function(a, b){return a-b})
      //   return {
      //     value: [item[0], item[1], (item[2]*-1)],
      //     nodeVal:item[3]
      //   }
      // }),
      lineStyle: {
        width: 5,
      },
      shading: 'color',
      label: {
        show: false,
        fontSize: 16,
        borderWidth: 1
      },
      itemStyle: {
        opacity: 0.4,
        color: 'rgb(255,255,191)'
      },
      emphasis: {
        label: {
          fontSize: 20,
          color: '#900'
        },
        itemStyle: {
          color: '#900'
        }
      }
    })
  }
  var numerFour = 0;
  if (Math.abs(Math.max.apply(null, maxNumberList)) >= Math.abs(Math.min.apply(null, maxNumberList))) {
    numerFour = Math.abs(Math.max.apply(null, maxNumberList));
  } else {
    numerFour = Math.abs(Math.min.apply(null, maxNumberList));
  }
  return {
    title: {
      top: 10,
      show: true,
      text: text,
      x: 'center',
    },
    tooltip: {
      show: true,
      formatter: (params) => {
        let stringTpl = params.seriesName + "</br>" + params.marker + "节点序号：" + params.data.nodeVal;
        params.value.forEach((item, i) => {
          stringTpl += `
            </br>
            ${Object.keys(params.encode)[i]}
            ：
            ${item}
            `
        })
        return stringTpl
      }
    },
    // legend: {
    //   type: 'scroll',
    //   orient: 'vertical',
    //   left: 20,
    //   top: 230,
    //   icon: 'roundRect',
    //   data: legendList,
    // },
    xAxis3D: {
      name: 'X',
      type: 'value',
      max: numerFour,
      min: -numerFour,
    },
    yAxis3D: {
      name: 'Y',
      type: 'value',
      max: numerFour,
      min: -numerFour,
    },
    zAxis3D: {
      name: 'Z',
      type: 'value',
    },
    grid3D: {
      top: 25,
      axisLine: {
        show: true,
        interval: 0,
        lineStyle: {
          color: 'gray'
        }
      },
      viewControl: {
        alpha: 15,
        beta: 45,
        minBeta: 0,
        maxBeta: 90,
        distance: 300
      }
    },
    series: newServerData
  }
}

export function echartsTypeSW2DNew(valNew, text, unit, code) {
  var legendList = [];
  const series = [];

  const bchearr = valNew.data[0][0].nodeList.reverse();
  const nownode = valNew.data[0][0].nodeList.reverse();

  const yData = [];
  for (var j = 0; j < valNew.data[0][0].nodeList.length; j++) {
    yData.push(-valNew.data[0][0].nodeList[j])
  }
  yData.push('0')
  yData.reverse();

  legendList = ['X方向位移', 'Y方向位移', '合位移'];
  for (var i = 0; i < valNew.data.length; i++) {
    series.push({
      itemStyle: {
        normal: {
          color: "#547AC6",
          borderColor: "#547AC6",
          borderWidth: 2
        }
      },
      symbol: "circle",
      smooth: true,
      name: 'X方向位移', //valNew.data[i][0].time,
      type: "line",
      data: ([null].concat(valNew.data[i][0].xValueList))
    }, {
      itemStyle: {
        normal: {
          color: "#91CC90",
          borderColor: "#91CC90",
          borderWidth: 2
        }
      },
      symbol: "circle",
      smooth: true,
      name: 'Y方向位移', //valNew.data[i][0].time,
      type: "line",
      // data: valNew.data[i][0].yValueList
      data: ([null].concat(valNew.data[i][0].yValueList))
    }, {
      itemStyle: {
        normal: {
          color: "#FAC858",
          borderColor: "#FAC858",
          borderWidth: 2
        }
      },
      symbol: "circle",
      smooth: true,
      name: '合位移', //valNew.data[i][0].time,
      type: "line",
      // data: valNew.data[i][0].zValueList
      data: ([null].concat(valNew.data[i][0].zValueList))
    })
  }
  return {
    inverse: true,
    title: {
      top: 10,
      show: true,
      text: text,
      x: 'center',
    },
    legend: {
      left: 'center',
      top: 40,
      bottom: 20,
      data: legendList,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff", //通过设置rgba调节背景颜色与透明度
      color: "rgba(0,0,0,.65)",
      textStyle: {
        color: "rgba(0,0,0,.65)",
        fontSize: 12
      },
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#006CD9"
        }
      },
      formatter: params => {
        var datAll = params[0].name + "米";
        for (var i = 0; i < params.length; i++) {
          var directionName = "";
          switch (params[i].color) {
            case "#547AC6":
              directionName = "x方向位移"
              break;
            case "#91CC90":
              directionName = "y方向位移"
              break;
            case "#FAC858":
              directionName = "合位移"
              break;
          }
          datAll = datAll + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[i].color + "'></span>" + directionName + " : " + Number(params[i].value) + "mm";
        }
        return datAll
      }
    },
    grid: {
      top: 70,
      right: 35,
      bottom: 10,
      left: 10,
      show: false,
      borderWidth: '0',
      containLabel: true
    },
    dataZoom: [{
      type: 'slider', //图表下方的伸缩条
      show: true, //是否显示
      realtime: true, //拖动时，是否实时更新系列的视图
      start: 0, //伸缩条开始位置（1-100），可以随时更改
      end: 100, //伸缩条结束位置（1-100），可以随时更改
      height: 15,
      bottom: 0
    }],
    xAxis: [{
      type: "value",
      name: "偏移值(mm)",
      position: "top",
      nameTextStyle: {
        verticalAlign: "top",
        lineHeight: 25,
      },
      nameRotate: 90,
      splitNumber: 8,
      axisLabel: {
        formatter: "{value}"
      },
      axisLine: {
        show: true,
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "rgba(0,0,0,.1)"
        }
      }
    }, ],
    yAxis: [{
      type: "category",
      nameLocation: 'center',
      nameTextStyle: {
        padding: [0, 0, 30, 0]
      },
      position: "left",
      inverse: true,
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      // axisLabel :{
      //     interval:0,
      //     rotate:30
      // },
      name: '节点/m(米)',
      data: yData,
      axisPointer: {
        type: "shadow"
      },
    }, ],
    series: series
  }
}

export function echartsTypeSW2D(valNew, text, unit, code, table, panjuData, nodeList) { //深部位移平面x轴
  var name = text + table + "方向累计变化曲线";
  var yAxis = []; //y轴数据
  var xAxis = []; //X轴数据
  var legendList = [];
  var series = [];
  var markLine = {};
  var markLineData = [];
  const bchearr = (nodeList.allNodeList).reverse();
  const nownode = nodeList.nodeList;

  if (panjuData.length > 0) {
    if (table == "X") {
      markLineData = [{
          yAxis: panjuData[0].warnValueSumBlue,
          lineStyle: {
            color: "blue"
          },
          label: {
            color: "blue"
          }
        },
        {
          yAxis: panjuData[0].warnValueSumYellow,
          lineStyle: {
            color: "#f3e001"
          },
          label: {
            color: "#f3e001"
          }
        },
        {
          yAxis: panjuData[0].warnValueSumOrange,
          lineStyle: {
            color: "orange"
          },
          label: {
            color: "orange"
          }
        },
        {
          yAxis: panjuData[0].warnValueSumRed,
          lineStyle: {
            color: "red"
          },
          label: {
            color: "red"
          }
        }
      ]
    } else if (table == "Y") {
      markLineData = [{
          yAxis: panjuData[1].warnValueSumBlue,
          lineStyle: {
            color: "blue"
          },
          label: {
            color: "blue"
          }
        },
        {
          yAxis: panjuData[1].warnValueSumYellow,
          lineStyle: {
            color: "#f3e001"
          },
          label: {
            color: "#f3e001"
          }
        },
        {
          yAxis: panjuData[1].warnValueSumOrange,
          lineStyle: {
            color: "orange"
          },
          label: {
            color: "orange"
          }
        },
        {
          yAxis: panjuData[1].warnValueSumRed,
          lineStyle: {
            color: "red"
          },
          label: {
            color: "red"
          }
        }
      ]
    }
    markLine = {
      symbol: 'none',
      label: {
        show: true,
        position: 'end',
        fontSize: 14,
        // fontWeight: 'bold'
      },
      lineStyle: {
        type: [5, 10],
        dashOffset: 5
      },
      data: markLineData
    }
  }


  var jizhidianNum = 0;

  for (var k = 0; k < valNew[0].length; k++) {
    xAxis.push(valNew[0][k].time);
  }
  for (var i = 0; i < valNew.length; i++) {

    if (nownode.indexOf(valNew[i][0].node) !== -1) {
      legendList.push(-bchearr[valNew[i][0].node - 1] + "米");
      var yname = -bchearr[valNew[i][0].node - 1] + "米";

      var ydata = [];
      if (table == "X") {
        for (var j = 0; j < valNew[i].length; j++) {
          ydata.push(valNew[i][j].dispsX);
        }
      } else if (table == "Y") {
        for (var j = 0; j < valNew[i].length; j++) {
          ydata.push(valNew[i][j].dispsY);
        }
      }

      if (Math.abs(Math.max.apply(null, ydata)) >= Math.abs(Math.min.apply(null, ydata))) {
        if (jizhidianNum >= Math.abs(Math.max.apply(null, ydata))) {
          jizhidianNum = jizhidianNum
        } else {
          jizhidianNum = Math.abs(Math.max.apply(null, ydata))
        }
      } else {
        if (jizhidianNum >= Math.abs(Math.min.apply(null, ydata))) {
          jizhidianNum = jizhidianNum
        } else {
          jizhidianNum = Math.abs(Math.min.apply(null, ydata))
        }
      }




      series.push({
        name: yname,
        type: "line",
        smooth: true,
        data: ydata,
        lineStyle: {
          width: 1
        },
        symbol: 'circle',
        symbolSize: 5,
        markLine: markLine
      })
    }
  }

  legendList = legendList.reverse();

  yAxis.push({
    name: unit,
    nameLocation: 'center',
    nameTextStyle: {
      padding: [0, 0, 30, 0]
    },
    position: "left",
    type: 'value',
    axisLine: {
      show: true
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      formatter: function (value, index) {
        // console.log(value)
        if (Math.abs(value) > 1) {
          return value.toFixed(1);
        } else {
          return value.toFixed(2);
        }
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#D5D8DC",
        type: 'solid',
      },
    },
    max: jizhidianNum,
    min: -jizhidianNum
  });



  return {
    title: {
      top: 10,
      show: true,
      text: name,
      x: 'center',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 20,
      top: 80,
      icon: 'circle',
      data: legendList,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff'
      },
      formatter: params => {
        var datAll = params[0].name;
        for (var i = 0; i < params.length; i++) {
          datAll = datAll + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[i].color + "'></span>第" + (i + 1) + "节点 : " + Number(params[i].value) + unit;
        }
        return datAll
      }
    },
    grid: {
      left: 80,
      right: 150,
      top: 60,
      bottom: 80,
      show: false,
      // backgroundColor:"#FFFFF0",
      borderWidth: '0'
    },
    dataZoom: [{
      type: 'inside', //图表下方的伸缩条
    }, {
      type: 'slider', //图表下方的伸缩条
      show: true, //是否显示
      realtime: true, //拖动时，是否实时更新系列的视图
      start: 0, //伸缩条开始位置（1-100），可以随时更改
      end: 100, //伸缩条结束位置（1-100），可以随时更改
      height: 15
    }],
    xAxis: [{
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false
      },
      type: 'category',
      data: xAxis,
      splitLine: {
        show: false,
        lineStyle: {
          color: '#D5D8DC',
          type: 'dashed'
        }
      },
      axisLabel: { //换行
        show: true,
        interval: parseInt(xAxis.length / 5),
        showMinLabel: true,
        showMaxLabel: true,
        formatter: function (value) {
          var t_date = new Date(value);
          return [t_date.getFullYear(), t_date.getMonth() + 1, t_date.getDate()].join('-') + "\n" + [t_date.getHours(), t_date.getMinutes(), t_date.getSeconds()].join(':');
        }
      },
    }, ],
    yAxis: yAxis,
    series: series
  }
}


export function trajectChart(data) {
  return {
    title: {
      show: false
    },
    polar: {},
    angleAxis: {
      zlevel: 1,
      z: 1,
      min: -180,
      max: 180,
      interval: 30,
      startAngle: -90,
      axisLabel: {
        color: '#000'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#000',
          width: 1
        }
      },
      splitLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
    },
    radiusAxis: {
      zlevel: 1,
      z: 1,
      max: function (value) {
        return (value.max * 1.5).toFixed(0);
      },
      splitNumber: 3,
      axisLabel: {
        show: true,
        rotate: 0,
        formatter: function (value, index) {
          return value + 'mm';
        }
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: false
      },
      minorTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: function (params) {
        let html =
          '<div><div>角度：' +
          params.value[1] +
          '°</div>' +
          '<div>偏距：' +
          params.value[0] +
          'mm</div>' +
          '<div>时间：' +
          params.value[2] +
          '</div></div>';
        return html;
      },
    },
    series: [{
        coordinateSystem: 'polar',
        zlevel: 2,
        z: 2,
        name: 'scatter',
        type: 'scatter',
        data: data,
      },
      {
        type: 'pie',
        radius: '76%',
        zlevel: 0,
        z: 0,
        silent: true,
        data: [0],
        itemStyle: {
          color: {
            colorStops: [{
                offset: 0,
                color: '#fff'
              },
              {
                offset: 1,
                color: '#fff'
              },
            ],
            x: 0.5,
            y: 0.5,
            r: 0.5,
            type: 'radial',
            global: false,
          },
        },
        labelLine: {
          show: false
        },
      },
      {
        type: 'pie',
        radius: ['45.5%', '45.7%'],
        zlevel: 1,
        z: 1,
        silent: true,
        data: generateData(200, 25, 20, '#ccc'),
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          color: '#000'
        },
      },
    ],
  }
}

export function trendChartOption(valNew, text, unit, type) {
  let legendList = [];
  let series = [];
  let yData = [];
  let color = ["#FF8635", "#70D340", "#1FC1AC", "#8C37FF"];

  if (valNew.data.length > 0) {
    const bchearr = valNew.data[0][0].nodeList.reverse();
    const nownode = valNew.data[0][0].nodeList.reverse();
    for (var j = 0; j < valNew.data[0][0].nodeList.length; j++) {
      yData.push(-valNew.data[0][0].nodeList[j])
    }
    yData.reverse();

    for (var i = 0; i < valNew.data.length; i++) {
      legendList.push({
        name: valNew.data[i][0].time,
      });
      if (type == 'x') {
        series.push({
          itemStyle: {
            normal: {
              color: color[i],
              borderColor: color[i],
              borderWidth: 2
            }
          },
          symbol: "circle",
          smooth: true,
          name: valNew.data[i][0].time,
          type: "line",
          data: valNew.data[i][0].xValueList
        })
      } else if (type == 'y') {
        series.push({
          itemStyle: {
            normal: {
              color: color[i],
              borderColor: color[i],
              borderWidth: 2
            }
          },
          symbol: "circle",
          smooth: true,
          name: valNew.data[i][0].time,
          type: "line",
          data: valNew.data[i][0].yValueList
        })
      } else {
        series.push({
          itemStyle: {
            normal: {
              color: color[i],
              borderColor: color[i],
              borderWidth: 2
            }
          },
          symbol: "circle",
          smooth: true,
          name: valNew.data[i][0].time,
          type: "line",
          data: valNew.data[i][0].zValueList
        })
      }
    }
  }

  return {
    inverse: true,
    title: {
      top: 10,
      show: true,
      text: text,
      x: 'center',
    },
    legend: {
      left: 'center',
      top: 40,
      bottom: 20,
      type: 'scroll',
      data: legendList,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff", //通过设置rgba调节背景颜色与透明度
      color: "rgba(0,0,0,.65)",
      textStyle: {
        color: "rgba(0,0,0,.65)",
        fontSize: 12
      },
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#006CD9"
        }
      },
      formatter: params => {
        var datAll = params[0].name + "米";
        for (var i = 0; i < params.length; i++) {
          var directionName = "";
          switch (params[i].color) {
            case "#547AC6":
              directionName = "x方向位移"
              break;
            case "#91CC90":
              directionName = "y方向位移"
              break;
            case "#FAC858":
              directionName = "合位移"
              break;
          }
          datAll = datAll + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[i].color + "'></span>" + params[i].seriesName + " : " + directionName + " : " + Number(params[i].value) + "mm";
        }
        return datAll
      }
    },
    grid: {
      top: 70,
      right: 10,
      bottom: 10,
      left: 10,
      show: false,
      borderWidth: '0',
      containLabel: true
    },
    dataZoom: [{
      type: 'slider', //图表下方的伸缩条
      show: true, //是否显示
      realtime: true, //拖动时，是否实时更新系列的视图
      start: 0, //伸缩条开始位置（1-100），可以随时更改
      end: 100, //伸缩条结束位置（1-100），可以随时更改
      height: 15,
      bottom: 0
    }],
    xAxis: [{
      type: "value",
      name: "偏移值(mm)",
      position: "top",
      nameTextStyle: {
        verticalAlign: "top",
        lineHeight: 25,
      },
      splitNumber: 8,
      axisLabel: {
        formatter: "{value}"
      },
      axisLine: {
        show: true,
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "rgba(0,0,0,.1)"
        }
      },
      max: function (value) {
        return value.max * 2
      },
      min: function (value) {
        if (value.min < 0) {
          return value.min * 2;
        } else if (value.min > 0) {
          return (value.min * -2);
        } else {
          return -10;
        }
      },
    }],
    yAxis: [{
      type: "category",
      nameLocation: 'center',
      nameTextStyle: {
        padding: [0, 0, 30, 0]
      },
      position: "left",
      inverse: true,
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      // axisLabel :{
      //     interval:0,
      //     rotate:30
      // },
      name: '节点/m(米)',
      data: yData,
      axisPointer: {
        type: "shadow"
      },
    }, ],
    series: series
  }
}

export function nodeMovementChart(valNew, text, unit, danwei, type) {
  var data = valNew.data;
  var xAxis = []; //x轴
  var yAxis = []; //y轴
  var nameTextStyle = [];
  var number = 0;
  var position = '';
  var series = [];
  var offset = 0;
  var left = 80;
  var right = 80;
  var legend = [];
  var color = ["#FF8635", "#70D340", "#1FC1AC", "#8C37FF"];
  var typeOn = [];
  var typeGG = 0;

  var xAll = [];
  if (data.length != 0) {

    for (var i = 0; i < data.length; i++) {
      legend.push({
        name: `${data[i].alias}`,
        color: color[i]
      })
      if (xAll.length < data[i].data.length) {
        xAll = data[i].data;
      }

      if (typeOn.indexOf(data[i].unit) > -1) {

      } else {

        offset = Math.floor(number / 2) * 50;
        if ((number + 1) % 2 === 0) {
          nameTextStyle = [30, 0, 0, 0]
          position = 'right';
          right = Math.floor(number / 2) * 50 + right;
        } else if ((number + 1) % 2 === 1) {
          nameTextStyle = [0, 0, 30, 0]
          position = 'left';
          left = Math.floor(number / 2) * 50 + left;
        }

        typeOn.push(data[i].unit)

        var YdataName = "";
        if (data[i].unit == "") {
          YdataName = data[i].name;
        } else {
          YdataName = data[i].unit;
        }

        yAxis.push({
          name: YdataName,
          nameLocation: 'center',
          nameTextStyle: {
            padding: nameTextStyle
          },
          position: position,
          type: 'value',
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function (value, index) {
              if (typeof (value) == 'number' && Math.abs(value) > 1) {
                return value.toFixed(1);
              } else {
                return value.toFixed(2);
              }
            }
          },
          offset: offset,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#D5D8DC",
              type: 'solid',
            },
          },
          max: function (value) {
            if (value.max < 0) {
              return 0;
            } else if (value.max == 0) {
              return 0;
            } else {
              return Math.round(value.max + 10);
            }
          },
          min: function (value) {
            if (value.min < 0) {
              return Math.round(value.max - 10);
            } else if (value.min == 0) {
              return 0;
            } else {
              return 0;
            }
          }
        })

        number++;
      }

      for (var kk = 0; kk < typeOn.length; kk++) {
        if (typeOn[kk] == data[i].unit) {
          typeGG = kk;
        }
      }

      var quxianListData = [];

      for (var j = 0; j < data[i].data.length; j++) {
        if (type == 'z') {
          quxianListData.push(data[i].data[j].cumulativeDisplacement.toFixed(3))
        } else if (type == 'x') {
          quxianListData.push(data[i].data[j].dispsX)
        } else {
          quxianListData.push(data[i].data[j].dispsY)
        }
      }

      series.push({
        name: `${data[i].alias}`,
        bottom: 20,
        top: 20,
        type: "line",
        smooth: true,
        data: quxianListData,
        yAxisIndex: typeGG,
        itemStyle: {
          color: color[i],
        },
        lineStyle: {
          width: 1,
          color: color[i]
        },
        symbol: 'circle',
        symbolSize: 3,
      })

    }

    for (var i = 0; i < xAll.length; i++) {
      xAxis.push(xAll[i].time) //x轴
    }
  }

  return {
    title: {
      top: 10,
      show: true,
      text: text,
      x: 'center',
    },
    legend: {
      left: 'center',
      type: 'scroll',
      data: legend
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff'
      },
      formatter: params => {
        var datAll = params[0].name;
        var name = '';
        for (var i = 0; i < params.length; i++) {
          if (danwei == "l1_lf") {
            name = "裂缝偏移："
          } else {
            params[i].seriesName + '轴偏移 : '
          }
          datAll = datAll + '<br/>' + "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + params[i].color + "'></span>" + name + Number(params[i].value) + unit;
        }
        return datAll
      }
    },
    grid: {
      left: left,
      right: right,
      top: 60,
      bottom: 80,
      show: false,
      borderWidth: '0'
    },
    dataZoom: [{
      type: 'inside', //图表下方的伸缩条
    }, {
      type: 'slider', //图表下方的伸缩条
      show: true, //是否显示
      realtime: true, //拖动时，是否实时更新系列的视图
      start: 0, //伸缩条开始位置（1-100），可以随时更改
      end: 100, //伸缩条结束位置（1-100），可以随时更改
      height: 15
    }],
    xAxis: [{
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false
      },
      type: 'category',
      data: xAxis,
      splitLine: {
        show: false,
        lineStyle: {
          color: '#D5D8DC',
          type: 'dashed'
        }
      },
      axisLabel: { //换行
        show: true,
        interval: parseInt(xAxis.length / 5),
        showMinLabel: true,
        showMaxLabel: true,
        formatter: function (value) {
          var t_date = new Date(value);
          return [t_date.getFullYear(), t_date.getMonth() + 1, t_date.getDate()].join('-') + "\n" + [t_date.getHours() < 10 ? '0' + t_date.getHours() : t_date.getHours(),
            t_date.getMinutes() < 10 ? '0' + t_date.getMinutes() : t_date.getMinutes(),
            t_date.getSeconds() < 10 ? '0' + t_date.getSeconds() : t_date.getSeconds()
          ].join(':');
        }
      },
    }, ],
    yAxis: yAxis,
    series: series
  };
}
