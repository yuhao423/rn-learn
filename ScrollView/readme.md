### ScrollView
```tsx
export ScrollViewDemo = ()=>{

	const listData = ()=>{
    const arr = []
    for(let i=0;i<10;i++){
      arr.push(<Text>{'item' + i}</Text>)
    }
    //需要返回
    return arr
  }
 return (
   // paddingHorizontal:水平的左右padding
    <ScrollView contentContainerStyle={{paddingHorizontal:20}}>
      {listData()}
    </ScrollView>
 )
}
```


1. 创建ScrollView子节点的三种方式；
2. `contentContainerStyle`:样式，**这些样式会应用到一个内层的内容容器上，所有的子视图都会包裹在内容容器内。用的还是蛮多的。**
3. `keyboardDismissMode`：滚动键盘是否消失，'none':表示不消失，键盘一直在，'on-drag'：表示拖拽的时候消失。
4. `keyboardSholudPersistTaps`：当前页面有软键盘，点击scrollview后是否收起软键盘。一共3个值。'nerver'：（默认值）点击TextInput以外的子组件会使当前的键盘收起，但是子元素不会收到点击事件。'always'：键盘不会自动收起。**'handled'：开发常用，如果某一个子元素有点击事件，点击该子元素会触发，并且键盘不会自动收起。**
5. `onMomentumScrollBegin/End`：滚动开始与结束。
6. `onScroll`：滚动距离监听。`onScroll={(e:NativeSyntheticEvent<NativeScrollEvent>)=>consolo.log(e.nativeEvent.contentOffset.y)}`监听y轴的滚动距离（偏移量）y。
7. `overScrollMode`：超出滚动的时候是否可以弹一下。'auto'：（默认值）允许在内容超出视图可以弹一下。'always'：不管尺寸，始终可以弹。'never'：始终不允许你弹。
8. `pagingEnabled`：整页的进行滚动。`horizontal`：滚动方向。这个我在封装 [Grid](https://github.com/yuhao423/rn-learn/tree/master/Grid) 组件的时候用到过。
9. `scrollEnabled`：是否禁止滚动，false代表禁止滚动。
10. `contentOffset`：手动设置初始的滚动坐标。`{x:number,y:number}`。
11. `**stickyHeaderIndices**`**：决定哪个元素是吸顶元素。**`**styickyHeaderIndices={[0]}**`**会让第一个成员固定在视图顶端。**
12. api：`ScrollTo({x:0,y:0,animated:true})`，滚动到指定的x,y偏移量。`ScrollEnd()`，滚动到视图底部。`ScrollRef.current?.ScrollEnd({animated:true})`。


