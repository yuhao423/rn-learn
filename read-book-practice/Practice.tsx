
/**
 * 1. 图片颜色设置用 tintColor:'red'
 * 2. 分组组件SectionList使用有所不同，我是在SectionList内部的头部组件上写title和关闭按钮。而其他则是在Modal组件内部，分组组件同级来写View组件写title和关闭按钮
 * 3. contentContainerStyle里面应该只设置一些paddingVertical这种属性，不应该设置width:'100%',height:'100%'
 * 4. tab切换的具体写法，（无动画版）见#116
 * 5. 页面状态栏的设置。在页面根节点下面设置一个状态栏StatusBar组件，见#39
 */
import { ImageBackground, StyleSheet, View,Text,Dimensions, Image, TouchableOpacity, Modal, StatusBar } from "react-native";
import React, { useState } from "react";
import SectionDemo from "./components/SectionDemo";
import TabConent from './components/TabContent'
// const bg = require('../../images/icon_bg.png')

const Practice = ()=>{
    const bg = require('../assets/images/icon_bg.png')
    const menu =require('../assets/images/icon_menu.png') 
    const share = require('../assets/images/icon_share.png')
    const atavatr =require('../assets/images/default_avatar.png')
    const add = require('../assets/images/icon_add.png')
    const code = require('../assets/images/icon_code.png')
    const sex = require('../assets/images/icon_male.png')
    const set = require('../assets/images/icon_setting.png')
    const [visible,setVisible] = useState(false)
    //tab切换的状态
    const [tabIndex,setTabIndex] = useState(1)
    const openModal = ()=>{
        setVisible(true)
    }
    //状态提升
    const closeModal = ()=>{
        console.log('sbsb')
        setVisible(false)
    }

// alert(JSON.stringify(Image.resolveAssetSource(set)))
    return (
             <View style={styles.root}>
                <StatusBar translucent barStyle='light-content' backgroundColor='transparent'></StatusBar>
            {/* 第一板块top */}
            <View style={styles.top}>
                <ImageBackground
                source={bg}
                imageStyle={styles.bgImgStyle}
                style={styles.viewStyle}
                >
                    <View style={styles.topWrapper}>
                       <View style={styles.operationWrapper}>
                        <Image source={menu} style={styles.menu}></Image>
                        <Image source={share} style={styles.menu}></Image>
                       </View>
                        <View style={styles.personInfo}>
                           <View style={{position:'relative'}}>
                            <Image source={atavatr} style={styles.avatar}></Image>
                            <Image source={add} style={styles.add}></Image>
                            
                            </View>
                          <View>
                           <Text style={styles.name}>{`大公爵`}</Text>
                           <Text style={styles.xiaohongshu}>小红书号：1882813 <Image source={code} style={styles.code}></Image></Text>
                          </View>
                        </View>
                        <Text style={styles.introduction}>点击关注，填写简介</Text>

                       <View style={styles.sexWrapper}><Image source={sex} style={styles.sex}></Image></View>
                        {/* 关注，粉丝等 */}
                       <View style={styles.topEnd}>
                       <View style={styles.focus}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                 style={{marginRight:20}}
                                 onPress={openModal}
                                
                            >
                              <View style={{justifyContent:'center',alignItems:'center'}}>
                              <Text style={styles.focsTxt}>{`123`}</Text>
                                <Text style={styles.focsTxt}>关注</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                 style={{marginRight:20}}
                                 activeOpacity={0.5}
                            >
                              <View style={{justifyContent:'center',alignItems:'center'}}>
                              <Text style={styles.focsTxt}>{`123`}</Text>
                                <Text style={styles.focsTxt}>粉丝</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                 style={{marginRight:20}}
                                 activeOpacity={0.5}
                            >
                              <View style={{justifyContent:'center',alignItems:'center'}}>
                              <Text style={styles.focsTxt}>{`123`}</Text>
                                <Text style={styles.focsTxt}>获赞与收藏</Text>
                              </View>
                            </TouchableOpacity>
                           
                        </View>
                        <View style={styles.editAndSet}>
                           
                            <TouchableOpacity   activeOpacity={0.5} style={styles.edit}><Text style={styles.editTxt}>编辑资料</Text></TouchableOpacity>
                            <TouchableOpacity   activeOpacity={0.5} style={styles.edit}>
                                {/* <Text style={styles.setting}> */}
                                    <Image source={set} style={styles.set}></Image>
                                {/* </Text> */}
                            </TouchableOpacity>
                        </View>
                       </View>
                    </View>
                </ImageBackground>
            </View>
            {/* 第二板块buttom */}
            <View style={styles.buttom}>
                {/* tab切换 */}
                <View style={styles.tabs}>
                   {/* 第一个tab */}
                   <TouchableOpacity activeOpacity={0.5} style={styles.tab} onPress={()=>setTabIndex(1)}>
                   <Text style={[styles.tabTxt ,tabIndex === 1 && styles.tabTxtSelected]} onPress={()=>setTabIndex(1)}>笔记</Text>
                   <View style={[styles.tabline,tabIndex !== 1 && styles.hideTabline]}></View>
                   </TouchableOpacity>
                   <TouchableOpacity activeOpacity={0.5} style={styles.tab} onPress={()=>setTabIndex(2)}>
                   <Text style={[styles.tabTxt ,tabIndex === 2 && styles.tabTxtSelected]} >收藏</Text>
                   <View style={[styles.tabline,tabIndex !== 2 && styles.hideTabline]}></View>
                   </TouchableOpacity>
                   <TouchableOpacity activeOpacity={0.5} style={styles.tab} onPress={()=>setTabIndex(3)}>
                   <Text style={[styles.tabTxt ,tabIndex === 3 && styles.tabTxtSelected]} >赞过</Text>
                   <View style={[styles.tabline,tabIndex !== 3 && styles.hideTabline]}></View>
                   </TouchableOpacity>
                </View>
                {/* tab切换的内容 */}
                <View>
                    <TabConent tabIndex={tabIndex}></TabConent>
                </View>
            </View>
           <View>
            {/* 第三板块modal框 */}
           <Modal
                visible={visible}
                transparent={true}
                animationType="slide"
                onRequestClose={()=>setVisible(false)}
                statusBarTranslucent={true}
            >
               <View style={{width:'100%',height:'100%'}}>
                    <View style={{width:'100%',height:'10%'}}><Text>列表</Text></View>
                    <SectionDemo closeModal={closeModal}></SectionDemo>
               </View>
            </Modal>
           </View>
        </View>
       
       
    )
}

