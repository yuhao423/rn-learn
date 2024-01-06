## recyclerListView

---
highlight: arduino-light
theme: juejin
---
## 背景
最近公司在写RN页面中，许多页面都用到了宫格类型的样式，比较典型的就是美团的这种类型。上面icon，下面title，可以左右滑动，这个任务也是交到了我手上。在经过一段时间的摸索后，也是勉勉强强的写出来了。本篇文章就带着大家一起一步一步来封装一个可用的Grid组件。

![e64ffd02e6839989e8b3a6066ebf1f83_raw.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b69416415844d04b605375c074a6a77~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=826&h=504&s=6379271&e=gif&f=332&b=fbfafe)

阅读本文前，你需要具有一定RN基础，官网就是最好的学习地方。另外推荐一个网站，上面有着大佬对于RN的一些思考与沉淀，十分推荐！<https://todoit.tech/>
## 目标
  我们的目标是创建一个可复用，功能良好的```Grid``` 组件，而目标的首要是设定好一些props来定制该组件的外观和行为。下面是我为```Grid``` 组件设计的一些接口：
- ```column```：给组件定义需要多少**列**，然后由**列**来推导**行**。可选，不传默认按照美团的5列
- ```data```：数组data，里面是一个个的对象。对象包括**icon**，**title**，和回调函数**onPress**。**必需**
- ```style``` ：整个Grid组件的样式。可选
- ```gridItemStyle```：Grid组件中每一个item组件的样式。可选
- ```iconStyle``` ：icon（图片或者base64）的样式。可选
- ```titleStyle``` ：title（文字title）的样式。可选
- ```customGird```：自定义渲染Grid里面的内容。可选

补充一下：数据**data**中，里面的icon或者title都是可选的。下文会给出详细的使用方法；**customGrid**的类型定义为```（index,item）=>React.ReactNode```。在代码中会给出上述props的所有类型约束。

## 基础

### 步骤一 创建Grid父组件
```tsx
    //创建Grid.tsx的组件文件
    import {View,ViewStyle,StyleProp,StyleSheet} from 'react-native'
    import React from 'react'
    //定义类型
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
    
    //创建Grid组件
    export const Grid:React.FC<GridProps> = (props)=>{
    //从props里面解构出data,style,和customGird
    const {data,style,customGird,...resetProps} = props
        
       return (
       <View style={[styles.wrapper,style]}></View>
       )
    }
    
    //创建样式
    const styles = StyleSheet.create({
        wrapper:{
            flexDirection:'row',
            flexWrap:'wrap'
        }
    })
    
```
从上面的代码，我们仅仅就是创建了一个叫做Gird的组件，并给这个组件给了一个叫做```wrapper```的样式，让他排不下了就换行和左右排列，并且我们可以通过props传入的```style```来改变Grid的样式，比如给Grid组件设置宽和高等等。注意：
### 步骤二 创建GirdItem子组件
接下来，我们应该写的是Grid中每一个Item的组件，即```GridItem```。然后由props中的data来决定有多少个```GridItem```和多少行。新增代码如下：
```tsx
//新增GridItemProps类型
interface GridItemProps{
    data:DataItem,
    index:number,
    column?:Column,
    itemStyle?:StyleProp<ViewStyle>,
    iconStyle?: StyleProp<ImageStyle>,
    titleStyle?:StyleProp<ViewStyle>,
    handleItemPress:(index:number,data:{icon?:string,title?:string})=>void
}

//新增GridItem组件
const GridItem:React.FC<GridItemProps> = (props)=>{

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
                {title && <Text style={[styles.title,titleStyle]}>{title}</Text>}
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
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
    title:{
        height:28 /2,
        fontSize:24 /2,
        color:"#333"
    }
    })

```

在```GridItem```组件中，我采用的是react native核心组件中的**TouchableHighlight**作为```GridItem```的外壳（*wrapper*），它提供了一系列的触控反馈，比如点击高亮。从而有利于用户交互。对于图片我采用的是原生组件**Image**，它在处理网络和base64图片时则必须指定宽和高。对于rn核心组件的学习，请参考官网[：](url)https://www.reactnative.cn/docs/components-and-apis 。在上面代码中，我给每一个```GridItem```都设定了宽和高，```Dimensions.get('window').width```指的是获取当前屏幕的宽度，在父组件Grid没有传递**column**时，默认是5列。还有一点值得注意的是，每一个子组件点击都应该有回调函数，这里我采用的是点击？？？

