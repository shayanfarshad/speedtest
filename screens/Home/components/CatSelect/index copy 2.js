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
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {setCatId} from '../../../../store/actions/catActions';

function CatSelect(props) {
    const windowWidth = Dimensions.get('window').width;
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
        if (props.fade === true) {
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
    }, [props.fade])
    const circleRadius = 30;

    const _touchX = new Animated.Value(windowWidth / 2 - circleRadius);
    const _onPanGestureEvent = (e) => {
        var dir = e.nativeEvent.x
        if (dir - 40 > x) {
            if (dir > x) {
                var t = list;
                var l = t.shift()
                t.push(l)
                setList(t)
            }

        } else {
            if (dir + 40 < x) {
                var t = list;
                var l = t.pop()
                t.unshift(l)
                setList(t)
            }

        }
        setX(dir)
        setTimeout(() => {
            props.setCatId(list[2].id)
        }, 200);
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
            return -20
        } else if (index === 1 || index === 3) {
            return 0
        } else {
            return 10
        }
    }

    return (
        <Animated.View style={{ flex: 1, opacity: fading }}>
            <PanGestureHandler
                onGestureEvent={_onPanGestureEvent}
            >
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            list.map((i, j) => {
                                return (
                                    <TO key={j} style={[
                                        { width: windowWidth / 5, height: 130, justifyContent: 'center', alignItems: 'center' },
                                    ]}
                                        onPress={() => { changeItem(i) }}
                                    >
                                        <SvgXml xml={i.iName} width={renderWidthHeight(j)} height={renderWidthHeight(j)} style={[{ marginBottom: renderMargin(j) }, { top: renderTop(j) }]} fill={j === active ? '#F2564A' : '#fff'} fillOpacity="1" fillRule="nonzero" />
                                        <Text style={[Stl.font, { color: j === active ? '#F2564A' : '#fff', fontSize: j === active ? 12 : 10, top: 20, textAlign: 'center' }]}>
                                            {i.name}
                                        </Text>
                                    </TO>
                                )
                            })
                        }
                    </View>
                    <SvgXml xml={p2} width="48" height="48" fillOpacity="1" fillRule="nonzero" style={{ position: 'absolute', alignSelf: 'center', top: 35 }} />

                    <Svg height="5" width="100%" style={{ position: 'absolute', bottom: 45 }}>
                        <Line x1="0" y1="2" x2="100%" y2="2" stroke="#F2564A" strokeWidth="2" />
                    </Svg>
                    {/* <Svg height="60" width="60" style={{alignSelf: 'center'}}>
                        <Path d={'M 2 40 q 25 -60 50 0'} fill="none" stroke="#F2564A" strokeWidth="2" />
                    </Svg> */}
                </View>
            </PanGestureHandler>
        </Animated.View>
    )
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {setCatId},
        dispatch,
    );
};

const mapStateToProps = state => {
    return {
        selectedCatId: state.catHandler.selectedCatId
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CatSelect);


const styles = StyleSheet.create({
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