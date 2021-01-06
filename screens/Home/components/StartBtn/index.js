import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity as TO, Image, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Shuttel from '../../../../assets/img/shuttle.png';
import { H4 } from '../../../../components/typo';
import { useNavigation } from '@react-navigation/native';
import { startBtnRouteHandler } from '../../../../navigation/routeFn';

function StartBtn({ start, selectedId }) {
    const newanim = useRef(new Animated.Value(500)).current;
    const fading = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    Animated.timing(newanim, {
        toValue: 92,
        duration: 1200,
        useNativeDriver: false,
        easing: Easing.in
    }).start()
    Animated.timing(fading, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
        easing: Easing.in
    }).start()
    useEffect(() => {
        if (start) {
            Animated.timing(fading, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                // easing: Easing.in
            }).start()
            Animated.timing(newanim, {
                toValue: -1500,
                duration: 3000,
                useNativeDriver: false,
                easing: Easing.in
            }).start()
            setTimeout(() => {
                // alert(selectedId)
                startBtnRouteHandler(selectedId, navigation)
                // navigation.navigate('PrepareScreen',{nextPage: 'DownloadScreen', title: 'سنجش سرعت دانلود'})
            }, 500);
        }
    }, [start])
    return (

        <View style={s.container}>
            <View style={s.wrapper}>
                <Animated.Image source={Shuttel} style={[s.btnImg, { transform: [{ translateY: newanim }] }]} resizeMode="contain" />
                <Animated.View style={{ opacity: fading }}>
                <LinearGradient
                    colors={['#383D45', '#1A1B1F']}
                    style={[s.btnStyle]}
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 0.5, y: 1 }}
                >
                    <View style={{
                             borderTopWidth: 1,
                             borderTopColor: '#fff',
                             marginTop: 50
                         }}>
                             <H4 style={{ color: '#fff' }}>بزن بریم</H4>
                        </View>
                </LinearGradient>
                </Animated.View>
            </View>

        </View>
    )
}

export default StartBtn;

const s = StyleSheet.create({
    container: {
        shadowColor: "rgba(59,59,59,1)",
        shadowOffset: {
            width: -6,
            height: -6,
        },
        shadowOpacity: 1.75,
        shadowRadius: 20.84,
        marginTop: -50,
        // elevation: 1,
        // borderWidth:1,

        justifyContent: 'center', alignItems: 'center'
    },
    wrapper: {
        // shadowColor: "rgba(0,0,0,0.51)",
        // shadowOffset: {
        //     width: 6,
        //     height: 6,
        // },
        // shadowOpacity: 1.75,
        // shadowRadius: 20.84,

        // elevation: 1,
        // width: 155,
        // elevation:4,
        // height: 155,'

        alignSelf: 'center'
    },
    btnStyle: {
        width: 155,
        height: 155,
        alignSelf: 'center',
        borderRadius: 100000000,
        alignItems: 'center',
        // elevation:2,
        justifyContent: 'center',
    },
    btnImg: {
        width: 50,
        height: 50,
        // position: 'absolute',
        alignSelf: 'center',
        zIndex: 12312,
    }
})