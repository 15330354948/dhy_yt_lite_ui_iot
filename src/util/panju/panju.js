var fenxiSz = [],fenxi_index = 0,typeValue = 0,jianceTypeFormula = []

export function panjuComponents(val,type,leixing){
    jianceTypeFormula = leixing;
    fenxiSz = [];
    fenxi_index = 0;
    typeValue = type;
    var inputValue = val;
    inputValue = inputValue.replace(/\s+/g," ");//多个空格改为一个空格
    inputValue = inputValue.replace(/(^\s*)|(\s*$)/g, '');//去掉字符串两边的空格
    var valueArr = inputValue.split(" ");
    var arr = [];
    if(Number(valueArr[0]) > 0){
        return "noData";
    }
    for(var i=0;i<valueArr.length;i++){
        if(Number(valueArr[i])>-1 && Number(valueArr[i-1])>-1){
            arr[arr.length - 1] = arr[arr.length - 1] + valueArr[i];//把相邻的数字组合为一个数字
        }else{
            arr.push(valueArr[i]);
        }
    }
    var atr = [];
    var num_str = [];//数组
    var num_index = 0;//数组下标
    var num_value = 0;//数组值
    let arrList = ['>','<','=','≥','≤'];
    let huoqie = ["或","且"];
    for(var i=0;i<arr.length;i++){//把相邻的数字和小数点组合为一个数字
        if(arrList.indexOf(arr[i]) !== -1){
            num_value++;
            num_str[num_index] = num_value;
        }
        if(huoqie.indexOf(arr[i]) !== -1){
            num_index++;
            num_value = 0;
        }
        
        if(arr[i] == "."){
            atr[atr.length - 1] = atr[atr.length - 1] + arr[i] + arr[i+1];
            i++
        }else{
            atr.push(arr[i])
        }
    }
    for(var i=0;i<num_str.length;i++){
        if(num_str[i] > 1 || num_str[i] == 0){
            return "noData";
        }
    }
    if(atr.length == 1){
        return "noData";
    }else{
        atr.forEach(panjuFenxi)//遍历获取到的新数组
        for(var i=0;i<fenxiSz.length;i++){
            if(fenxiSz[i].field == undefined || fenxiSz[i].fieldDesc == undefined || fenxiSz[i].operator == undefined || fenxiSz[i].thresholdValue == undefined){
                return "noData";
            }
        }
        return fenxiSz;
    }
};

