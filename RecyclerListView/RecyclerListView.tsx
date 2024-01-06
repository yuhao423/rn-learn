
import React, { useEffect, useRef, useState } from "react";
import {View,Dimensions, Pressable, Text, RefreshControl} from 'react-native'
import { RecyclerListView,DataProvider,LayoutProvider } from "recyclerlistview";
import {fetchData} from './tils'

const List = ({type,data})=>{

    switch (type) {
        case value:
            
            break;
    
        default:
            break;
    }
    return (
        <Pressable>
            <Text>{data.title}</Text>
        </Pressable>
    )
}


export const RecyclerListviewTest =()=>{

    enum Requeststatus {
        IDLE="IDLE",
        SUCCESS="SUCCESS",
        FAIL="FAIL",
        PENDING="PENDING"   
    }

    interface Item{
        title:string
        id:string  
    }
    type FetchData = Item[]

    const dp = new DataProvider((r1,r2)=> r1.id !== r2.id)
    const [requeststaus,setRequeststatus] =useState<Requeststatus>(Requeststatus.IDLE)
    const [loading,setLoading] = useState(false)
    const [dataProvider,setDataProvider] = useState(dp)
    const [noMoreData ,setNoMoreData] = useState(false)
    const dataRef = useRef([])

    useEffect(()=>{
        fetch('http').then(res=>res.json()).then(res=>{
            if(res.code ===200){
                setRequeststatus(Requeststatus.SUCCESS)
                let data = res.data
                dataRef.current = data
                setDataProvider(dp=>dp.cloneWithRows(data))
            }
        })
    })

    //LayoutProvider
    const {width} = Dimensions.get('window')
    const ViewTypes = {
        FULL:0,
        HALF_LEFT:1,
        HALF_RIGHT:2,
    }
    const _LayoutProvider = new LayoutProvider(index=>{
        if(index % 3 === 0){
            return ViewTypes.FULL
        }else if(index % 3 ===1){
            return ViewTypes.HALF_LEFT
        }else{
            return ViewTypes.HALF_RIGHT
        }
    },
    (type,dim)=>{
        switch (type) {
            case ViewTypes.HALF_RIGHT:
                dim.width = width /2 -1
                dim.height = 100
                break;
            case ViewTypes.HALF_LEFT:
                dim.width = width /2 -1 
                dim.height = 100
                break;
            case ViewTypes.FULL:
                dim.width = width 
                dim.height = 120
                break;
            default:
                dim.width = 0;
                dim.height = 0;
        }
    }

    )

    //rowRenderer
    const rowRenderer = (type,data,index)=>{
        return <List type={type} data={data}></List>
    }

    //handleRefresh
    const handleRefresh = async ()=>{
        if(!loading){
            setLoading(true)

            // let newData = await fetchData()
            fetch('http').then(res=>res.json()).then(res=>{
                // return res
                let newData = res.data
                if(newData && newData.length> 0){
                    
                }   
             })
            
        }
    }


    return (
        <RecyclerListView
        dataProvider={dataProvider}
        LayoutProvider={_LayoutProvider}
        rowRenderer={rowRenderer}
        scrollViewProps={{
            RefreshControl:(
                <RefreshControl 
                    title="加载"
                    refreshing={loading}
                    onRefresh={handleRefresh}
                />
            )   
            
        }}
        >
        </RecyclerListView>
    )
}
