/**
 * 
 *  1. RefreshControl是一个受控组件，是下拉刷新的组件。是受到refreshing的控制的。常常用于FlatList、SectionList等无限加载的组件。
    2. refreshing的控制是由onRefersh控制的。
    3. ActivityIndicator是一个加载组件，也是受控组件。用animating来控制组件的加载与否。
    4. 下拉刷新和上拉加载的demo，用用事件和状态来控制的。
 *  
 * 
 * 
 * 
 */
import {FlatList,RefreshControl,ActivityIndicator} from 'react-native'
import {useState} from 'react'

const Demo = ()=>{
    const [refreshing,setRefreshing] = useState(false)
    const [animating,setAnimating] = useState(false)
      return (
      <FlatList
        //下拉刷新
       refreshControl={
         <RefreshControl
           //受控组件
           refreshing={refreshing}
           //事件
           onRefresh={
            ()=>{
               setRefreshing(true)
             //do request things ...
             setTimeout(()=>{
               setRefreshing(false)
             },1000)
            }
           }
           ></RefreshControl>
       } 

        //上拉加载
        onEndReachedThreshould={0.2} //比值
        //事件
        onEndReached={
          ()=>{
            setAnimating(true)
            //do request things ...
            setTimeout(()=>{
              setAnimating(false)
            },1000)
          }
        }
        ListfooterComponent={
          <ActivityIndicator 
            animating={animating}
            size='large'
          />
        }
       ></FlatList>
    )
  }
  export default Demo;
  