


import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Animated, ScrollView, StyleSheet, Dimensions, TouchableOpacity as TO } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import * as Stl from '../../../../components/styles';
import Svg, { SvgXml, Line } from 'react-native-svg';
import callImg from '../../../../assets/img/catIcons/call';
import fullImg from '../../../../assets/img/catIcons/full';
import gameImg from '../../../../assets/img/catIcons/game';
import speedImg from '../../../../assets/img/catIcons/speed';
import videoImg from '../../../../assets/img/catIcons/video';
import webImg from '../../../../assets/img/catIcons/web';
import p2 from '../../../../assets/img/catIcons/p2';
const windowWidth = Dimensions.get('window').width;
const xOffset = new Animated.Value(0);

const transitionAnimation = index => {
    return {
        transform: [
            {
                scale: xOffset.interpolate({
                    inputRange: [
                        (index - 1) * windowWidth,
                        index * windowWidth,
                        (index + 1) * windowWidth
                    ],
                    outputRange: [1,1,1]
                })
            }
        ]
    };
};

function CatSelect({ fade }) {
    const rob = windowWidth / 5
    const [active, setActive] = useState(2)
    const scref = React.createRef();
    const fading = useRef(new Animated.Value(0)).current;
    const [x, setX] = useState(0)
    const [list, setList] = useState([
        {
            id: 1,
            name: 'بازی',
            iName: gameImg
        },
        {
            id: 2,
            name: 'تماشای فیلم',
            iName: videoImg
        },
        {
            id: 3,
            name: 'تست کامل',
            iName: fullImg
        },
        {
            id: 4,
            name: 'تماس اینترنتی',
            iName: callImg
        },
        {
            id: 5,
            name: 'سرعت',
            iName: speedImg
        },
        {
            id: 6,
            name: 'وبگردی',
            iName: webImg
        }
    ])
    useEffect(() => {
        if (fade === true) {
            Animated.timing(fading, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                // easing: Easing.in
            }).start()
        } else {
            Animated.timing(fading, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
                // easing: Easing.in
            }).start()
        }
    }, [fade])
    const circleRadius = 30;

    const _touchX = new Animated.Value(windowWidth / 2 - circleRadius);
    const _onPanGestureEvent = (e) => {
        var dir = e.nativeEvent.translationX
        if (dir > x) {
            if (dir - 10 > x) {
                var t = list;
                var l = t.shift()
                t.push(l)
                setList(t)
            }

        } else {
            if (dir + 10 < x) {
                var t = list;
                var l = t.pop()
                t.unshift(l)
                setList(t)
            }

        }
        setX(dir)
    };
    const changeItem = i => {
    }

    const renderWidthHeight = index => {
        if (index === 2) {
            return 32
        } else if (index === 1 || index === 3) {
            return 24
        } else {
            return 16
        }
    }
    const renderMargin = index => {
        if (index === 2) {
            return 10
        } else if (index === 1 || index === 3) {
            return 15
        } else {
            return 20
        }
    }
    const renderTop = index => {
        if (index === 2) {
            return 0
        } else if (index === 1 || index === 3) {
            return 0
        } else {
            return 10
        }
    }

    return (
        <>
            <Animated.ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: xOffset } } }],
                    { useNativeDriver: true }
                )}
                horizontal
                pagingEnabled
                style={s.scrollView}
                showsHorizontalScrollIndicator={false}
            >
                {
                    list.map((i, j) => {
                        return (
                            <View key={j} style={[
                                { width: windowWidth, height: 100, justifyContent: 'center', alignItems: 'center' },
                            ]}
                            >
                                <SvgXml xml={i.iName} width={renderWidthHeight(j)} height={renderWidthHeight(j)} style={[{ marginBottom: renderMargin(j) }, { top: renderTop(j) }]} fill={j === active ? '#F2564A' : '#fff'} fillOpacity="1" fillRule="nonzero" />
                                <Text style={[Stl.font, { color: j === active ? '#F2564A' : '#fff', fontSize: j === active ? 14 : 12, top: 35, textAlign: 'center' }]}>
                                    {i.name}
                                </Text>
                            </View>
                        )
                    })
                }
                {/* <View style={s.scrollPage}>
                    <Animated.View style={[s.screen, transitionAnimation(1)]}>
                        <Text style={s.text}>1</Text>
                    </Animated.View>
                </View>
                <View style={s.scrollPage}>
                    <Animated.View style={[s.screen, transitionAnimation(2)]}>
                        <Text style={s.text}>2</Text>
                    </Animated.View>
                </View>
                <View style={s.scrollPage}>
                    <Animated.View style={[s.screen, transitionAnimation(3)]}>
                        <Text style={s.text}>3</Text>
                    </Animated.View>
                </View>
                <View style={s.scrollPage}>
                    <Animated.View style={[s.screen, transitionAnimation(4)]}>
                        <Text style={s.text}>4</Text>
                    </Animated.View>
                </View>
                <View style={s.scrollPage}>
                    <Animated.View style={[s.screen, transitionAnimation(5)]}>
                        <Text style={s.text}>5</Text>
                    </Animated.View>
                </View>
                <View style={s.scrollPage}>
                    <Animated.View style={[s.screen, transitionAnimation(6)]}>
                        <Text style={s.text}>6</Text>
                    </Animated.View>
                </View>
                <View style={s.scrollPage}>
                    <Animated.View style={[s.screen, transitionAnimation(7)]}>
                        <Text style={s.text}>7</Text>
                    </Animated.View>
                </View> */}
            </Animated.ScrollView>
            <SvgXml xml={p2} width="48" height="48" fillOpacity="1" fillRule="nonzero" style={{ position: 'absolute', alignSelf: 'center', bottom: 30 }} />

            <Svg height="5" width="100%" style={{ position: 'absolute', bottom: 30 }}>
                <Line x1="0" y1="2" x2="100%" y2="2" stroke="#F2564A" strokeWidth="2" />
            </Svg>
        </>
        // <Animated.View style={{ flex: 1, opacity: fading, paddingTop: 10 }}>

        // </Animated.View>
    )
}

export default CatSelect;

const s = StyleSheet.create({
    scrollView: {
        flexDirection: "row",
    },
    screen: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        // backgroundColor: "white"
    },
    text: {
        fontSize: 45,
        fontWeight: "bold"
    },
    scrollPage: {
        width: windowWidth,
        padding: 20
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "bold"
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
    }
});