export default Practice

const styles = StyleSheet.create({
    root:{
        width:'100%',
        height:'100%',
        flex:1
    },
    top:{
        width:'100%',
        height:Dimensions.get('window').height * 0.36,
        // backgroundColor:'yellow',
        // marginTop:10,
        // paddingTop:20,
    },
    bgImgStyle:{
        resizeMode:'cover',

    },
    viewStyle:{
        width:'100%',
        height:Dimensions.get('window').height * 0.36 ,
        // marginHorizontal:20,
        paddingTop:20,
    },
    topWrapper:{
       paddingHorizontal:20,

    },
    operationWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // backgroundColor:'yellow',
        marginTop:10
    },
    menu:{
        width:24,
        height:24
    },
    personInfo:{
        flexDirection:'row',
        marginTop:20,
    },
    avatar:{
        width:86,
        height:86,
        borderRadius:43
    },
    add:{
        width:20,
        height:20,
        borderRadius:10,
        position:'absolute',
        right:0,
        top:56,
    },
    name:{
        marginTop:10,
        fontSize:24,
        color:'#fff',
        marginLeft:8,
    },
    xiaohongshu:{
        // marginTop:20,
        fontSize:16,
        color:'#8d8e9c',
        marginLeft:8,
        marginTop:8,
    },
    code:{
        width:10,
        height:10
    },
    sexWrapper:{
        width:25,
        height:18,
        borderRadius:10,
        backgroundColor:'#787a8f',
        justifyContent:'center',
        alignItems:'center'
    },
    sex:{
        width:8,
        height:10,
       marginHorizontal:5,
       resizeMode:'center'
    },
    introduction:{
        marginVertical:15,
        color:'#fff',
        fontSize:18,
    },
    topEnd:{
        marginTop:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    focus:{
        flexDirection:'row',
        justifyContent:'space-between',

    },
    focsTxt:{
        color:'#fff',
        fontSize:18,
    },
    editAndSet:{
        flexDirection:'row',
        // marginLeft:30,
        // justifyContent:'space-between',
        // alignItems:'flex-end'
    },
    edit:{
        width:60,
        height:30,
        borderRadius:12,
        borderWidth:1,
        borderColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:5
    },
    editTxt:{
        color:'#fff',
        fontSize:14,
    },
    setting:{
        justifyContent:'center',
        alignItems:'center'
    },
    set:{
        width:16,
        height:16,
        resizeMode:'center',
        tintColor:'#ccc'
    },
    buttom:{
        width:'100%',
        height:Dimensions.get('window').height * (1-0.35),
        // flex:1,
        // backgroundColor:'yellow'
    },
    tabs:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:1,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        
    },
    // 某一个tab
    tab:{
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:15,
        marginVertical:10,
    },
    tabTxt:{
        fontSize:20,
        fontWeight:'bold',
        color:'#a7a7a7'
    },
    tabTxtSelected:{
        color:'#333'
    },
    tabline:{
        width:'70%',
        height:2,
        backgroundColor:'red'
    },
    hideTabline:{
        backgroundColor:'transparent'
    }
})