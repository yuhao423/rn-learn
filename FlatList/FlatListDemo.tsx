/**
 * 1. 必需的data、renderItem、keyExtractor。data只支持普通数组。renderItem是每一个循环的是什么组件。keyExtractor是为循环指定key值，返回类型为(item,index)=>string为string类型。
 * 2. FlatList是继承ScrollView的，所以ScrollView可以用的属性和方法，FlatList也可以使用。
 * 3. ListHeaderComponent：头部组件，ListFooterComponent：尾部组件，ListEmptyComponent：空组件。ItemSeparatorComponent：行与行的分隔线组件。不会出现在第一行之前和最后一行之后。
 * 4. initialNumToRender：（number）指定一开始渲染的元素数量，最好刚刚填满一个屏幕。而且这些元素不会被回收。
 * 5. numColumns：（number）多列布局，还不支持瀑布流布局。
 * 6. onViewableItemsChanged：（回调函数）(info)=>{consolo.log(info.viewableItems)}展示哪些元素可见返回和变化频率。
 * 7. getItemLayout：可选的优化，前提是你可以提前知道内容的高度。行高固定的话，建议写上去。基本用法：(data,index)=>({length:ITEM_HEIGHT,offset:ITEM_HEIGHT*index,index})。data是数据源，index是数据源的索引。
 * 8. api:scrollToIndex()：滚动到指定元素。scrollToOffset()：滚动到指定距离。scrollToEnd()：滚动到底。FlatListRef.current?.scrollToIndex({index:20,viewPositon:0.5})index表示滚动到数据的哪个索引，viewPostion表示滚到哪个位置，顶部，中央还是底部。
 */
import {View,Text,FlatList, StyleSheet} from 'react-native'
import React,{useRef,useEffect} from 'react';

function FlatListDemo() {

    interface RenderItem{
        item:number,
        index:number
    }
    //data
    const data = new Array(100).fill(1).map((_,index)=>index)

    //ref
    const FlatListRef = useRef<FlatList>(null)

    //useEffect
    useEffect(()=>{
        setTimeout(() => {
            //scrollToIndex
            // FlatListRef.current?.scrollToIndex({
            //     index:20,
            //     viewPosition:1
            // })
            //scrollToOffset
            // FlatListRef.current?.scrollToOffset({
            //     offset:800,
            //     animated:true
            // })
            //scrollToEnd
            FlatListRef.current?.scrollToEnd({
                animated:true
            })
        }, 1000);
    },[])

   

   const rednerItem = ({item,index}:RenderItem)=>(
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
       ref={FlatListRef}
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
    //    onViewableItemsChanged={(info)=>{
    //     const {viewableItems} = info
    //     console.log(viewableItems);
    //    }} 
        getItemLayout={(data,index)=>(
            // console.log(data),
            {length:56,offset:56*index,index}
        )}
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