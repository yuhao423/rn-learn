### alert/console：开发周期的调试工具
:::tips

1. `alert()`简单的弹窗提示，`alert('yu')`
2. `Alert.alert()`与`alert()`不同。用法：`Alert.alert('标题','内容',[{text:'ty',onPress:()=>console.log(1)},{text:'hao',onPress:()=>console.log(222)}])`。一般都是自定义，很少用。
3. `**console日志输出分级**`**：**`**log**`**，**`**info**`**，**`**debug**`**，**`**warn**`**，**`**error**`**。**
4. `console日志改变颜色和大小`：`consolo.log('%cyuhao','color:red;font-size:x-large')`。
5. `**console.tree()查看组件树**`
6. `consolo.table()`：查看输入的表格。
:::

<a name="VtMdb"></a>
### Dimension/useWindowDimension：获取屏幕宽高
:::tips

1. 使用`const {width,height} = Dimension.get('window')`或者使用hook`const {width,height} = useWindowDimension()`来获取宽和高。
2. `scale`，获取**屏幕密度/屏幕缩放比**。`fontScale`，字体缩放比，在手机的设置中可以进行更改字体缩放比。
3. `**Dimension.get('window')和Dimension.get('screen')的区别**`**：**screen是**获取整个屏幕（包括状态栏），**而'window'只是获取这个RN页面的宽高。通常来说，'screen'获取的**高度**要要一些。
4. `Dimension.addEventListener()`监听屏幕变化
:::

<a name="SQD7j"></a>
### Platform：获取平台属性
:::tips

1. `**Platform.os**`**：获取平台，一般用来区分是安卓还是ios。**
2. `Platform.Version`：获取平台系统的版本。
3. `**Platform.select({android:{paddingTop:StatusBar.currentHeight},ios:{paddingTop:20})**`**，根据不同平台来指定不同的样式。**
:::
```tsx
const styles = StyleSheet.create({
  root:{
    ...Platform.select({
      android:{paddingTop:StatusBar.currentHeight},
      ios:{paddingTop:20}
    })
  }
})
```
<a name="kQbFJ"></a>
### StyleSheet：样式表
:::tips

1. `StyleSheet.create()`，基本使用。
2. `StyleSheet.compose(style1,style2)`，样式合并。和`style={[styles.wrapper,style]}`一样，**都是后传入的样式可以覆盖前面的样式，也可以新增前面没有的样式**，是一个**合并**的操作。但是`StyleSheet.compose()`更加高效，性能更好。
3. 常量：`StyleSheet.absoluteFill` 等同于 === `{postion:'absolute',left:0,right:0,top:0,bottom:0}`,用法：`**style={[style.inner,StyleSheet.absoluteFill]}**`**。**
4. `**StyleSheet.hairlineWidth**`**：一像素的宽度，常常用来当做分割组件。**
:::

<a name="lVvbg"></a>
### Linking：链接
:::tips

1. `openURL()`，打开链接，比如网页链接，地图，电话，**应用跳转**等等。
2. `canOpenURL()`,是否能够跳转，布尔值。true代表能够跳转。
3. `Linking.opemSetting()`,打开这个app应用的设置信息。
:::

<a name="BIEQW"></a>
### PixelRatio：像素比例，有时候有奇效
:::tips

1. `PixlRatio.get()`,获取屏幕像素比例，和`Dimension.get('window').scale`一样。
2. `PixlRation.getPixelSizeForLayoutSize(number)`将一个布局尺寸(dp)转换成像素尺寸(px)。一定会返回一个整数数值。`PixlRation.getPixelSizeForLayoutSize(200)`就是 200 * 屏幕像素比例 。得到px。
:::

<a name="kifmK"></a>
### BackHandler：安卓返回键
:::tips

1. 有监听就一定要有注销，不然一定会出错。
2. 方法：`addEventLister('BackPressEventName',回调函数)`，回调函数会返回true或者false，一般动态决定。true的话会拦截，false则不会拦截。
3. `BackHandler.exitApp()`,退出app。看官网例子就行。
4. **社区复用**`**hooks**`**：**`**@react-native-community/hooks**`。其中有一个hook`useBackHandler`就是对上面代码的封装。直接像使用`useEffect`hook一样使用`useBackHandler`就行。**这个用的特别特别多。**
:::

<a name="NX3Av"></a>
### PermissionsAndroid：安卓动态权限
:::tips

1. 所有分支：`PermissionsAndroid.PERMISSIONS`，查看所有权限。
2. 检查安卓权限：`PermissionsAndroid.check()`
3. 申请权限：`PermissionsAndroid.request()`
:::
```tsx
1.在原生的Manifest.xml里面申请静态权限，是前提条件啊
//2

const App = ()=>{
  useEffect(()=>{
    const needPermission = PermissionAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE  //获取WRITE_EXTERNAL_STORAGE这个权限
    //检查权限
    PermissionAndroid.check(needPermission).then(res=>{
        if(!res){
          PermissionAndroid.request(needPermission).then(status=>{
              status有三种状态，成功，失败，不再询问
          })
        }
    })
  })
}


```

<a name="OiFXJ"></a>
### Vibration：震动
:::tips

1. `Vibration.vibrate()`，震动400ms
2. `Vibration.vibrate(1000)`，**震动1s，仅限安卓！**
3. `Vibtation.vibrate([100,500,200,500],true)`，通用，安卓是停100ms，震动500ms，再停200ms，震动500ms，第二个参数代表是否重复循环。
:::

<a name="TyL6d"></a>
### Transforms：伪3D效果
:::tips

1. 直接在样式里面写就行。`<View style={{transformY:100},{scaleY:1.5},{rotateY:'60deg'},{rorateZ:'30deg'}} />`，执行顺序按照先后顺序来，矩阵不可逆！
:::
