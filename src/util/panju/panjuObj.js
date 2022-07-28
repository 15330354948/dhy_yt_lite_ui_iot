export const imgType = {//所有的监测类型对应图标
    101:[//裂缝
        {
            img:'lf.png',
        }
    ],
    102:[//地表位移
        {
            img:'dbwy.png',
        }
    ],
    103:[//深部位移
        {
            img:'sbwy.png',
        }
    ],
    104:[//加速度
        {
            img:'jsd.png',
        }
    ],
    105:[//倾角
        {
            img:'qj.png',
        }
    ],
    106:[//振动
        {
            img:'zd.png',
        }
    ],
    201:[//应力
        {
            img:'yl.png',
        }
    ],
    202:[//土压力
        {
            img:'tyl.png',
        }
    ],
    203:[//次声
        {
            img:'cs.png',
        }
    ],
    204:[//地声
        {
            img:'ds.png',
        }
    ],
    301:[//雨量
        {
            img:'yl.png',
        }
    ],
    302:[//气温
        {
            img:'qw.png',
        }
    ],
    303:[//土壤温度
        {
            img:'trsd.png',
        }
    ],
    304:[//土壤含水率
        {
            img:'trhsl.png',
        }
    ],
    305:[//地表水温
        {
            img:'dbswd.png',
        }
    ],
    306:[//地表水位
        {
            img:'dbsw.png',
        }
    ],
    307:[//地下水温
        {
            img:'dxswd.png',
        }
    ],
    308:[//地下水位
        {
            img:'dxsw.png',
        }
    ],
    309:[//孔隙水温度
        {
            img:'kxswd.png',
        }
    ],
    310:[//孔隙水压力
        {
            img:'sxsyl.png',
        }
    ],
    311:[//渗透压力
        {
            img:'styl.png',
        }
    ],
    312:[//流速
        {
            img:'ls.png',
        }
    ],
    313:[//沉降
        {
            img:'cj.png',
        }
    ],
    314:[//气压
        {
            img:'qy.png',
        }
    ],
    401:[//泥水位
        {
            img:'nsw.png',
        }
    ],
    402:[//雷达
        {
            img:'ld.png',
        }
    ],
    403:[
        {
            img:'lb.png'
        }
    ]
}

export const typeShare = [//公共计算器样式
    {
        table:'前',
        value:'before',
    },
    {
        table:'时',
        value:'houre',
    },
    {
        table:'日',
        value:'day',
    },
    {
        table:'删除',
        value:'delect',
    },
    {
        table:'或',
        value:'||',
        class:'pjw_50'
    },
    {
        table:'且',
        value:'&&',
        class:'pjw_50'
    },
    {
        table:'7',
        value:'7',
    },
    {
        table:'8',
        value:'8',
    },
    {
        table:'9',
        value:'9',
    },
    {
        table:'<',
        value:'<',
    },
    {
        table:'4',
        value:'4',
    },
    {
        table:'5',
        value:'5',
    },
    {
        table:'6',
        value:'6',
    },
    {
        table:'>',
        value:'>',
    },
    {
        table:'1',
        value:'1',
    },
    {
        table:'2',
        value:'2',
    },
    {
        table:'3',
        value:'3',
    },
    {
        table:'≤',
        value:'<=',
    },
    {
        table:'0',
        value:'0',
    },
    {
        table:'.',
        value:'.',
    },
    {
        table:'=',
        value:'=',
    },
    {
        table:'≥',
        value:'>=',
    },
];
export const jianceLianxu = {//速率
    101:[
        {
            table:'裂缝值(mm)',
            value:'value',
            class:'pjw_50',
            unit:'mm',
            fieldDesc:'裂缝值',
        },
        {
            table:'裂缝变形速率(mm/h、mm/d)',
            value:'value_rate',
            class:'pjw_100',
            unit:'mm/h、mm/d',
            fieldDesc:'裂缝变形速率',
        },
    ],
    102:[
        {
            table:'水平位移(mm)',
            value:'gps_total_x',
            class:'pjw_50',
            unit:'mm',
            fieldDesc:'水平位移',
        },
        {
            table:'垂直位移(mm)',
            value:'gps_total_y',
            class:'pjw_50',
            unit:'mm',
            fieldDesc:'垂直位移',
        },
        {
            table:'水平位移变形速率(mm/h、mm/d)',
            value:'gps_total_x_rate',
            class:'pjw_100',
            unit:'mm/h、mm/d',
            fieldDesc:'水平位移变形速率',
        },
        {
            table:'垂直位移变形速率(mm/h、mm/d)',
            value:'gps_total_y_rate',
            class:'pjw_100',
            unit:'mm/h、mm/d',
            fieldDesc:'垂直位移变形速率',
        },
    ]

}
export const guanbiTime = [104,106,302,303,304,314,401];//隐藏时间选择的监测类型

