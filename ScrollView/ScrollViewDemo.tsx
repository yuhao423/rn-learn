

import {View,Image, ScrollView,StyleSheet,Text,TextInput,NativeSyntheticEvent, NativeScrollEvent,ScrollViewProps, Button } from 'react-native'
import React,{useRef,useState} from 'react'
// import styles from '../../../components/styles'

const ScrollViewDemo = ()=>{
    type Point = {
        x:number,
        y:number
    }
    const contentOffset  = useRef<Point>({x:0,y:0})
    const ScrollViewRef = useRef<ScrollView>(null)

    return (
        <ScrollView style={styles.root}
        ref={ScrollViewRef}
        contentContainerStyle={styles.contentStyle}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled'
        onMomentumScrollBegin={()=>console.log('onMomentumScrollBegin ...')}
        onMomentumScrollEnd={()=>console.log('onMomentumScrollEnd ...')}
        onScroll={(e:NativeSyntheticEvent<NativeScrollEvent>)=>console.log(e.nativeEvent.contentOffset.y)}
        overScrollMode='auto'
        contentOffset={contentOffset.current}
        stickyHeaderIndices={[0]}
        >
            <TextInput style={{backgroundColor:'#fff'}}></TextInput>
            <Text style={styles.txt} onPress={()=>console.log('onPress ...')}>1</Text>
            <Text style={styles.txt}>1</Text>
            <Text style={styles.txt}>1</Text>
            <Text style={styles.txt}>1</Text>
            <Text style={styles.txt}>1</Text>
            <Text style={styles.txt}>1</Text>
            <Text style={styles.txt}>1</Text>
            <Text style={styles.txt}>1</Text>
            <Text style={styles.txt}>1</Text>
            <Button title='回到顶点' onPress={
                ()=>ScrollViewRef.current?.scrollTo({x:0,y:0,animated:true})
            }></Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root:{
        width:'100%',
        height:300,

    },
    contentStyle:{
        paddingHorizontal:20,
        backgroundColor:'#ccc',
        paddingVertical:20,
    },
    txt:{
        fontSize:26,
        marginTop:20,
        width:'100%',
        height:50,
        // textAlign:'center'
        
    }
})
export default ScrollViewDemo