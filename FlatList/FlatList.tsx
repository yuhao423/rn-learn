/******
 * FlatList
 * 
 *  *data是必须项，只支持基本数组
 *  *renderItem是必须项 是里面的每一个组件项，接受三个参数(item,index,separators)
 *  keyExtractor 是为每一个组件项指定唯一的索引(item.index)=>index.toString() item是data数据中的每一项，用index的话建议转成字符串形式
 *  refreshControl 上拉刷新，里面用到了RefreshControl组件，通常搭配refreshing一起使用
 *  下拉加载：onEndReachedThreshold 指定距离，onEndReached到了触发指定的回调函数，ListFooterComponent指定最后一个组件，这个我选择的是ActivityIndicator加载组件
 */

let DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba23",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6323",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72se",
      title: "Third Item",
    },
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bawe",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63vr",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72rt",
        title: "Third Item",
      },
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bajyk",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63uyk",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d7267",
        title: "Third Item",
      },
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba;/",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63p;i",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72iiul",
        title: "Third Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63uyk",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d7267",
        title: "Third Item",
      },
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba;/",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63p;i",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72iiul",
        title: "Third Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63uyk",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d7267",
        title: "Third Item",
      },
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba;/",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63p;i",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72iiul",
        title: "Third Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63uyk",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d7267",
        title: "Third Item",
      },
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba;/",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63p;i",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72iiul",
        title: "Third Item",
      },
  ];
  let arr = Array(100).fill(1)
  console.log(arr);
  
  
  const FlatItem = ({title})=>{
    return (
       <View style={{width:200,height:100,backgroundColor:'red',margin:5}}>
        <Text>{title}</Text>
       </View>
    )
  }
  export const FastList = ()=>{
    const [refreshing,setRefreshing] = useState(false)
    const [lastLoading,setLastLoading] = useState(false)

    //每一个数组项
    const renderItem = ({item,index,separators})=>{
        console.log(item,index,separators); //item就是data中每一项的数据,index是索引
        
        return <FlatItem title={item.title}></FlatItem>
    }

    const onRefresh = ()=>{
        setRefreshing(true)

        setTimeout(() => {
          setRefreshing(false)
          alert('刷新成功')
        }, 500);
       
    }

    const endReached = (info)=>{
        console.log(info.distanceFromEnd);
        setLastLoading(true)

        setTimeout(() => {
          setLastLoading(false)
          alert('加载成功')
        }, 500);
    }
    return (
        <SafeAreaView style={{flex:1,marginTop:100}}>
            <Button title="重置" onPress={onRefresh} />
            <FlatList 
            data={DATA} 
            renderItem={renderItem}  
            keyExtractor={(item,index)=>index.toString()}
            // 上拉刷新
            refreshControl={
              <RefreshControl
                title={'loading'}
                colors={['red']}
                refreshing={refreshing}
                onRefresh={onRefresh}
              ></RefreshControl>
            }
            
          // 下拉加载
          onEndReachedThreshold={0.1}
          onEndReached={endReached}
          ListFooterComponent={
           <View style={{flex:1,width:200,height:100,display:"flex",justifyContent:'center',alignItems:'center'}}>
             <ActivityIndicator  animating={lastLoading} size={'large'}></ActivityIndicator>
           </View>
          }
            >

            </FlatList> 
    </SafeAreaView>
    )
  }
