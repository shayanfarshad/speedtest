import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Animated, Easing, ActivityIndicator } from 'react-native';
import AnimatedCircularProgress from 'react-native-conical-gradient-progress';
import Counter from 'react-native-counter';
// import { LineChart, Grid } from 'react-native-svg-charts'
// import { Stop, LinearGradient as LG } from 'react-native-svg'
import {
    LineChart
} from "react-native-chart-kit";
import tick from '../../../assets/img/ticks.png';
import LinearGradient from 'react-native-linear-gradient';
import * as shape from 'd3-shape'

import * as Stl from '../components/styles'
import { H4, H1 } from '../components/typo';

export default function Charts({ rtt, done, param, Avg, title, color, isDownload }) {
    const comesIn = useRef(new Animated.Value(-600)).current;
    const spinValue = new Animated.Value(0)

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    useEffect(() => {
        Animated.loop(
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true  // To make use of native driver for performance
                }
            )).start()
        if (done) {
            Animated.timing(comesIn, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: true,
                easing: Easing.in
            }).start()
            spinValue.setValue(0)
        }
    }, [done])
    return (
        <View style={{ flex: 1 }}>
            <H1 style={[{ textAlign: 'center', flex: 0.2, justifyContent: 'center', alignSelf: 'center', top: 20, color: `rgba(${color},1)` }]}>
                {title}
            </H1>
            <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                <ImageBackground source={tick} style={{ width: 300, height: 300, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', paddingTop: 40 }} resizeMode="contain" imageStyle={{}}>
                    <View style={s.inner}>
                        <View style={s.overlayCircle}>
                            {/* <Text style={{ color: '#fff', fontSize: 50 }}>0</Text> */}
                            {
                                param !== 0 ?
                                    <Counter
                                        end={Number(param.replace(/[^0-9$.,]/g, ''))}
                                        start={0}
                                        time={3000}
                                        digits={2}
                                        easing="linear"
                                        onComplete={() => { }}
                                        style={{ color: '#fff', fontSize: 50 }}
                                    /> : <Text style={{ color: '#fff', fontSize: 18 }}>{isDownload ? 'Downloading' : 'Uploading'}...</Text>
                            }

                            <H4 style={{color: `rgba(${color},1)`}}>Mbps</H4>
                        </View>
                        <Animated.View style={[{ transform: [{ rotate: spin }] }]}>
                            {/* {console.log(param, 'amir')} */}

                            <LinearGradient
                                colors={['#1B1D21', '#10324B']}
                                start={{ x: 0, y: 0.45 }}
                                end={{ x: 0.1, y: 0.0 }}
                                style={s.container}
                            >
                                <View style={{
                                    transform: [{ rotate: "-135deg" }]
                                }}>
                                    {
                                        param !== 0 ?
                                            <AnimatedCircularProgress
                                                size={230}
                                                width={10}
                                                fill={isNaN(param) ? Number(param.replace(/[^0-9$.,]/g, '')) : 0}
                                                prefill={0}
                                                beginColor="#0772BB"
                                                endColor={`rgba(${color},1)`}
                                                segments={200}
                                                backgroundColor="rgba(255, 255, 255, 0)"
                                                linecap="round"
                                                style={{ transform: [{ scaleX: -1 }] }}
                                                friction={3000}
                                            >
                                            </AnimatedCircularProgress> : null
                                    }
                                </View>
                            </LinearGradient>
                        </Animated.View>
                        <Text style={[{ position: 'absolute', bottom: -60, alignSelf: 'center', fontSize: 20 }, Stl.typo]}>100%</Text>
                    </View>
                </ImageBackground>
            </View>
            {
                done === true ?
                rtt.length > 1 ?
                    <Animated.View style={{
                        transform: [{ translateX: comesIn }],
                        alignItems: 'flex-end',
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                        // right: -45,
                        bottom: -50,
                        flex: 0.4,
                    }}>
                        <Text style={[{ position: 'absolute', zIndex: 1111111, bottom: 80, color: '#fff', textAlign: 'center', width: '100%' }, Stl.typo]}>Rtt: {Avg.toFixed(2)} ms</Text>
                        <LineChart
                            data={{
                                // labels: ["January", "February", "March", "April", "May", "June"],
                                datasets: [
                                    {
                                        data: done === true ? rtt : [0]
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width+110} // from react-native
                            height={300}
                            yAxisLabel=""
                            yAxisSuffix=""
                            // yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                // backgroundColor:"#fff",
                                backgroundGradientFrom: "transparent",
                                backgroundGradientTo: "transparent",
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientToOpacity: 0,
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(${color}, ${opacity})`,
                                // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    // flex: 1,    
                                },
                                propsForDots: {
                                    // r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726",
                                },
                            }}
                            hideLegend={true}
                            bezier
                            style={{
                                // marginVertical: 8,
                                // borderRadius: 16,
                                flex: 1,
                                right: -45                           

                            }}
                            withVerticalLabels={false}
                            withHorizontalLabels={false}
                            withInnerLines={false}
                            withOuterLines={false}
                            hidePointsAtIndex={[]}
                            // yLabelsOffset={1000}
                            // xLabelsOffset={10000}
                            fromZero={true}
                            withDots={false}
                        /></Animated.View> : <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}} /> :<View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator 
                        size="large"
                        color={'#fff'}
                        /></View>
            }

            {/* <LineChart
                        style={{ height: 200, width: '100%' }}
                        data={data}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={{ top: 20 }}
                        animate={true}
                        curve={shape.curveNatural}
                        animationDuration={3000}

                    >
                        <LG id="lineGradient" x1={'0'} y={'0%'} x2={'100%'} y2={'100%'}>
                            <Stop offset={'0%'} stopColor={'green'} />
                            <Stop offset={'100%'} stopColor={'blue'} />
                        </LG>
                    </LineChart> */}
        </View>
    )
}


const s = StyleSheet.create({
    inner: {
        borderRadius: 20000000,
        alignSelf: 'center',
        shadowColor: "#424A51",
        shadowOffset: {
            width: -4,
            height: -4,
        },
        shadowOpacity: 0.40,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        width: 230,
        height: 230,
        borderRadius: 20000000,
        justifyContent: 'center',
    },
    overlayCircle: {
        position: 'absolute',
        top: 28,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B1D21',
        width: 170,
        height: 170,
        borderRadius: 20000000,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 2
    }
});