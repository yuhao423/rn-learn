

import { View,SectionList, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {SectionData } from '../../constants/SectionData'
    interface SectionDemoProps {
        closeModal:()=>void
    }
    type Data = string[]
    interface SectionData {
        type:string,
        data:Data
    }
    const SectionDemo = (props:SectionDemoProps)=>{
    const close = require('../../assets/images/icon_close_modal.png')
        const {closeModal} = props

       
        const renderItem = ({item,index})=>{
            return (
                <Text style={styles.txt}>{item}</Text>
            )
        }
        //头部组件
        const ListHeader = (
            <View style={styles.header}>
                <Text style={styles.headTxt}>粉丝列表</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={closeModal} style={{width:20,height:20,backgroundColor:'red'}}><Image source={close} style={styles.close}></Image></TouchableOpacity>
                {/* <Text><Image source={close} style={styles.close}></Image></Text> */}
            </View>
        )
        //分组头部组件
        const SectionHeader = ({section})=>{
            return (
                <Text style={styles.sectionheader}>{section.type}</Text>
            )
        }
        return (
            <SectionList
                sections={SectionData}
                style={styles.root}
                contentContainerStyle={styles.content}
                renderItem={renderItem}
                keyExtractor={(item,index)=>`${item}-${index}`}
                ListHeaderComponent={ListHeader}
                renderSectionHeader={SectionHeader}
                stickySectionHeadersEnabled={true}
                //吸顶元素
                // stickyHeaderIndices={[0]}
            >
            </SectionList>
        )
    }
    
export default SectionDemo
const styles = StyleSheet.create({
    root:{
        width:'100%',
        height:'100%',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        backgroundColor:'#fff'
    },
    content:{
        //在contentContainerStyle里面应该只设置一些paddingVertical这种，不应该设置width:'100%',height:'100%'
        // width:'100%',
        // height:'100%'
    },
    txt:{
        marginLeft:10,
        height:40,
        width:'100%',
        fontSize:20,
        textAlignVertical:'center'
    },
    header:{
        flexDirection:'row',
        position:'relative',
        // flexDirection:'row'
    },
    headTxt:{
        width:'100%',
        height:40,
        // backgroundColor:'red',
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:20,
        fontWeight:'bold'
    },
    sectionheader:{
        width:'100%',
        height:40,
        backgroundColor:'#ccc',
        fontSize:20,
        paddingLeft:10,
        textAlignVertical:'center'
    },
    close:{
        position:'absolute',
        width:24,
        height:24,
        right:30,
        top:8,
    }
})