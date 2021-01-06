import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity as TO, Image, FlatList, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Body from '../../components/Body';
import Header from '../../components/Header';
import * as Stl from '../../components/styles';
import { H5, P } from '../../components/typo';
import logo from '../../assets/img/logo.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import { GetUserScore, GetMainScore, GetPackages } from './_score_srv'
import { useFocusEffect } from '@react-navigation/native';
function fullShow({ navigation, route }) {
    const [store, setStore] = useState([])
    const [mainScore, setMainScore] = useState([])

    useFocusEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            switch (route.params.type) {
                case 'packages':
                    GetPackages().then(res => {
                        setStore(res.data)
                    })
                    break;
                case 'scores':
                    GetMainScore().then(res => {
                        console.log('score', res.data)
                        setMainScore(res.data)
                    })
                    break;
                default:
                    break;
            }
            return unsubscribe;
        });
    }, []);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', e => {
            setMainScore([])
            setStore([])
        })
        return unsubscribe;
    }, [navigation]);
    // console.log('type',route.params.type)
    // useEffect(() => {
    //     switch (route.params.type) {
    //         case 'packages':
    //             GetPackages().then(res => {
    //                 setData(res.data)
    //             })
    //             break;
    //         case 'scores':
    //             GetMainScore().then(res => {
    //                 console.log('score', res.data)
    //                 setData(res.data)
    //             })
    //             break;
    //         default:
    //             break;
    //     }
    // }, [navigation])

    return (
        <Body>
            {mainScore && store == null ? (<ActivityIndicator style={{ alignSelf: 'center', marginVertical: 10 }} size="large" color="#fff" />
            ) : (
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end',paddingTop:10}}>
                        {route.params.type === 'packages' ? (<FlatList
                            data={store}
                            horizontal
                            contentContainerStyle={{ flexDirection: 'row-reverse',justifyContent:'flex-start' }}

                            renderItem={({ index, item }) => {
                                return (<TO key={index} style={{ width: 88, height: 150, borderRadius: 16, backgroundColor: '#17181C', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: 10 }}>
                                    <P style={{ color: 'white', textAlign: 'center' }}> {item.Description}</P>
                                    <P style={{ color: 'white', textAlign: 'center' }}>هزینه: {item.Score}</P>
                                    <P style={{ color: 'white', textAlign: 'center' }}> {item.Name}</P>
                                </TO>)

                            }}
                        ></FlatList>) :
                            (mainScore.map((i) => {
                                return (

                                    <TO style={{ flexDirection: 'row-reverse', justifyContent: 'space-around', width: "95%", height: 80, borderRadius: 16, backgroundColor: '#17181C', alignItems: 'center', marginHorizontal: '2.5%', marginBottom: 10 }}>
                                        <View style={{ flex: 0.2, justifyContent: 'space-around', alignItems: 'center' }}>
                                            <P style={{ color: 'white' }}>{i.Point}</P>
                                            <P style={{ color: 'white' }}>امتیاز</P>
                                        </View>
                                        <View style={{ flex: 0.5, justifyContent: 'flex-start', alignItems: 'flex-end' }}>
                                            <P style={{ color: 'white' }}>{i.Name}</P>
                                            <P style={{ color: '#B2B2B2', fontSize: 12 }}>{i.Description}</P>
                                        </View>

                                        {i.IsReceived === false ? (<View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                            <LottieView
                                                // ref={animation => {
                                                //     this.animation = animation;
                                                // }}
                                                autoPlay
                                                // progress={1}
                                                loop
                                                style={{ width: 40, height: 40 }}
                                                source={require('../../assets/anim/ticknarenji.json')}
                                            />
                                            <P style={{ color: '#F2934A', fontSize: 12 }}>
                                                هنور انجام نشده
                                    </P>
                                        </View>) :
                                            (<View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                                <LottieView
                                                    // ref={animation => {
                                                    //     this.animation = animation;
                                                    // }}
                                                    // autoPlay
                                                    progress={1}
                                                    // loop
                                                    style={{ width: 40, height: 40 }}
                                                    source={require('../../assets/anim/ticksabz.json')}
                                                />
                                                <P style={{ color: '#00EA6D', fontSize: 12 }}>
                                                    انجام شده
                                    </P>
                                            </View>)}



                                    </TO>
                                );
                            }))}
                    </View>
                )}
        </Body >
    )
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => {
    return {

    };
};

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(FullResult);
export default connect(mapStateToProps, mapDispatchToProps)(fullShow);