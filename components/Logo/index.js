import React, { useRef } from 'react';
import { View, Text, Animated, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LogoImg from '../../assets/img/logoCrc.png'

export default function logo() {
    const fadeIn = useRef(new Animated.Value(0)).current;
    Animated.timing(
        fadeIn,
        {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }
    ).start();
    return (
        <Animated.View style={[s.BoxShadow, { opacity: fadeIn }]}>
            <LinearGradient
                colors={['rgba(112, 112, 112,0)', '#3B4048', 'rgba(112, 112, 112,0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[s.container]}
                locations={[0.2,0.5,0.9]}
            >
                <View style={[{ backgroundColor: '#3B4048', borderRadius: 50000000}, s.img]}>
                    <Image source={LogoImg} style={s.img} />
                </View>
            </LinearGradient>
        </Animated.View>
    )
}


const s = StyleSheet.create({
    container: {
        width: 175,
        height: 175,
        alignSelf: 'center',
        borderRadius: 5000000,
        position: 'relative',
        zIndex: 123,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    BoxShadow: {
        shadowColor: "rgba(0,0,0, 0.8);",
        // shadowColor: "#eee",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.61,
        shadowRadius: 10.11,

        elevation: 10,
        // backgroundColor: "#0000", // invisible color
        marginTop: 30
    },
    img: {
        width: 150,
        height: 150,
    }
})