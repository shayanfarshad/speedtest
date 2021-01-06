import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity as TO,
    ScrollView,
    BackHandler,
    Image,
    Dimensions,
} from 'react-native';
import Share from 'react-native-share';

import Body from '../../components/Body';
import Header from '../../components/Header';
import { WebView } from 'react-native-webview';
import * as Stl from '../../components/styles';
import { H1, P, Label, H5, H4, H2, H3 } from '../../components/typo';
import macbg from '../../assets/img/macbg.png';
import BrowsingProcess from './Components/BrowsingProcess';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommandDlUp from './Components/dlupFn';
import { CommonActions } from '@react-navigation/native';
import logoType from '../../assets/img/logo.png';
import { getBrowserUrl } from './_test_services';
import { Icon } from 'native-base';
import { navigationRef } from '../../navigation';
import { captureScreen } from 'react-native-view-shot';
var RNFS = require('react-native-fs');
// import { H5 , P } from '../../components/typo';
const width = Dimensions.get('window').width;
function FullResult({ navigation, dlData, upData, streamData, browsingData, dataParam, maxDownloadSpeed, route }) {
    const [imageUri, setImageURI] = useState('')
    const [savedImagePath, setSavedImagePath] = useState('')
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            BackHandler.addEventListener(
                "hardwareBackPress",
                handleBack
            );
        })
        return unsubscribe;
        // console.log('data param',dataParam)
        // console.log('data haye dlData ', dlData)
        // console.log('data haye upData ', upData)
        // console.log('data haye streamData ', streamData)
    }, [navigation])
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', e => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBack
            );
        })
        return unsubscribe;
    }, [navigation])


    function handleBack() {

        navigation.navigate('Home')


    }
    function resetTest() {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        })
    }
    // const takeScreenShot = () => {
    //     // To capture Screenshot
    //     captureScreen({
    //       // Either png or jpg (or webm Android Only), Defaults: png
    //       format: 'jpg',
    //       // Quality 0.0 - 1.0 (only available for jpg)
    //       quality: 0.8, 
    //     }).then(
    //       //callback function to get the result URL of the screnshot
    //       (uri) => {
    //         setSavedImagePath(uri);
    //         setImageURI(uri);
    //       },
    //       (error) => console.error('Oops, Something Went Wrong', error),
    //     );
    //   };
    const onShare = async () => {
        captureScreen({
            // Either png or jpg (or webm Android Only), Defaults: png
            format: 'jpg',
            // Quality 0.0 - 1.0 (only available for jpg)
            quality: 0.8,
        }).then(
            //callback function to get the result URL of the screnshot
            (uri) => {
                setSavedImagePath(uri);
                setImageURI(uri);
            },
            (error) => console.error('Oops, Something Went Wrong', error),
        )
        RNFS.readFile(imageUri, 'base64').then((res) => {
            let urlString = 'data:image/jpeg;base64,' + res;
            let options = {
                title: 'Share Title',
                message: 'Share Message',
                url: urlString,
                type: 'image/jpeg',
            }

            Share.open(options)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && console.log(err);
                })
        })
    }
    return (
        <Body>
            <View style={{ flex: 0.15 }}>
                <Header title="نتیجه تست کامل" />
            </View>
            <ScrollView style={{ flex: 0.85 }}>
                <View style={{ flex: 0.3, backgroundColor: 'white', width: '100%' }}>
                    <View style={S.serverDetail}>
                        <P style={{ textAlign: 'center' }}>جزئیات تست انجام شده</P>
                    </View>
                    <View style={S.speedDetail}>
                        <View style={S.detailCard}>
                            <View style={S.detailLabel}>
                                <Icon name='sort-down' type='FontAwesome5' style={{ marginBottom: 10, marginRight: 5, fontSize: 25, color: "#D2AB67" }} />
                                <P style={{ fontSize: 14 }}>دانلود</P>
                            </View>
                            <View style={S.speed}>
                                <H5>{typeof (maxDownloadSpeed) === 'number' ? maxDownloadSpeed : '-'}</H5>
                                <P style={{ fontSize: 12 }}>Mb/s</P>
                                <P style={{ fontSize: 12 }}>Avg: {dlData ? dlData : '-'} Mb/s</P>
                            </View>
                        </View>
                        <View style={S.detailCard}>
                            <View style={S.detailLabel}>
                                <Icon name='sort-up' type='FontAwesome5' style={{ marginTop: 10, marginRight: 5, fontSize: 25, color: "#D2AB67" }} />
                                <P style={{ fontSize: 14 }}>آپلود</P>
                            </View>
                            <View style={S.speed}>
                                <H5>{typeof (upData) === 'number' ? upData : '-'}</H5>
                                <P style={{ fontSize: 12 }}>Mb/s</P>
                                <P style={{ fontSize: 12 }}>Avg:  {upData ? upData : '-'} Mb/s</P>

                            </View>
                        </View>
                        <View style={S.detailCard}>
                            <View style={S.detailLabel}>
                                <Icon name='sort' type='FontAwesome5' flip={'horizontal'} style={{ marginBottom: 0, transform: [{ rotate: '90deg' }], marginRight: 5, fontSize: 25, color: "#D2AB67" }} />
                                <P style={{ fontSize: 14 }}>تاخیر</P>
                            </View>
                            <View style={S.speed}>
                                <H5>{typeof (dataParam.maxPing) === 'number' && dataParam.maxPing !== null ? dataParam.maxPing : '-'}</H5>
                                <P style={{ fontSize: 12 }}>ms</P>
                                <P style={{ fontSize: 12 }}>Avg:  {dataParam.avgPing ? dataParam.avgPing : '-'} ms</P>
                                <P style={{ fontSize: 12 }}>Jit:  {dataParam.jitter ? dataParam.jitter : '-'} ms</P>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 30, zIndex: 1000 }}>
                    <View style={S.mainView}>
                        <View style={S.sideMain}>
                            <TO onPress={onShare} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <P>اشتراک گذاری</P>
                                <Icon name="share-alt" type="FontAwesome5" style={{ color: "#D2AB67" }} />
                            </TO>
                        </View>
                        <View style={S.centerCircle}>
                            <H4 style={{ color: 'white' }}>امتیاز شما</H4>
                            <H2 style={{ color: 'white' }}>33747</H2>
                        </View>
                        <View style={S.sideMain}>
                            <TO onPress={resetTest} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <P>شروع مجدد</P>
                                <Icon name="sync-alt" type="FontAwesome5" style={{ color: "#D2AB67" }} />
                            </TO>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={S.browsingView}>
                        <Icon name="globe" type='FontAwesome5' style={{ color: "#D2AB67" }} />
                        <H5>وب گردی</H5>
                        <H3>{typeof (browsingData.perf) === 'number' ? browsingData.perf : '-'} %</H3>
                        <P style={{ color: '#d6d6d6', fontSize: 10 }}>(نرخ عملکرد)</P>

                    </View>
                    <View style={S.browsingView}>
                        <Icon name="film" type='FontAwesome5' style={{ color: "#D2AB67" }} />
                        <H5>تماشای فیلم</H5>
                        <H3>{typeof (streamData.perf) === 'number' ? streamData.perf : '-'} %</H3>
                        <P style={{ color: '#d6d6d6', fontSize: 10 }}>(نرخ عملکرد)</P>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <TO style={S.complaintBtn}>
                        <H5 style={{ color: 'white' }}>ثبت شکایت</H5>
                    </TO>
                </View>
            </ScrollView>
        </Body>
    );
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => {
    return {
        maxDownloadSpeed: state ? state.paramHandler.maxDownloadSpeed : '',
        dataParam: state.paramHandler.dataParam !== null ? state.paramHandler.dataParam : '',
        streamData: state ? state.paramHandler.streamData : '',
        browsingData: state ? state.paramHandler.browsingData : '',
        dlData: state ? state.paramHandler.lastDownloadSpeed : '',
        upData: state ? state.paramHandler.lastUpSpeed : '',
        selectedCatId: state ? state.catHandler.selectedCatId : '',
    };
};

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(FullResult);
export default connect(mapStateToProps, mapDispatchToProps)(FullResult);

