import React, { useRef } from 'react';
import { View, Text, Animated } from 'react-native'
import Loader from '../../components/Loader'
import Body from '../../components/Body'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';


function SplashScreen({ navigation }) {
    setTimeout(() => {
        // navigation.navigate('HomeScreen')
        AsyncStorage.getItem('token').then(res => {
            if (res == null) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'RegisterScreen' }],
                    }),
                );
            } else {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }],
                    }),
                );
            }
        })

    }, 5000);


    return (
        <Body style={{ justifyContent: 'center' }}>
            <Loader />
        </Body>
    )
}

export default SplashScreen