import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import Logo from '../../components/Logo'
import InputBox, { InputRow } from '../../components/Inputs/InputBox';
import Btn, { BtnRow } from '../../components/Buttons/index';
import * as Stl from '../../components/styles'
import { SendMobile } from './_login_srv';
import AppAlert from '../../utils';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import Body from '../../components/Body';
// import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

function Register({ navigation }) {
    const [phone, setPhone] = useState('');
    const [loader, setLoader] = useState(false);

    function login(phone) {
        setLoader(true)
        var obj = new Object()
        obj.MobailNumber = phone;
        SendMobile(obj).then(res => {
            setLoader(false)
            if (res.status == 200) {
                navigation.navigate('CodeScreen', {
                    phone: phone
                })
            }
        }).catch(err => {
            setLoader(false)
            if (err.response)
                AppAlert(err.response.status, err.response.data)
        })
    }

    return (

        <Body style={{marginBottom:20}}>
            <Header />
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>

                <View style={s.container}>
                    <Text style={[Stl.font, Stl.Gold, { fontSize: 25 }]}>ثبت نام / ورود</Text>
                    <Logo />

                    {/* <InputRow style={{ marginHorizontal: 10, width: width - 50 }} label="تلفن همراه">
                        <InputBox onChangeText={text => setPhone(text)} />
                    </InputRow> */}
                    <ActivityIndicator style={{ alignSelf: 'center', marginVertical: 10, display: loader ? 'flex' : 'none' }} size="large" color="#fff" />

                </View>
            </ScrollView>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <InputRow style={{ marginHorizontal: 10, width: width - 50 }} label="تلفن همراه">
                    <InputBox onChangeText={text => setPhone(text)} />
                </InputRow>
                <BtnRow>
                    <Btn title="ارسال کد ورود" Primary Center TCenter onPress={() => login(phone)} />
                </BtnRow>
            </View>
        </Body >


    )
}

export default Register;

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginHorizontal: 15,
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        // backgroundColor: '#1B1D21',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 6,
        //     height: 6,
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 4.84,
    }
})