const S = StyleSheet.create({
    serverDetail: {
        height: 40,
        justifyContent: 'center',
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#D2AB67',
        backgroundColor: '#5e5e5e'
    },
    speedDetail: {
        // height: 130,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 3,
        borderBottomColor: '#D2AB67',
        justifyContent: 'space-around',
        backgroundColor: '#5e5e5e'

    },
    detailCard: {
        width: '30%',
        height: '100%',
        // borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    detailLabel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        width: '100%',
        height: 40
    },
    speed: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainView: {
        width: '100%',
        height: width * 0.25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 3,
        // marginBottom:30,
        borderTopWidth: 3,
        borderColor: '#D2AB67',
        backgroundColor: '#5e5e5e'
    },
    sideMain: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerCircle: {
        width: width * 0.5,
        height: width * 0.5,
        borderRadius: 100,
        borderWidth: 3,
        position: 'absolute',
        left: '25%',
        bottom: -0.125 * width,
        backgroundColor: '#D2AB67',
        borderColor: '#3b3a3a',
        justifyContent: 'center',
        alignItems: 'center'
    },
    browsingView: {
        backgroundColor: '#5e5e5e',

        width: '47.5%',
        height: 200,
        paddingVertical: 30,
        borderBottomColor: '#D2AB67',
        borderBottomWidth: 3,
        borderTopWidth: 3,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: "#D2AB67"

    },
    complaintBtn: {
        backgroundColor: '#F2564A',
        // borderColor:'#D2AB67',
        // borderWidth:3,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: 40,
        borderRadius: 15
    }

})