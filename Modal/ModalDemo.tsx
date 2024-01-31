/**
 *  1. visible：控制Modal的展示与隐藏。
    2. children：渲染子项目内容，Modal有且只有一个根节点。
    3. onRequestClonse：安卓返回。用户按下Android设备的后退按键时触发。安卓专用。IOS关闭的话就得自己写一个组件来关闭。
    4. transparent：（bool）背景是否透明，设为true为透明。对于ui来说应该加上。
    5. statusBarTranslucent：（布尔值）状态栏透明，设为true为状态栏透明。对于ui来说应该加上。
    6. animationType：指定了Modal的动画方式。默认是'none'，一般使用'slide'或者'fade'，用的很多。
    7. onShow,onDismiss：（回调函数）onShow在Modal展示的时候会调用，onDismiss不兼容安卓。
    8. 背景动画（伏笔），之后介绍。
 * 
 */

    import {View,Text,Modal, StyleSheet,Button,SectionList, TouchableOpacity} from 'react-native'
    import React, { useEffect, useState } from 'react'
    import { SectionData } from '../SectionList/SectionData'
    
    const ModalDemo = ()=>{
        const [visible,setVisible] = useState(false)
       
        //renderItem
        const rednerItem = ({item,index})=>{
            return (
                 <Text style={styles.txt}>{item}</Text>    
            )
        }
         //头部组件
       const ListHeader = (
        <View style={{position:'relative'}}>
            <Text style={styles.header}>头部组件</Text>
                <TouchableOpacity
                    style={{position:'absolute',height:24,width:24,right:20,top:30}}
                    activeOpacity={0.5}
                    onPress={()=>setVisible(false)}
                 >
                    <Text>关闭</Text>
                 </TouchableOpacity>
        </View>
    )
        //空组件
        const ListEmpty = (
        <View style={styles.emptyWrapper}>
          <Text style={styles.empty}>暂无数据哦~</Text>
        </View>
        )
        //分组头部组件
        const renderSectionHeader = ({section})=>{
            
            // console.log(section)
            return <Text style={styles.sectionHeaderTxt}>{section.type}</Text>
        
        }
        //打开Modal
        const openModal = ()=>{
            setVisible(true)
        }
        //关闭Modal
        const closeModal = ()=>{
            setVisible(false)
        }
        return (
            <View style={styles.root}>
                {/* 正常的布局 */}
                <Button title='打开Modal' onPress={openModal} />
                <Modal
                    visible={visible}
                    onRequestClose={closeModal}
                    transparent={true}
                    statusBarTranslucent={true}
                    animationType='slide'
                    onShow={()=>console.log('onShow ...')}
                    onDismiss={()=>console.log('onDismiss ...')}
                >
                    <View style={styles.contents}>
                        <SectionList
                        // ref={sectionListRef}
                        style={styles.root}
                        sections={SectionData}
                        keyExtractor={(item,index)=>{
                           // console.log(item,index,'item')
                            return `${item}- ${index}`
                        }}
                        renderItem={rednerItem}
                        contentContainerStyle={styles.content}
                       
                        ListHeaderComponent={ListHeader}
                        ListEmptyComponent={ListEmpty}
                        renderSectionHeader={renderSectionHeader}
                        ItemSeparatorComponent={()=>{
                            return <View style={{width:'100%',height:1,backgroundColor:'#f3a9f4'}}></View>
                        }}
                        stickySectionHeadersEnabled
                        stickyHeaderIndices={[0]}
                        ></SectionList>
                    </View>
                </Modal>
            </View>
        )
    }
    
    export default ModalDemo
    
    
    const styles = StyleSheet.create({
        root:{
            width:'100%',
            height:400,
        },
        contents:{
            marginTop:200,
            width:'100%',
            height:400,
            backgroundColor:'yellow'
        },
        txt:{
            width:'100%',
            height:56,
            fontSize:20,
            // backgroundColor:'#f9c2ff',
            marginVertical:10
        },
        content:{
            paddingHorizontal:20,
            backgroundColor:'#f6f6f6'
        },
        header:{
            width:'100%',
            height:40,
            textAlign:'center',
            textAlignVertical:'center',
            marginTop:20,
            color:'red',
            backgroundColor:'#c0f6bf'
        },
        empty:{
            width:100,
            height:80,
            backgroundColor:'#fff',
            color:'darkslategray',
            textAlign:'center',
            textAlignVertical:"center"
        },
        emptyWrapper:{
            width:'100%',
            height:400,
            justifyContent:'center',
            alignItems:'center'
        },
        sectionHeaderTxt:{
            width:'100%',
            fontSize:30,
            height:30,
            backgroundColor:'#fff'
            // backgroundColor:'skyblue'
        }
    })