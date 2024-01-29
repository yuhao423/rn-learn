/**
 * 
 * 
 * 1. 必需的sections、rednerItem、keyExtractor。sections：是数组，里面是一个一个的对象。对象里面必须有个key是data。rednerItem：(item,index)=>React.JSX.Element，其中item是data数组。       keyExtractor：(item,index)=>string，item也是data中的数据。
   2. 从ScrollView继承过来的，基本上都可以使用。
   3. ListHeaderComponent，ListFooterComponent，ListEmptyComponent，ItemSeparatorComponent等等都是像FlatList一样可以使用的。查看官网就行。
   4. renderSectionHeader：分组头部。({section})=>(<Text>{section.type}</Text>)。info解构出section,将我们数据的type当做分组头部组件。
   5. stickySectionHeadersEnabled：有分组组件的时候是否开启分组吸顶。用的还是蛮多的。
   6. api：scrollToLocation()，滚动到你想滚动的距离。scrollToLocation({sectionIndex:1,itemIndex:4,viewPostion:0})
 * 
 * 
 * 
 */

   import {View,Text,SectionList, StyleSheet, NativeScrollEvent,NativeSyntheticEvent} from 'react-native'
   import { SectionData } from './SectionData'
   import { useEffect, useRef } from 'react'
   
   const SectionListDemo = ()=>{
       // const data = SectionData
       type PersonData =  string[]
       interface RenderItem {
           item: PersonData,
           index:number,
          
       }
       const sectionListRef= useRef<SectionList>(null)
       //useEffect
       useEffect(()=>{
           setTimeout(()=>{
               sectionListRef.current?.scrollToLocation({
                   sectionIndex:1,
                   itemIndex:4,
                   viewPosition:0
               })
           },1000)
       },[])
       const rednerItem = ({item,index}:RenderItem)=>{
           return (
               <Text style={styles.txt}>{item}</Text>
           )
       }
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
       //分组头部组件
       const renderSectionHeader = ({section})=>{
           
           console.log(section)
           return <Text style={styles.sectionHeaderTxt}>{section.type}</Text>
       
       }
   
   
   
           return (
               <SectionList
               ref={sectionListRef}
               style={styles.root}
               sections={SectionData}
               keyExtractor={(item,index)=>{
                   // console.log(item,index,'item')
                   return `${item}- ${index}`
               }}
               renderItem={rednerItem}
               contentContainerStyle={styles.content}
               onScroll={(e:NativeSyntheticEvent<NativeScrollEvent>)=>{
                   console.log(e.nativeEvent.contentOffset.y)
               }}
               ListHeaderComponent={ListHeader}
               ListEmptyComponent={ListEmpty}
               renderSectionHeader={renderSectionHeader}
               ItemSeparatorComponent={()=>{
                   return <View style={{width:'100%',height:1,backgroundColor:'#f3a9f4'}}></View>
               }}
               stickySectionHeadersEnabled
           ></SectionList>
           )
           
   }
   
   export default SectionListDemo
   
   const styles = StyleSheet.create({
       root:{
           width:'100%',
           height:400
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