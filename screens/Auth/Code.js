import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, BackHandler } from 'react-native';
import Logo from '../../components/Logo'
import InputBox, { InputRow } from '../../components/Inputs/InputBox';
import Btn, { BtnRow } from '../../components/Buttons/index';
import * as Stl from '../../components/styles'
import { SendCode } from './_login_srv';
import AsyncStorage from '@react-native-community/async-storage';
import CountDown from 'react-native-countdown-component';
import DeviceInfo from 'react-native-device-info';
import { SendMobile } from './_login_srv';
import AppAlert from '../../utils';
import { CommonActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

function Code({ navigation, route }) {
    const [code, setCode] = useState('')
    const [reSendCode, setReSendCode] = useState(false)

    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])

    function regCode() {
        var obj = new Object()
        obj.MobailNumber = route.params.phone;
        SendMobile(obj).then(res => {
            // console.log('resposne is', res)

            setReSendCode(false)
        }).catch(err => {
            if (err.response)
                AppAlert(err.response.status, err.response.data)
        })
    }


    function login(code) {
        // { console.log('code phone', route.params.phone) }
        var obj = new Object()
        var systemName = DeviceInfo.getSystemName();
        var uuid = DeviceInfo.getUniqueId();
        if (systemName == 'Android') {
            var device = 0;
        } else if (systemName == 'iOS') {
            var device = 1
        }
        obj.MobailNumber = route.params.phone;
        obj.Code = parseInt(code);
        // console.log('obj', obj)
        SendCode(obj, device, uuid).then(res => {
            // console.log('resposne is', res)
            if (res.status == 200) {
                if (res.data.token !== null) {
                    AppAlert(200, 'خوش آمدید')
                    AsyncStorage.setItem('token', res.data.token)
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'HomeScreen' }],
                        }),
                    );
                }
            }
        }).catch(err => {
            if (err.response)
                AppAlert(err.response.status, err.response.data)
        })
    }
    return (
        <View style={s.container}>
            <ScrollView contentContainerStyle={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={[Stl.font, Stl.Gold, { fontSize: 25 }]}>ورود</Text>
                <Logo />
                <View>
                    <Text style={[Stl.font, Stl.Gold, { fontSize: 18 }]}>ورود با شماره</Text>
                    <Text style={[Stl.font, Stl.Gold, { fontSize: 18 }]}>{route.params.phone}</Text>
                </View>
            </ScrollView>
            <InputRow style={{ marginHorizontal: 10, width: width - 50 }} label="کد تایید">
                <InputBox onChangeText={text => setCode(text)} />
            </InputRow>
            {
                !reSendCode ? <CountDown
                    until={60}
                    onFinish={() => setTimeout(() => {
                        setReSendCode(true)
                    }, 500)}
                    size={20}
                    digitStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    digitTxtStyle={{ fontWeight: 'normal', textAlign: 'center', fontFamily: Stl.font.fontFamily, color: Stl.Primary.color }}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    separatorStyle={{ color: '#000', top: -2 }}
                    showSeparator
                /> :
                    <BtnRow>
                        <Btn title="ارسال مجدد کد تایید" Gray Light TCenter onPress={() => regCode()} />
                    </BtnRow>

            }
            <BtnRow>
                <Btn title="ورود" Primary Center TCenter onPress={() => login(code)} />
            </BtnRow>
        </View>
    )
}

export default Code;

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginHorizontal: 15,
        alignItems: 'center',
        backgroundColor: '#1B1D21',
        width: '100%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.84,
    }
})