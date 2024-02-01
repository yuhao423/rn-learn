

import { View,Text,FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
// const note = require('../../../images/icon_1.png')
const TabConent = (props)=>{
    // const {index} = props
   return (
    <FlatList
    data={[]}
    renderItem={()=><Text>2</Text>}
    ListEmptyComponent={EmptyComponent(props)}
   ></FlatList> 
   )
}

const EmptyComponent = (props)=>{
    const note = require('../../assets/images/icon_1.png') 
    const bookmark  = require('../../assets/images/icon_2.png')
    const kudos = require('../../assets/images/icon_3.png') 
    const {tabIndex} = props
    switch (tabIndex) {
        case 1:
            return (
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={note} style={{width:180,height:180,marginBottom:10,}}></Image>
                    <Text style={{fontSize:16}}>用一句话，分享今天的快乐吧~</Text>
                    <TouchableOpacity>
                        <Text style={{width:70,height:30,borderWidth:1,borderColor:'#ccc',borderRadius:8,textAlign:'center',textAlignVertical:'center',marginTop:10,}}>去分享</Text>
                    </TouchableOpacity>
                </View>
            )
            break;
        case 2:
                return (
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Image source={bookmark} style={{width:180,height:180,marginBottom:10,}}></Image>
                        <Text style={{fontSize:16}}>快去收藏你喜欢的作品吧~</Text>
                        <TouchableOpacity>
                            <Text style={{width:70,height:30,borderWidth:1,borderColor:'#ccc',borderRadius:8,textAlign:'center',textAlignVertical:'center',marginTop:10,}}>去分享</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;   
        case 3:
                return (
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Image source={kudos} style={{width:180,height:180,marginBottom:10}}></Image>
                            <Text style={{fontSize:16}}>你还没有给作品点赞哦~</Text>
                            <TouchableOpacity>
                            <Text style={{width:70,height:30,borderWidth:1,borderColor:'#ccc',borderRadius:8,textAlign:'center',textAlignVertical:'center',marginTop:10,}}>去分享</Text>
                            </TouchableOpacity>
                        </View>
                )
                break;    
        default:
            break;
    }
}
export default TabConent 