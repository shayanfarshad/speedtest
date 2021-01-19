import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity as TO,
    BackHandler,
    Image,
    Dimensions,
} from 'react-native';
import Share from 'react-native-share';
import moment from 'moment-jalaali';
import { Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { ScrollView } from 'react-native-gesture-handler';
import logo from '../../assets/img/logo.png';
import Body from '../../components/Body';
import Header from '../../components/Header';
import { WebView } from 'react-native-webview';
import * as Stl from '../../components/styles';
import { H1, P, Label, H5, H4, H2, H3 } from '../../components/typo';
import macbg from '../../assets/img/macbg.png';
import NetState from '../../components/NetState';

import BrowsingProcess from './Components/BrowsingProcess';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommandDlUp from './Components/dlupFn';
import { CommonActions } from '@react-navigation/native';

import { doSaveResult, getBrowserUrl } from './_test_services';
import { navigationRef } from '../../navigation';
import { captureScreen } from 'react-native-view-shot';
import LinearGradient from 'react-native-linear-gradient';
import { userHandler } from '../../store/reducers/userReducer';
import AsyncStorage from '@react-native-community/async-storage';
import AppAlert from '../../utils';
var RNFS = require('react-native-fs');
// import { H5 , P } from '../../components/typo';
const width = Dimensions.get('window').width;


function FullResult({ userScore, navigation, dlData, upData, streamData, browsingData, dataParam, maxDownloadSpeed, route }) {
    var pageShot = useRef();
    const [dlSpeed, setDlSpeed] = useState(0);
    const [upSpeed, setUpSpeed] = useState(0);
    const [starCount, setStarCount] = useState(2);
    const [ping, setPing] = useState(0);
    const [jitter, setJitter] = useState(0);
    const [packetLoss, setPacketLoss] = useState(0);
    const [currentCar, setCurrentCar] = useState('')
    const [currentIp, setCurrentIp] = useState('')
    const [currentType, setCurrentType] = useState('')
    const [imageUri, setImageURI] = useState('')
    const [options, setOption] = useState(null)
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
        ).then(() => {
            RNFS.readFile(imageUri, 'base64').then((res) => {
                let urlString = 'data:image/jpeg;base64,' + res;
                let options = {
                    title: 'نت سنج',
                    message: 'نتیجه تست سرعت',
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

        })

    }
    function ratingCompleted(value) {
        setStarCount(value);
    }

    // useEffect(()=>{
    //     if (AsyncStorage.getItem('token') == null) {
    //         AppAlert('','می توانید برای کسب امتیاز کاربری خود را فعال کنید',2000)
    //     }

    // })

    return (
        //<ViewShot captureMode="mount" ref={ref => pageShot = ref} style={{ flex: 1 }}>
        <Body style={{ flex: 1 }}>
            {console.log('userScore', userScore)}
            <ScrollView>
                <View style={{ flex: 0.15 }}>
                    <Header />
                    <H3 style={[{ textAlign: 'center', marginTop: -20 }, Stl.Primary]}>
                        نتایج سنجش
          </H3>
                </View>
                <View style={{ flex: 0.85 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.5, justifyContent: 'center' }}>
                            <View
                                style={{
                                    flexDirection: 'row-reverse',
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                }}>
                                <H1
                                    style={[
                                        Stl.lightBlue,
                                        { textAlign: 'center', marginBottom: 10 },
                                    ]}>
                                    آپلود
                </H1>
                                <Icon
                                    name="caretup"
                                    type="antdesign"
                                    color={Stl.lightBlue.color}
                                    size={16}
                                    style={{ top: -2 }}
                                />
                            </View>

                            <H1
                                style={{ color: '#fff', textAlign: 'center', marginBottom: 10 }}>
                                {upData ? upData : '-'}
                            </H1>
                            <H3 style={{ color: '#fff', textAlign: 'center' }}>Mbps</H3>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'center' }}>
                            <View
                                style={{
                                    flexDirection: 'row-reverse',
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                }}>
                                <H1
                                    style={[Stl.Green, { textAlign: 'center', marginBottom: 10 }]}>
                                    دانلود
                </H1>
                                <Icon
                                    name="caretdown"
                                    type="antdesign"
                                    color={Stl.Green.color}
                                    size={16}
                                    style={{ top: -5 }}
                                />
                            </View>

                            <H1
                                style={{ color: '#fff', textAlign: 'center', marginBottom: 10 }}>
                                {dlData ? dlData : '-'}
                            </H1>
                            <H3 style={{ color: '#fff', textAlign: 'center' }}>Mbps</H3>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20,
                        }}>
                        <View
                            style={{
                                flex: 0.33,
                                justifyContent: 'center',
                                borderRightWidth: 1,
                                borderRightColor: '#fff',
                            }}>
                            <Label style={{ color: '#fff', textAlign: 'center' }}>
                                Ping: {dataParam.avgPing ? dataParam.avgPing : '-'} ms
              </Label>
                        </View>
                        <View
                            style={{
                                flex: 0.33,
                                justifyContent: 'center',
                                borderRightWidth: 1,
                                borderRightColor: '#fff',
                            }}>
                            <Label style={{ color: '#fff', textAlign: 'center' }}>
                                Jitter:  {dataParam.jitter ? dataParam.jitter : '-'} ms
              </Label>
                        </View>
                        <View style={{ flex: 0.33, justifyContent: 'center' }}>
                            <Label style={{ color: '#fff', textAlign: 'center' }}>
                                PacketLoss: {dataParam.plr ? dataParam.plr : '-'}
                                {dataParam.plr !== 0 ? '%' : ''}
                            </Label>
                        </View>
                    </View>
                    <View
                        style={{
                            height: 160,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                backgroundColor: '#2A3039',
                                height: 100,
                                // flex: 1,
                                // overflow:'scroll',
                                // marginTop: 50,
                                borderRadius: 40,
                                alignSelf: 'center',
                                width: '90%',
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 10,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                            <View style={{ flex: 0.3 }}>
                                <TO
                                    onPress={() => onShare()}

                                >
                                    <Icon
                                        name={'sharealt'}
                                        type={'antdesign'}
                                        color={'#fff'}
                                        size={25}
                                    />
                                    <P style={{ color: '#fff', textAlign: 'center' }}>
                                        اشتراک گذاری
                  </P>
                                </TO>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <TO
                                    onPress={() => {
                                        navigation.navigate('Home');
                                    }}>
                                    <Icon
                                        name={'reload1'}
                                        type={'antdesign'}
                                        color={'#fff'}
                                        size={25}
                                    />
                                    <P style={{ color: '#fff', textAlign: 'center' }}>شروع مجدد</P>
                                </TO>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 0.4,
                                shadowColor: '#000',
                                borderRadius: 1000000,
                                position: 'absolute',
                                // zIndex: 1000,
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 10,
                            }}>
                            <LinearGradient
                                colors={['#141719', '#494E55']}
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: 1000000,
                                    justifyContent: 'center',
                                }}
                                start={{ x: 0.0, y: 0.25 }}
                                end={{ x: 0.5, y: 1.0 }}>
                                <TO onPress={() => navigation.navigate('Scores')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={logo} style={{ width: 50, height: 50, alignSelf: 'center' }} resizeMode="contain" />
                                    <P style={{ color: 'white' }}>{userScore}</P>
                                </TO>
                                {/* <H2 style={[{textAlign: 'center', marginTop: 20}, Stl.Primary]}>
                  امتیاز سرویس
                </H2>
                <H1 style={[{textAlign: 'center'}, Stl.Primary]}>۱۰۰</H1> */}
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <P style={{ color: '#fff', textAlign: 'center' }}>سرویس دهنده</P>
                        {/* <Image style={{ width: 100, height: 120 }} /> */}
                        <P
                            style={{
                                color: '#fff',
                                textAlign: 'center',
                                fontSize: 24,
                                marginVertical: 10,
                                marginHorizontal: 20
                            }}>
                            {currentCar}
                        </P>
                        <P style={{ color: '#fff', textAlign: 'center', marginBottom: 10 }}>
                            امتیاز شما به خدمات این شرکت :</P>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={25}
                            fullStarColor="yellow"
                            containerStyle={{ width: '50%' }}
                            rating={starCount}
                            selectedStar={rating => ratingCompleted(rating)}
                        />
                    </View>
                    <View style={{ width: '100%', marginTop: 15 }}>
                        <H3 style={{ color: '#fff', textAlign: 'center' }}>جزئیات سنجش</H3>
                        <View style={{ width: '95%', marginHorizontal: '2.5%', marginTop: 20 }}>
                            <NetState fade={false} ip operator tech server device />
                            {/* <NetState setCarr={(e) => { setCurrentCar(e) }} setCurrentIp={(e)=>{setCurrentIp(e)}} setCurrentType={(e)=>{setCurrentType(e)}} /> */}
                        </View>
                        <View style={{ width: '95%', marginHorizontal: '2.5%' }}>
                            {/* <View style={styles.list}>
                                <P style={Stl.Light}>سرور</P>
                                <P style={Stl.Light}>ایران</P>
                            </View> */}
                            <View style={styles.list}>
                                <P style={Stl.Light}>تماشای ویدیو (نرخ عملکرد)</P>
                                <P style={Stl.Light}>{typeof (streamData.perf) === 'number' ? streamData.perf : '-'} %</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>وبگردی (نرخ عملکرد)</P>
                                <P style={Stl.Light}>{typeof (browsingData.perf) === 'number' ? browsingData.perf : '-'} %</P>
                            </View>
                            {/* <View style={styles.list}>
                                <P style={Stl.Light}>اپراتور</P>
                                <P style={Stl.Light}>{currentCar}</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>تکنولوژی</P>
                                <P style={Stl.Light}>{currentType}</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>آی پی شما</P>
                                <P style={Stl.Light}>{currentIp}</P>
                            </View> */}
                            <View style={styles.list}>
                                <P style={Stl.Light}>موقعیت مکانی</P>
                                <P style={Stl.Light}>{dataParam.lat}</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>دانلود بیت ریت(حداکثر)</P>
                                <P style={Stl.Light}>{maxDownloadSpeed !== '' ? maxDownloadSpeed : '-'} Mb/s</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>دانلود بیت ریت(میانگین)</P>
                                <P style={Stl.Light}>{dlData ? dlData : '-'} Mb/s</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>آپلود بیت ریت(حداکثر)</P>
                                <P style={Stl.Light}>{upData ? upData : '-'} Mb/s</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>آپلود بیت ریت(میانگین)</P>
                                <P style={Stl.Light}>{upData ? upData : '-'} Mb/s</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>میزان تاخبر (حداقل)</P>
                                <P style={Stl.Light}>{dataParam.avgPing ? dataParam.avgPing : '-'}</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>میزان تاخبر (حداکثر)</P>
                                <P style={Stl.Light}>{dataParam.maxPing ? dataParam.maxPing : '-'}</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>میزان تاخبر (جیتر)</P>
                                <P style={Stl.Light}>{dataParam.jitter ? dataParam.jitter : '-'}</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>پینگ</P>
                                <P style={Stl.Light}>{dataParam.avgPing ? dataParam.avgPing : '-'}</P>
                            </View>
                            <View style={styles.list}>
                                <P style={Stl.Light}>اتلاف بسته</P>
                                <P style={Stl.Light}>{dataParam.plr ? dataParam.plr : '-'} %</P>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Body>
        // </ViewShot>
    );
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => {
    return {
        userScore: state.userHandler.userScore,
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
