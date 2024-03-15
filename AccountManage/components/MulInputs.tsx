import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

const MulInputs = (props:{data:string[]}) => {
 
    const {data} = props
    const length = data.length
    //ref
    const [refArr,setRefArr] = useState<Array<React.RefObject<TextInput>>>([])
    //state
    const [inputValue,setInputValue] = useState(new Array(3).fill(''))
    
    useEffect(()=>{
        let arr : React.RefObject<TextInput>[]= []
        for(let i = 0;i<length;i++){
            arr.push(React.createRef())
        }
        setRefArr(arr)

    },[length])


    //处理文字变化
    const hanleTextChange = (text:any,index:number)=>{
        console.log(text,index);
        //直接改变值是不行的，要浅拷贝一个，在修改值，最后setXxx
        const newTextValue = [...inputValue]
        newTextValue[index] = text
        setInputValue(newTextValue)
        
    }
    useEffect(()=>{
        console.log(inputValue,'wenrwef');
        
    },[inputValue])

    const handleSubimt = (index:number)=>{
        if(index < length -1){
            refArr[index + 1].current?.focus()
            console.log(index,refArr[index]);
            
        }
    }

  return (
    <View>
        {
            data.map((item:string,index:number)=>(
               <View key={index}>
                 <Text style={styles.txt}>{data}</Text>
                 <TextInput
                     style={styles.txtInput}
                     value={inputValue[index]}
                     onChangeText={text=>hanleTextChange(text,index)}
                    returnKeyType={index === length -1 ? 'done': 'next'}
                    ref={refArr[index]}
                    onSubmitEditing={()=>handleSubimt(index)}
                 ></TextInput>
               </View>
            ))
        }
    </View>
  )
}

export default MulInputs

const styles = StyleSheet.create({
    txt:{
        fontSize:13,marginVertical:10
    },
    txtInput:{
       backgroundColor:'#ededed',
       height:40,
       borderRadius:8,
       fontSize:16,
       paddingHorizontal:12,
       color:'#333333'
    },
})