export const jianceleixingStr = '目前只可输入裂缝、地表位移、加速度、倾角、雨量、土壤含水率、泥水位、深部位移8种判据公式';
 // 现目前支持的监测类型

export const jianceType = {//所有的监测类型中文
    101:"裂缝",
    102:"地表位移",
    103:"深部位移",
    104:"加速度",
    105:"倾角",
    106:"振动",
    201:"应力",
    202:"土压力",
    203:"次声",
    204:"地声",
    301:"雨量",
    302:"气温",
    303:"土壤温度",
    304:"土壤含水率",
    305:"地表水温",
    306:"地表水位",
    307:"地下水温",
    308:"地下水位",
    309:"孔隙水温度",
    310:"孔隙水压力",
    311:"渗透压力",
    312:"流速",
    313:"沉降",
    314:"气压",
    401:"泥水位",
    402:"雷达",
};

export const objKey = (value, compare = (a, b) => a === b) =>{
    return Object.keys(jianceType).find(k => compare(jianceType[k], value))
}

export const panjuGongshi = {//所有的监测类型判据公式
    101:[//裂缝
        {
            value:"裂缝判据公式："
        },{
            value:'①位移变化量：裂缝值 >/=/< 20mm'
        },{
            value:'②一定时长内累计变化量：前3日 裂缝值 >/=/< 20mm'
        },{
            value:'③变形速率：前1时/日 裂缝变形速率 >/=/< 20mm/h或20mm/d'
        },{
            value:'④连续n日：前0~1日 裂缝变形速率 >/=/< 20mm/d 且 前1~2日 裂缝变形速率 >/=/< 20mm/d'
        }
    ],
    102:[//地表位移
        {
            value:"GNSS判据公式："
        },{
            value:'①位移变化量：水平位移/垂直位移>/=/< 20mm'
        },{
            value:'②一定时长内累计变化量：前3日 水平位移/垂直位移 >/=/< 20mm'
        },{
            value:'③变形速率：前1时/日 水平位移变形速率/垂直位移变形速率 >/=/< 20mm/h或20mm/d'
        },{
            value:'④连续n日：前0~1日 水平位移变形速率/垂直位移变形速率 >/=/< 20mm/d 且 前1~2日 水平位移变形速率/垂直位移变形速率 >/=/< 20mm/d'
        }
    ],
    103:[//深部位移--
        {
            value:'深部位移判据公式：'
        },{
            value:'①一定时长内累计变化量：前1日 滑动方向位移/垂直坡面方向位移 >/=/< 20mm'
        }
    ],
    104:[//加速度
        {
            value:'加速度判据公式：'
        },{
            value:'最新数据：加速度X/加速度Y/加速度Z >/=/< 0.5mg'
        }
    ],
    105:[//倾角
        {
            value:'倾角判据公式：'
        },{
            value:'①角度变化量：倾角X/倾角Y/倾角Z /AZI/angle >/=/< 5°'
        },{
            value:'②一定时长内累计变化量：前1时 倾角X/倾角Y/倾角Z/AZI/angle >/=/< 5°'
        },
    ],
    106:[//振动--
        // {
        //     value:'振动判据公式：'
        // },{
        //     value:'最新数据：SJX/SJY//SJZ＞/=/＜5mm'
        // },{
        //     value:'PLX/PLY/PLZ＞/=/＜5Hz'
        // },{
        //     value:'value/SJvalue＞/=/＜5mm'
        // }
    ],
    301:[//雨量
        {
            value:'雨量判据公式：'
        },{
            value:'①最新雨强数据触发：前1时/日 雨量 >/=/< 20mm'
        },
        // {
        //     value:'②连续3日有效降雨量系数：前0~24时雨量值 * 权重值 + 前24~48时雨量值 * 权重值 + 前48~72时雨量值 * 权重值 >/=/< 20mm'
        // }
    ],
    302:[//气温--
        // {
        //     value:'气温判据公式：'
        // },{
        //     value:'最新数据：气温 >/=/< 30 ℃'
        // }
    ],
    303:[//土壤温度--
        // {
        //     value:'土壤温度判据公式：'
        // },{
        //     value:'最新数据：土壤温度 >/=/< 20 ℃'
        // },
    ],
    304:[//土壤含水率
        {
            value:'含水率判据公式：'
        },{
            value:'最新数据：含水率 >/=/< 50%'
        }
    ],
    314:[//气压--
        // {
        //     value:'气压判据公式：'
        // },{
        //     value:'最新数据：气压测量值 >/=/< 10Kpa'
        // }
    ],
    401:[//泥水位
        {
            value:'泥水位判据公式：'
        },{
            value:'最新数据：泥水位值 >/=/< 10m'
        }
    ]
}

