export default {
    namespaced:true,
    state:{
        rowId:'',  //监测点id
        dangerAreaList:[
            // {
            //     "disasterId": 0,
            //     "disasterScopeDatas": [
            //         {
            //         "color": "",
            //         "disasterScopeId": 0,
            //         "id": 0,
            //         "lineType": 0,
            //         "lineWidth": 0,
            //         "longitudeLatitudeAltitude": "",
            //         "sort": 0
            //         }
            //     ],
            //     "id": 1,
            //     "link": "",
            //     "name": "隐患1",
            //     "sort": 1,
            //     "type": 0,
            // }
        ]
	
    },
    mutations:{
        setRowIdMut(state,id){
            state.rowId = id
        },
        setDangerAreaList(state,list){
            state.dangerAreaList = list
        },
        addDangerAareMut(state,obj){
            state.dangerAreaList.push(obj)
        },
        editDangerAareMut(state,{idx,attr,val}){
            state.dangerAreaList[idx][attr] = val
        }
    }
}