import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity as TO, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { H5 } from '../typo';
import * as Stl from '../styles';
import AsyncStorage from '@react-native-community/async-storage';
// const nav = useNavigation()
const HeaderBtn = ({ onPress, IconName, IconFamily, IconColor, IconSize }) => {
    return (
        <View style={s.btnWrapper}>
            <View style={s.btnWrapper2}>
                <TO onPress={onPress}>
                    <LinearGradient colors={['#30353B', '#101316']} style={s.btnStyle}>
                        <Icon
                            name={IconName ? IconName : 'menu'}
                            type={IconFamily ? IconFamily : 'feather'}
                            color={IconColor ? IconColor : '#B2B2B2'}
                            size={IconSize ? IconSize : 16}
                        />
                    </LinearGradient>
                </TO>
            </View>
        </View>

    )
}



function Header({ title, exit, onPress, setExit, type }) {
  
    const HeaderTag = () => {
        switch (type) {
            case 'profile':
                return (
                    <HeaderBtn IconSize={26} IconName="close" IconFamily="fontawesome" onPress={() => onPress()} />

                )

            case 'history':
                return (
                    <HeaderBtn IconSize={26} IconName="filter" IconFamily="font-awesome-5" onPress={()=>onPress()} />
                )

            default:
                return (
                    <HeaderBtn IconSize={26} IconName="history" IconFamily="fontawesome" onPress={() => nav.dangerouslyGetParent().openDrawer()} />

                )
        }
    }
    
    // console.log('title',title)
    const nav = useNavigation()
    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 20 }}>
            <View style={{ flex: 0.1, alignItems: 'flex-start' }}>
                {HeaderTag()}
            </View>
            <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}>
                <H5 style={{ color: Stl.Gold.color, textAlign: 'center' }}>{title ? title : ''}</H5>
            </View>
            <View style={{ flex: 0.1, alignItems: 'flex-end' }}>

                <HeaderBtn IconSize={20} IconName="menu" onPress={() => nav.openDrawer()} />
            </View>
        </View>
    )
}

export default Header;


const s = StyleSheet.create({
    btnWrapper: {
        shadowColor: "rgba(163,179,193,0.4)",
        shadowOffset: {
            width: -2,
            height: -2,
        },
        shadowOpacity: 1.75,
        shadowRadius: 6.84,

        elevation: 1,
    },
    btnWrapper2: {
        shadowColor: "rgba(0,0,0,0.86)",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1.75,
        shadowRadius: 6.84,

        elevation: 1,
    },
    btnStyle: {
        width: 40,
        height: 40,
        borderRadius: 1000000,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#2E3238'
    }
})