export const typeObj = {//所有的监测类型计算器对应按钮
    l1_lf:[//裂缝
        {
            table:'裂缝变形速率(mm/h、mm/d)',
            value:'value',
            class:'pjw_100',
            unit:'mm/h、mm/d',
            fieldDesc:'裂缝变形速率',
        },
        {
            table:'裂缝值(mm)',
            value:'value',
            class:'pjw_50',
            unit:'mm',
            fieldDesc:'裂缝值',
        },
        // {
        //     table:'裂缝切线角(°)',
        //     value:'value',
        //     class:'pjw_50',
        //     unit:'°',
        //     fieldDesc:'裂缝切线角',
        // },
        {
            table:'连续',
            value:'continuity',
            class:'pjw_50'
        },
    ],
    102:[//地表位移
        {
            table:'水平位移(mm)',
            value:'gps_total_x',
            class:'pjw_50',
            unit:'mm',
            fieldDesc:'水平位移',
        },
        {
            table:'垂直位移(mm)',
            value:'gps_total_y',
            class:'pjw_50',
            unit:'mm',
            fieldDesc:'垂直位移',
        },
        {
            table:'水平位移变形速率(mm/h、mm/d)',
            value:'gps_total_x_rate',
            class:'pjw_100',
            unit:'mm/h、mm/d',
            fieldDesc:'水平位移变形速率',
        },
        {
            table:'垂直位移变形速率(mm/h、mm/d)',
            value:'gps_total_y_rate',
            class:'pjw_100',
            unit:'mm/h、mm/d',
            fieldDesc:'垂直位移变形速率',
        },
        // {
        //     table:'水平位移切线角(°)',
        //     value:'before',
        //     class:'pjw_60',
        //     unit:'°',
        //     fieldDesc:'水平位移切线角',
        // },
        {
            table:'连续',
            value:'continuity',
            class:'pjw_35',
        },
        // {
        //     table:'垂直位移切线角(°)',
        //     value:'before',
        //     class:'pjw_60',
        //     unit:'°',
        //     fieldDesc:'垂直位移切线角',
        // }
    ],
    l1_sw:[//深部位移
        {
            table:'滑动方向(mm)',
            value:'disps_x',
            class:'pjw_50',
            unit:'mm',
            fieldDesc:'滑动方向',
        },
        {
            table:'垂直坡面方向(mm)',
            value:'disps_y',
            class:'pjw_60',
            unit:'mm',
            fieldDesc:'垂直坡面方向',
        }
    ],
    l1_js:[//加速度
        {
            table:'加速度X(mg)',
            value:'gx',
            class:'pjw_50',
            unit:'mg',
            fieldDesc:'加速度X',
        },
        {
            table:'加速度Y(mg)',
            value:'gy',
            class:'pjw_50',
            unit:'mg',
            fieldDesc:'加速度Y',
        },
        {
            table:'加速度Z(mg)',
            value:'gz',
            class:'pjw_50',
            unit:'mg',
            fieldDesc:'加速度Z',
        }
    ],
    l1_qj:[//倾角
        {
            table:'倾角X(°)',
            value:'x',
            class:'pjw_50',
            unit:'°',
            fieldDesc:'倾角X',
        },
        {
            table:'倾角Y(°)',
            value:'y',
            class:'pjw_50',
            unit:'°',
            fieldDesc:'倾角Y',
        },
        {
            table:'倾角Z(°)',
            value:'z',
            class:'pjw_50',
            unit:'°',
            fieldDesc:'倾角Z',
        },
        {
            table:'angle(°)',
            value:'angle',
            class:'pjw_50',
            unit:'°',
            fieldDesc:'angle',
        },
        {
            table:'AZI(°)',
            value:'azi',
            class:'pjw_50',
            unit:'°',
            fieldDesc:'AZI',
        }
    ],
    l1_zd:[//振动
        // {
        //     table:'SJX',
        //     value:'value',
        //     class:'pjw_30',
        // },
        // {
        //     table:'SJY',
        //     value:'value',
        //     class:'pjw_30'
        // },
        // {
        //     table:'SJZ',
        //     value:'value',
        //     class:'pjw_30'
        // },
        // {
        //     table:'PLX',
        //     value:'value',
        //     class:'pjw_30'
        // },
        // {
        //     table:'PLY',
        //     value:'value',
        //     class:'pjw_30'
        // },
        // {
        //     table:'PLZ',
        //     value:'value',
        //     class:'pjw_30'
        // },
        // {
        //     table:'value',
        //     value:'value',
        //     class:'pjw_30'
        // },
        // {
        //     table:'SJvalue',
        //     value:'value',
        //     class:'pjw_60'
        // }
    ],
    201:[//应力
        
    ],
    202:[//土压力
        
    ],
    203:[//次声
        
    ],
    204:[//地声
        
    ],
    l3_yl:[//雨量
        {
            table:'*',
            value:'',
            class:'pjw_50'
        },
        {
            table:'雨量值(mm)',
            value:'value',
            class:'pjw_50',
            unit:'mm',
            fieldDesc:'雨量值',
        },
        // {
        //     table:'连续3日有效降雨量系数',
        //     value:'before',
        //     class:'pjw_80',
        // },
    ],
    302:[//气温
        // {
        //     table:'气温(℃)',
        //     value:'value',
        //     class:'pjw_30',
        //     unit:'℃',
        //     fieldDesc:'气温',
        // },
    ],
    303:[//土壤温度
        // {
        //     table:'土壤温度(℃)',
        //     value:'value',
        //     class:'pjw_50',
        //     unit:'℃',
        //     fieldDesc:'土壤温度',
        // },
    ],
    304:[//土壤含水率
        {
            table:'含水率(%)',
            value:'value',
            class:'pjw_50',
            unit:'%',
            fieldDesc:'含水率',
        },
    ],
    305:[//地表水温
        
    ],
    306:[//地表水位
        
    ],
    307:[//地下水温
        
    ],
    308:[//地下水位
        
    ],
    309:[//孔隙水温度
        
    ],
    310:[//孔隙水压力
        
    ],
    311:[//渗透压力
        
    ],
    312:[//流速
        
    ],
    313:[//沉降
        
    ],
    314:[//气压
        // {
        //     table:'气压测量值(Kpa)',
        //     value:'value',
        //     class:'pjw_50',
        //     unit:'Kpa',
        //     fieldDesc:'气压测量值',
        // },
    ],
    401:[//泥水位
        {
            table:'泥位值(m)',
            value:'value',
            class:'pjw_50',
            unit:'m',
            fieldDesc:'泥位值',
        },
    ],
    402:[//雷达
        
    ],
}
