import React,{Fragment, useState} from 'react'
import { View, Text, TouchableOpacity as TO} from 'react-native'
import { Icon,CheckBox } from 'react-native-elements'

import * as Stl from '../styles';
import * as S from './styles'


// import console = require('console');

const Radio = ({title, current, items, setCurrent}) =>{
    function renderItem(item, key){
        return(
            <CheckBox
                key={key}
                right
                iconRight
                title={item.Name}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={current.Name === item.Name ? true : false}
                textStyle={Stl.font}
                containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
                onPress={()=>setCurrent(item)}
            />
        )
    }

    return(
        <View style={{marginBottom: 10}}>
            <Text style={Stl.font}>{title}:</Text>
            <View style={{padding: 10}}>
                {
                    items.map((i,k)=>{
                        return renderItem(i,k)
                    })
                }
            </View>
        </View>
    )
}

export default Radio;

