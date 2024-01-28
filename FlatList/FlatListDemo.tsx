
    import {View,Text,FlatList, StyleSheet} from 'react-native'
    import React from 'react';
    
    function FlatListDemo() {

        const data = new Array(200).fill(1).map((_,index)=>index)

       const rednerItem = ({item,index})=>(
            <Text style={styles.txt}>{`item + ${index}`}</Text>
       )
       //头部组件
       const ListHeader = (
            <Text style={styles.header}>头部组件</Text>
       )
       //空组件
       const ListEmpty = (
          <View style={styles.emptyWrapper}>
              <Text style={styles.empty}>暂无数据哦~</Text>
          </View>
       )
       //行与行之间的分隔组件
    //    const ItemSeparatorComponent = (
    //        <View style={styles.itemSeparatorComponent}></View>
    //    )
        return (
           <FlatList
           style={styles.root}
           data={data}
           renderItem={rednerItem}
           keyExtractor={(_,index)=>`item-${index}`}
           contentContainerStyle={styles.contentStyle}
           ListHeaderComponent={ListHeader}
           ListEmptyComponent={ListEmpty}
        //    ItemSeparatorComponent={
        //     <View style={styles.itemSeparatorComponent}></View>
        //    }
           initialNumToRender={8}
           numColumns={1}
           onViewableItemsChanged={(info)=>{
            const {viewableItems} = info
            console.log(viewableItems);
           }} 
           ></FlatList>
        );
    }
    const styles = StyleSheet.create({
        root:{
            height:400,
            width:'100%',
            
        },
        txt:{
            fontSize:24,
            color:'skyblue',
            height:56,
            width:'100%'
        },
        contentStyle:{
            backgroundColor:'#f6f6f6',
            paddingHorizontal:20
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
        itemSeparatorComponent:{
            width:'100%',
            height:1,
            color:'red'
        }
    })
    export default FlatListDemo;