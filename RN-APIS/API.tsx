







import { Button, View,Alert,Text,Dimensions, useWindowDimensions,Platform,StatusBar, StyleSheet, Linking, PixelRatio,BackHandler, PermissionsAndroid, Vibration,ToastAndroid } from "react-native";

import React,{useEffect} from "react";
// community
import {useBackHandler} from '@react-native-community/hooks'
const TestApi = ()=>{
    useEffect(()=>{
        const subscrittion = Dimensions.addEventListener('change',({window,screen})=>{
            console.log(window,screen);
            
        })
        // BackHandler.addEventListener('hardwareBackPress',handleBack)
        return ()=>{
            //取消监听
            subscrittion.remove()
            //有监听一定要取消监听
            // BackHandler.removeEventListener('hardwareBackPress',handleBack)
        }
    },[])

    useBackHandler(()=>{
        return true
    })


    const viewlayot =
         (
            <Text>23</Text>
            
        )
    
    console.log(viewlayot)
    const sty = {fontSize:20}
    //获取宽和高
    const {width,height} = useWindowDimensions()
                console.log(width,height);
    const pressBtn = async ()=>{
             // Alert.alert('few')
                // alert(true)
                // Alert.alert('标题','内容',[{text:'ty',onPress:()=>console.log(1)},{text:'hao',onPress:()=>console.log(222)}])
                // console.info('信息日志输出')
                // console.debug('debug日志输出')
                // console.warn('warn ...')
                // console.error('error')
                // console.log('我是%s,%d','ssbb',2)
                // console.log('%cwosshinide ','color:red;')
                // console.log(TestApi)


                //Dimensions
                // const {width,height,scale,fontScale} = Dimensions.get('screen')
                // // const {width,height} = useWindowDimensions()
                // console.log(width,height,scale,fontScale);
                
                //Platform
                // console.log(Platform.OS);      //什么平台
                // console.log(Platform.Version)  //平台版本
                // console.log(Platform.constants);
                // console.log(Platform.isPad);
                // console.log(Platform.isTV);
                // console.log(Platform.select({
                //     android:{paddingTop:StatusBar.currentHeight},
                //     ios:{paddingTop:20}
                // }));
                // const a = {a:1,b:2,c:{v:1,b:2}}
                // console.log({...a.c});  //浅拷贝
                // // console.log(...{a:1,b:2});
                    
                //StyleSheet
                // console.log(StyleSheet.absoluteFill,'ss');
                // const {top} = StyleSheet.absoluteFill
                // console.log(top,'top');
                // console.log(StyleSheet.hairlineWidth);
                
                //Linking
                // if(await Linking.canOpenURL('https://www.baidu.com/')){
                //     console.log(1);
                    
                //     Linking.openURL('https://www.baidu.com/')
                // }else{
                //     console.log(222);
                // }
                // Linking.openURL('geo:37.2122,12.222')
                // Linking.openURL('https://www.baidu.com/')
                // Linking.openSettings()
                
                //PixelRatio
                // console.log(PixelRatio.get(),Dimensions.get('window').scale);
                // console.log(PixelRatio.getPixelSizeForLayoutSize(200));// 200 * 屏幕密度 即 200 * Dimensions.get('window').scale
                
                //BackHandler 安卓物理返回值
                // BackHandler.addEventListener('hardwareBackPress',handleBack)
                // BackHandler.exitApp()

                //PermissionsAndroid
                // console.log(PermissionsAndroid.PERMISSIONS);  //安卓中的所有权限
                // const needPermission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                // PermissionsAndroid.check(needPermission).then(res=>{
                //     console.log(res);  //false
                //     if(!res){
                //         PermissionsAndroid.request(needPermission).then(res=>{
                //             console.log(res);
                //             // alert(res)
                //             if(res === 'never_ask_again'){

                //             }
                //         })
                //     }
                // })  //检查写入权限


                //Vibration 震动
                // Vibration.vibrate()  //不传默认400ms震动
                // // Vibration.vibrate(1000)  //震动1s
                // Vibration.vibrate([100,500,200,500],true) 

                //ToastAndroid
                // ToastAndroid.show('sb-yuyuho',1000)

                
                //transform

    }  


                // const handleBack = ()=>{
                //     console.log('back ...');
                    
                //     return true
                // }
    return (
        <View style={styles.root}>
            <Button title="按钮" onPress={pressBtn}
            ></Button>
            <Text style={[styles.root,sty]}>23</Text>

            <View style={styles.outView}>
                <View style={[styles.innerView,StyleSheet.absoluteFill]}></View>
            </View>

            <View style={styles.transform}></View>
        </View>
        
    )
}


export default TestApi

const styles = StyleSheet.create({
    // 根据移动端来选择样式
   root:{
    //展开运算符,把对象展开
    ...Platform.select({
        android:{paddingTop:StatusBar.currentHeight},
        ios: { paddingTop: 20 },
    }),
    fontSize:12,
   },
   outView:{
    // ...StyleSheet.absoluteFill,
    height:200,
    width:200,
    // backgroundColor:'yellow',
    position:'relative',
    marginTop:10,
    borderBottomColor:'red',
    borderBottomWidth:StyleSheet.hairlineWidth
   },
   innerView:{
    // ...StyleSheet.absoluteFill,
    height:100,
    width:100,
    // backgroundColor:'red'
   },
   transform:{
    marginTop:10,
    marginLeft:20,
    width:50,
    height:50,
    backgroundColor:'red',
    transform:[
        {translateX:100},
        {translateY:100},
        {scaleY:1.5},
        // {rotateX:'95deg'},
        // {rotateY:'30deg'},
        {rotateZ:'45deg'}  //旋转角度
    ]
   }
})
console.log(styles);
