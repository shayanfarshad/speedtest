import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, TouchableOpacity as TO } from 'react-native'
import * as Stl from '../../../../components/styles';
import Svg, { SvgXml, Line } from 'react-native-svg';
import callImg from '../../../../assets/img/catIcons/call';
import fullImg from '../../../../assets/img/catIcons/full';
import gameImg from '../../../../assets/img/catIcons/game';
import speedImg from '../../../../assets/img/catIcons/speed';
import videoImg from '../../../../assets/img/catIcons/video';
import webImg from '../../../../assets/img/catIcons/web';
import p2 from '../../../../assets/img/catIcons/p2';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCatId } from '../../../../store/actions/catActions';
import Carousel from 'react-native-snap-carousel';

function CatSelect(props) {
    const cr = React.useRef()
    const windowWidth = Dimensions.get('window').width;
    const rob = windowWidth / 5
    const [active, setActive] = useState(2)
    const fading = useRef(new Animated.Value(0)).current;
    const [list, setList] = useState([
        {
            id: 0,
            name: 'بازی',
            iName: gameImg
        },
        {
            id: 1,
            name: 'تماشای فیلم',
            iName: videoImg
        },
        {
            id: 2,
            name: 'تست کامل',
            iName: fullImg
        },
        {
            id: 3,
            name: 'تماس اینترنتی',
            iName: callImg
        },
        {
            id: 4,
            name: 'سرعت',
            iName: speedImg
        },
        {
            id: 5,
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

    return (
        <Animated.View style={{ height: 122, opacity: fading }}>
            <Carousel
                ref={cr}
                // loop={true}
                // loopClonesPerSide={}
                data={list}
                // onSnapToItem={(e) => {
                //     setActive(e);
                //     props.setCatId(e)
                //     // setActive(e + 1)
                //     // props.setCatId(e + 1)
                //     // console.log(cr)
                //     // cr.current.snapToNext();
                // }}
                onBeforeSnapToItem={(e) => {
                    setActive(e);
                    props.setCatId(e)
                }}
                useScrollView={true}
                firstItem={2}
                renderItem={(i) => {
                    var tt = active
                    return (
                        <TO
                            onPress={() => {
                                setActive(i.index)
                                props.setCatId(i.index)
                                cr.current.snapToItem(i.index)
                            }}
                            style={{
                                paddingTop: 15,
                                // marginHorizontal: 10,
                                height: 100,
                                alignItems: 'center'
                            }}
                        >
                            <SvgXml xml={i.item.iName} width={i.item.id === tt ? 35 : 30} height={i.item.id === tt ? 35 : 30} fill={i.item.id === tt ? '#F2564A' : '#fff'} fillOpacity="1" fillRule="nonzero" style={{ top: i.item.id === tt ? 0 : 10 }} />
                            <Text style={[Stl.fontB, { color: i.item.id === tt ? '#F2564A' : '#fff', fontSize: i.item.id === tt ? 12 : 10, top: i.item.id === tt ? 30 : 40, textAlign: 'center' }]}>
                                {i.item.name}
                            </Text>
                        </TO>
                    )
                }}
                sliderWidth={windowWidth}
                itemWidth={rob+ 5}
            />
            <SvgXml xml={p2} width="40" height="40" fillOpacity="1" fillRule="nonzero" style={{ position: 'absolute', alignSelf: 'center', top: 40 }} />
            <Svg height="5" width="100%" style={{ position: 'absolute', bottom: 45 }}>
                <Line x1="0" y1="2" x2="100%" y2="2" stroke="#F2564A" strokeWidth="2" />
            </Svg>
        </Animated.View>
    )

}


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { setCatId },
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
