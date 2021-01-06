import React, { useState } from 'react';
import {View,Text,StyleSheet, TextInput, TouchableOpacity as TO} from 'react-native'
import {Icon} from 'react-native-elements';
import * as Stl from '../styles';
import * as S from './styles';

export default function Counter({title, current, setCurrent}){

    function increase(){
        setCurrent((Number(current)+1).toString())
    }
    function decrease(){
        if(Number(current) >=1)
        setCurrent((Number(current)-1).toString())
    }

    return(
        <View  style={{marginBottom: 20}}>
            <Text style={[Stl.font, {marginBottom: 10}]}>{title}:</Text>
            <View style={[s.row]}>
                <View style={{flex:0.2}}>
                    <TO onPress={decrease} >
                        <Icon
                            name='minuscircle'
                            type='antdesign'
                            color={Stl.Primary.color}
                            style={{alignSelf: 'flex-start'}}
                            size={30}
                        />
                    </TO>
                </View>
                <View style={{flex:0.6, alignItems: 'center'}}>
                    <TextInput
                        onChangeText={text => setCurrent(text)}
                        value={current}
                        keyboardType="numeric"
                        style={{textAlign: 'center', fontSize: 25, margin: 0, padding: 0, borderWidth: 0, color: 'gray'}}
                    />
                </View>
                <View style={{flex:0.2}}>
                    <TO onPress={increase}>
                        <Icon
                            name='pluscircle'
                            type='antdesign'
                            color={Stl.Primary.color}
                            style={{alignSelf: 'flex-end'}}
                            size={30}
                        />
                    </TO>
                </View>
            </View>
        </View>
    )
}


const s = StyleSheet.create({
    row:{
        flexDirection: 'row',
        width: 200,
        alignSelf: 'center',
        borderColor: '#D0CCE4',
        borderWidth: 1,
        backgroundColor: '#F8F8F8',
        borderRadius: 25,
        paddingHorizontal: 3,
        paddingTop: 2

    }
})