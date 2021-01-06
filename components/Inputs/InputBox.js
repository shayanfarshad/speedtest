import React,{Fragment} from 'react'
import {View,Text, TouchableOpacity as TO} from 'react-native'
import * as S from './styles';
import * as Stl from '../styles';
import {Icon} from 'react-native-elements';
import { TextInput } from 'react-native';
import {Label} from '../typo';

const InputBox = (props) =>{
    return(
        <View style={[S.container,props.style]}>
            <TextInput
                {...props}
                style={[Stl.font, S.inputTitle, {borderWidth: 0}, props.style? props.style : {}]}
                placeholderTextColor="#B2B2B2"
                // onChangeText={(text) => props.setCurrent(props.selector, text)}
                // value={props.value}
                // keyboardType={props.ktype !== undefined && props.ktype !== null ? props.ktype : 'default'}
                // clearButtonMode={'never'}
                // placeholder={props.placeholder ? props.placeholder : ''}
            />
        </View>
    )
}

export default InputBox

export const InputRow = (props) =>{
    return(
        <View style={[{marginVertical: 5}, props.style]}>
            {
                props.label ?  <Text style={[Stl.font, Stl.Gold]}>{props.label}:</Text> : null
            }
            <View style={S.InputRow}>
                <View style={[props.LeftIcon ? {flex: 0.85} : {flex: 1}]}>
                    {props.children}
                </View>
                {
                    props.LeftIcon ? <TO style={{flex: 0.15, justifyContent: 'center'}}>
                        <Icon
                                name={props.IconName ? props.IconName : 'sc-telegram'}
                                type={props.IconFamily ? props.IconFamily : 'evilicon'}
                                color='#B7B7B7'
                                style={{alignSelf: 'center'}}
                            />
                        </TO> : null
                }
            </View>
            {props.hint ? <Label style={{marginRight: 10, color: 'rgba(0,0,0,0.5)'}}>
               {props.hint}
            </Label> : null}
        </View>
    )
}

