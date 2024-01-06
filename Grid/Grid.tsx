

import { View,TouchableHighlight, Image, Text,ViewStyle,StyleProp, StyleSheet, Dimensions,ImageStyle  } from "react-native"
import React from 'react'   
/**
 * 接口设计
 * 1.设计需要多少列，由行来推导行,默认是5
 * 2.数据data,(必需)数组，包括title,icons,或者base64和每一个的回调函数
 * 3.整个组件Grid的外部样式(style)
 * 4.Item的外部样式
 * 5.icon的样式样式
 * 6.title的外部样式
 * 7.customGird 自定义渲染每个格子的内容,
 * @param props 
 * 
 * 
 * 
 * @returns 
 */
interface GridProps{
    data:Data,
    column?:Column,
    style?:StyleProp<ViewStyle>
    gridItemStyle?:StyleProp<ViewStyle>,
    iconStyle?:StyleProp<ViewStyle>,
    titleStyle?:StyleProp<ViewStyle>,
    customGird?: (index:number,item: DataItem) => React.ReactNode,
}
type Data = DataItem[]

interface DataItem{
    icon?:string,
    title?:string,
    onPress:(index:number,data:{icon?:string,title?:string})=>void,
}

type Column = number

interface GridItemProps{
    data:DataItem,
    index:number,
    column?:Column,
    gridItemStyle?:StyleProp<ViewStyle>,
    iconStyle?: StyleProp<ImageStyle>,
    titleStyle?:StyleProp<ViewStyle>,
    handleItemPress:(index:number,data:{icon?:string,title?:string})=>void
}

// interface 


export const Grid:React.FC<GridProps> = (props)=>{
    // const column = 5
    const {data,style,customGird,...resetProps} = props

    // console.log(renderItem,'renderItemrenderItem');
    


    console.log(props,'propssss');
    const handleItemPress = (index:number,data:{icon?:string,title?:string})=>{
        console.log(index,data,'handleItemPress');
        
        props.data[index].onPress(index,data)
    }
    
    // const items = data.map((item,index)=>(
    //     // 用剩余参数来传递给子组件
    //     <GridItem data={item} index={index} handleItemPress={handleItemPress} {...resetProps}></GridItem>
    // ))
    const items = customGird ? data.map((item,index)=>(
     
        customGird(index,item)
    )) : data.map((item,index)=>(
              // 用剩余参数来传递给子组件
         <GridItem data={item} index={index} handleItemPress={handleItemPress} {...resetProps}></GridItem>
    ))
    return (
        <View style={[styles.wrapper,style]}>{items}</View>
    )
    
}

const GridItem:React.FC<GridItemProps> = (props:GridItemProps)=>{
    console.log(props,'propsItem');
    
    const {data,index,column,gridItemStyle,iconStyle,titleStyle,handleItemPress} = props
    const {icon,title,onPress} = data
    const width = column? Dimensions.get('window').width / column : Dimensions.get('window').width / 5
    let height
    if(icon && title){
        height = 150 /2
    }else if(icon && !title){
        
        height = 120 /2
    }else{
        height = 80 /2
    }
    // const height = icon? 150 /2 : 80 /2 
    console.log(height,width);
    
    return (
        <TouchableHighlight
        activeOpacity={1}
        underlayColor='#ccc'
        key={index}
        onPress={()=>handleItemPress(index,{icon,title})}
        >
            {/* 给每一个GridItem 设置高度和宽度，使用了3个css变量 */}
            <View style={[styles.item,{width,height},gridItemStyle]}>
                {icon && <Image source={{uri:icon}} style={[styles.icon,iconStyle]}></Image>}
                {title && <Text style={[styles.text,titleStyle]}>{title}</Text>}
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    item:{
        // width:Dimensions.get('window').width / 5,
        // height:150 / 2,
        justifyContent:"center",
        alignItems:'center',
    },
    icon:{
        width:76 /2,
        height:76 /2,
        marginBottom:5,
        borderRadius:5,
    },
    text:{
        height:34 /2,
        fontSize:24 /2,
        color:"#333"
    }
    })