export function panjuFenxi(item,index,arr){
    if(fenxiSz[fenxi_index] == undefined){//每一次遍历新数组里面的当前值判断fenxiSz是否存在当前下标对象，如果没有，新建
        fenxiSz[fenxi_index] = {};
    }
    if(typeValue == 104 || typeValue == 106 || typeValue == 302 || typeValue == 303 || typeValue == 304 || typeValue == 314 || typeValue == 401){//没有时间格式的判据数据格式
        if(fenxiSz[fenxi_index].field == undefined){//判断条件是否为空
            for(var j=0;j<jianceTypeFormula.length;j++){
                if(item == jianceTypeFormula[j].table){
                    fenxiSz[fenxi_index].field = jianceTypeFormula[j].value;
                    fenxiSz[fenxi_index].unit = jianceTypeFormula[j].unit;
                    fenxiSz[fenxi_index].fieldDesc = jianceTypeFormula[j].fieldDesc;
                }
            }
        }
        //判断item值
        if(Number(item) >= 0){
            fenxiSz[fenxi_index].thresholdValue = item;
        }else if(item == "≥"){
            fenxiSz[fenxi_index].operator = ">="
        }else if(item == "≤"){
            fenxiSz[fenxi_index].operator = "<="
        }else if(item == "<"){
            fenxiSz[fenxi_index].operator = "<"
        }else if(item == ">"){
            fenxiSz[fenxi_index].operator = ">"
        }else if(item == "="){
            fenxiSz[fenxi_index].operator = "="
        }else if(item == "或"){
            fenxiSz[fenxi_index].joiner = "||"
            fenxi_index++;
        }else if(item == "且"){
            fenxiSz[fenxi_index].joiner = "&&"
            fenxi_index++;
        }
    }else{//有时间选择的判据格式
        if(fenxiSz[fenxi_index].field == undefined){//判断条件是否为空
            for(var j=0;j<jianceTypeFormula.length;j++){
                if(item == jianceTypeFormula[j].table){
                    fenxiSz[fenxi_index].field = jianceTypeFormula[j].value;
                    fenxiSz[fenxi_index].unit = jianceTypeFormula[j].unit;
                    fenxiSz[fenxi_index].fieldDesc = jianceTypeFormula[j].fieldDesc;

                    if(item.indexOf("速率") != -1){
                        fenxiSz[fenxi_index].rate = true;

                        if(fenxiSz[fenxi_index].min == undefined){
                            fenxiSz[fenxi_index].min = '0';
                            fenxiSz[fenxi_index].max = fenxiSz[fenxi_index].num;
                        }
                    }
                }
            }
        }else if(fenxiSz[fenxi_index].before == undefined && fenxiSz[fenxi_index].num == undefined && fenxiSz[fenxi_index].day == undefined && fenxiSz[fenxi_index].houre == undefined){//判断本json对象同时不存在4个参数，就判断赋值前一个json对象的3个值，如果前一个json对象不存在，则不赋值。
            // if(fenxi_index > 0){
            //     if(fenxiSz[fenxi_index - 1].before != undefined && fenxiSz[fenxi_index - 1].num != undefined){
            //         if(fenxiSz[fenxi_index - 1].day != undefined){
            //             fenxiSz[fenxi_index].before = fenxiSz[fenxi_index - 1].before;
            //             fenxiSz[fenxi_index].num = fenxiSz[fenxi_index - 1].num;
            //             fenxiSz[fenxi_index].day = fenxiSz[fenxi_index - 1].day;
            //         }else if(fenxiSz[fenxi_index - 1].houre != undefined){
            //             fenxiSz[fenxi_index].before = fenxiSz[fenxi_index - 1].before;
            //             fenxiSz[fenxi_index].num = fenxiSz[fenxi_index - 1].num;
            //             fenxiSz[fenxi_index].houre = fenxiSz[fenxi_index - 1].houre;
            //         }
            //     }
            // }
        }
        //判断item值
        if(item.indexOf("~") != -1){//判断连续传参
            fenxiSz[fenxi_index].min = item.split("~")[0];
            fenxiSz[fenxi_index].max = item.split("~")[1];
            fenxiSz[fenxi_index].range = true;
        }else{
            if(Number(item) >= 0){
                if(fenxiSz[fenxi_index].before != undefined && fenxiSz[fenxi_index].num == undefined && fenxiSz[fenxi_index].min == undefined){
                    fenxiSz[fenxi_index].num = item;
                }else if(fenxiSz[fenxi_index].num != undefined || fenxiSz[fenxi_index].num == undefined && fenxiSz[fenxi_index].range == true){
                    fenxiSz[fenxi_index].thresholdValue = item;
                }else if(fenxiSz[fenxi_index].before == undefined && fenxiSz[fenxi_index].num == undefined && fenxiSz[fenxi_index].day == undefined && fenxiSz[fenxi_index].houre == undefined){
                    fenxiSz[fenxi_index].thresholdValue = item;
                }
            }
        }
        if(item == "前"){
            fenxiSz[fenxi_index].before = true;
        }else if(item == "日"){
            fenxiSz[fenxi_index].day = true;
        }else if(item == "时"){
            fenxiSz[fenxi_index].houre = true;
        }else if(item == "≥"){
            fenxiSz[fenxi_index].operator = ">="
        }else if(item == "≤"){
            fenxiSz[fenxi_index].operator = "<="
        }else if(item == "<"){
            fenxiSz[fenxi_index].operator = "<"
        }else if(item == ">"){
            fenxiSz[fenxi_index].operator = ">"
        }else if(item == "="){
            fenxiSz[fenxi_index].operator = "="
        }else if(item == "或"){
            fenxiSz[fenxi_index].joiner = "||"
            fenxi_index++;
        }else if(item == "且"){
            fenxiSz[fenxi_index].joiner = "&&"
            fenxi_index++;
        }
    }
}