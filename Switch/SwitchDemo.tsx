
import {View,Text,FlatList, StyleSheet,RefreshControl,Switch} from 'react-native'
import React,{useRef,useEffect, useState,} from 'react';


const SwitchDemo = ()=>{
    const [switchVal,setSwitchVal] = useState(false)
    return (
        <View style={styles.root}>
            <Switch
                value={switchVal}
                onValueChange={(value)=>{
                    console.log(value);
                    setSwitchVal(prev=>!prev)
                }}
                trackColor={{true:'#a9e936',false:'#ccc'}}
                thumbColor='#fff'
            ></Switch>
        </View>
    )
}

export default SwitchDemo

const styles = StyleSheet.create({
    root:{
        width:'100%',
        height:'100%'
    }
})