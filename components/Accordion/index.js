import React from 'react';
import {View,Text,StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as Stl from '../styles'
import {Icon} from 'react-native-elements';

export default function Accordion({open, rightEl, children, onPress}){
    return(
        <View>
            <TouchableOpacity onPress={onPress} activeOpacity={1}>
                <View style={s.Title}>
                    <View style={s.TitleRight}>
                        {rightEl}
                    </View>
                    <View style={s.TitleLeft}>
                        <Icon
                            name={!open ? 'arrow-left' : 'arrow-down'}
                            type='evilicon'
                            color={Stl.Primary.color}
                            size={28}
                        />
                        {/* <Image source={open ? upArrow: downArrow} style={s.TitleLeftIcon} resizeMode="contain" /> */}
                    </View>
                </View>
            </TouchableOpacity>
            {
                open ? 
                <View style={s.childs}>
                    {children}
                </View> : null
            }
        </View>
    )
}

const s = StyleSheet.create({
    Title:{
      marginHorizontal: 15,
      justifyContent: 'center',
      flexDirection: 'row-reverse',
      justifyContent: 'center',
    },
    TitleRight:{
      flex: 0.9,
      justifyContent: 'center'
    },
    TitleLeft:{
      flex: 0.1,
      justifyContent: 'center',
      paddingVertical: 5
    },
    TitleLeftIcon:{
      width:10,
      height: 10
    },
    childs:{
        marginTop: 10
    }
})