### 步骤三 改造父组件Grid
子组件都写好了，父组件只有一个外壳，没有利用数据data来循环创建子组件。那怎么行。不过也不困难，只要略做修改就行。
```tsx

export const Grid:React.FC<GridProps>= (props) =>{
    const {data,style,customGird,...resetProps}  = props
    //处理每一个子组件的点击事件
    const handleItemPress = (index:number,data:{icon?:string,title:string})=>{
    console.log(inde,data,'handleItemPress')
        props.data[index].onPress(index,data)
    }
   const items = customGird?data.map((item,index)=>(
       customGird(index,item)
   )) : data.map((item,index)=>(
       //用剩余参数来传递给子组件
       <GridItem data={item} index={index} handleItemPress={handleItemPress} {...resetProps} />
   )) 
   
   return (
       <View style={[styles.wrapper,style]}>{items}</View>
   )
}

```
步骤三我们只做了2件事情，**第一件事情**就是判断```customGrid```是否存在，存在的话，则使用```customItem```函数来渲染里面的每一个项目，否则的话就使用默认的```GridItem```组件。注意的是，如果你传递了```customItem```，那么里面的子节点全部都是完全自定义。同时，传递的（gridItemstyle，iconStyle，titleStyle，column）props就会失效。**第二件事情**就是处理了每一个子组件的点击事件。我们注意到，在步骤二代码的第25行代码：``` onPress={()=>handleItemPress(index,{icon,title})}```中，给每一个子组件的**TouchableHighlight**都给了一个onPress的点击事件，意味着只要点击了每一个```GirdItem```组件，都会触发```handleItemPress```函数，并且将该子组件的**index，{icon,title}参数带出来。** 于是我们将```hanleItemPress```函数提升到父组件中，并让他触发数据**data**中回调函数```onPress```，并携带参数。

### 使用案例
1. 基础使用：
  ```tsx
    //数据源，假设这是后端返回的数据,这里数据太长了，我用*9代替
     const GridDemoData = [
        {
        // url or base64
        icon: 'https://yuyuss.asia/boge.png',
        title: 'bogenmsl',
        onPress: (index,{icon,title}) =>  //这是回调函数
          console.log(index,{icon,title}),
       },
       ...
       *9
       //长度为9
    ]
    <Grid data={GridDemoData} />
    
  ```

结果：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fa3dc630a8e48ca969dbd42865ba70e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=401&h=298&s=55819&e=png&b=f5f5f5)

只传递data,默认5列，根据GridDemoData的长度确定行数。点击某一个GridItem,控制台会输出```onPress```回调函数中的index，icon和title。

2. 只有title的案例

```tsx
    //数据源，假设这是后端返回的数据,这里数据太长了，我用*9代替
     const GridDemoData = [
        {
        //没有icon
        title: 'bogenmsl',  
        onPress: (index,{icon,title}) =>  //这是回调函数
          console.log(index,{icon,title}),
       },
       ...
       *9
       //长度为9
    ]
    <Grid data={GridDemoData} />
    
  ```

结果：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75748c91f8194f18a36993f17b4b8972~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=401&h=215&s=20174&e=png&b=f7f7f7)

仍然只传递data，但是数据中没有icon，只有title的显示结果。

3. 自定义案例（列为4，每一个GridItem有下和右borderWidth）

 ```tsx
    //数据源，假设这是后端返回的数据,这里数据太长了，我用*8代替
     const GridDemoData = [
        {
        // url or base64
        icon: 'https://yuyuss.asia/boge.png',
        title: 'bogeV50',
        onPress: (index,{icon,title}) =>  //这是回调函数
          console.log(index,{icon,title}),
       },
       ...
       *8
       //长度为8
      ]
       <Grid column={4} data={GridDemoData} gridItemstyle={{borderRightWidth:1,borderBottomWidth:1,borderColor:'#ccc'}} />

  ```

结果：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7de037cf2da4cc799204fd7183c9ecd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=401&h=299&s=51707&e=png&b=f5f5f5)

这里我们自定义了列数为4，并且给每一个```GridItem```都加了一个下和右边框。

## 扩展

到这里，我们的```Grid```组件就封装好了，但是距离美团的滑动滚动仍然有一点距离，我们的页面还是不能左右滑动。因此我们需要选择一个滑动组件包裹我们的Grid组件。在RN中，滑动组件有许多，比如核心组件中的```ScrollView```，```FlatList```。社区github提供的 [ recyclerListView](https://github.com/Flipkart/recyclerlistview) 和 [react-native-masonry-list](https://github.com/hyochan/react-native-masonry-list)。他们的具体区别这里我就不一一对比了，但是底层用的都是```ScrollView```。这里我们选择的是```ScrollView```。因为图标通常来说不是很多，可以一次性可以全部加载。我们直接看代码
```tsx
const Icons = ()=>{
   const [index,setIndex] = useState(0)
   
   //获取屏幕宽度
   const maxWidth = Dimensions.get('window').width
   //处理翻页
    const handleScroll= (e:NativeSyntheticEvent<NativeScrollEvent>)=>{
        console.log('触发',e.nativeEvent.contentOffset.x,maxWidth);
        
        if(e.nativeEvent.contentOffset.x + 1 < maxWidth){
          console.log(0);
          setIndex(0)
        }else{
          console.log(1);
          setIndex(1)
        }
    }
   
   //数据源，假设这是后端返回的数据,这里数据太长了，我用*10代替
     const GridDemoData = [
        {
        // url or base64
        icon: 'https://yuyuss.asia/boge.png',
        title: 'bogeV50',
        onPress: (index,{icon,title}) =>  //这是回调函数
          console.log(index,{icon,title}),
       },
       ...
       *10
       //长度为10
      ]
      
  return (
  <View style={{marginTop:20,height:180,backgroundColor:'skyblue'}}>
          <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} style={{flex:1}} onMomentumScrollEnd={(e)=>{handleScroll(e)}}
          >
            <Grid  style={{height:80,width:Dimensions.get('window').width}}   data={GridDemoData}></Grid>
            <Grid  style={{height:80,width:Dimensions.get('window').width}}  iconStyle={{borderRadius:1}} data={GridDemoData} ></Grid>
        </ScrollView>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', transform:[{translateY:-5}]}}>
          <View style={index===0?styles.active:styles.gray}></View>
          <View style={index===1?styles.active:styles.gray}></View>
        </View>
  </View> 
  ) 
}

const styles = StyleSheet.create({
  contentContainer:{
    marginVertical: 12,
    // backgroundColor:'yellow',
  },
  active:{
    height:6,width:20,backgroundColor:'#ec5b45',borderRadius:5,marginRight:5
  },
  gray:{
    height:6,width:10,backgroundColor:'#a9a9a9',marginRight:5,borderRadius:2
  }
})
```
结果：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/979cd92e41d148b1be449fbc052f0df7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=401&h=282&s=59465&e=png&b=86ccea)
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ae8f17213ad43ceb880dc5be7a2c38c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=401&h=291&s=59978&e=png&b=86ccea)
    
这里有几点需要说明：
1. 使用```ScrollView```组件时，我们通常不会指定```ScrollView```的宽和高，而是给它的父组件设置宽和高。而且会在```ScrollView```的样式上加一个```flex:1```，使得它撑满整个父组件。而且**父组件的高度应该高于Grid设置的高度*个数**， 不然高度不够，会发生截取。关于```ScrollView```的其他属性和方法，你应该参考官网进行学习。
2. 这里处理翻页我只是简单的实现了一下，简单判断一下滑动的偏移量x是不是大于整个屏幕的宽度，大于的话就认为翻页，改变状态，给View不同的样式。社区github应该有更好的处理办法[：React Native Tab View](https://reactnavigation.org/docs/tab-view/)。




















