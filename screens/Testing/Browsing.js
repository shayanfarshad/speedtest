import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    ScrollView,
    Image,
    BackHandler,
    Modal
} from 'react-native';
import Body from '../../components/Body';
import Header from '../../components/Header';
import { WebView } from 'react-native-webview';
import * as Stl from '../../components/styles';
import { H1, P, Label } from '../../components/typo';
import macbg from '../../assets/img/macbg.png';
import BrowsingProcess from './Components/BrowsingProcess';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommandDlUp from './Components/dlupFn';
import { CommonActions } from '@react-navigation/native';
import logoType from '../../assets/img/logo.png';
import { getBrowserUrl, submitBrowsingResult } from './_test_services';
import setBrowsingData from '../../store/actions/setBrowsingData';
import CloseModal from '../../components/Modal';
import SaveResult from './Components/saveResults';
import CalPingParams from './Components/ping';
// import setBrowsingData from '../../store/actions/setBrowsingData'
import { setDataPath, setDownloadMaxSpeed, setDownloadSpeed } from '../../store/actions/paramAction'
import Geolocation from '@react-native-community/geolocation';
const BrowseReuslt = ({ title, weight, loadtime, pr, hasBorder, isBegin }) => {
    return (
        <View
            style={[
                s.TblRow,
                ,
                hasBorder
                    ? { borderBottomColor: '#fff', borderBottomWidth: 1, paddingBottom: 10 }
                    : {},
            ]}>
            <View style={[s.TblChilds, { flex: 0.25 }]}>
                <Label
                    style={{ color: '#fff', textAlign: hasBorder ? 'left' : 'center' }}>
                    {hasBorder ? pr : (pr >= 100 ? '100%' : (loadtime >= 10 ? 'timeout' : pr !== null && typeof pr !== 'undefined' ? Number(pr).toFixed(2) + ' %' : '-'))}
                </Label>
            </View>
            <View style={[s.TblChilds, { flex: 0.15 }]}>
                <Label style={{ color: '#fff', textAlign: 'center' }}>{loadtime !== null ? loadtime + ' s' : '-'}</Label>
            </View>
            <View style={[s.TblChilds, { flex: 0.25 }]}>
                <Label style={{ color: '#fff', textAlign: 'center' }}>
                    {loadtime !== null ? weight : '-'}
                </Label>
            </View>
            <View style={[s.TblChilds, { flex: 0.35 }]}>
                <Label style={{ color: '#fff' }}>
                    {isBegin ? title : hasBorder ? title : null}
                </Label>
            </View>
        </View>
    );
};

function WebBrowsing({ navigation, selectedCatId, setBrowsingData, setDataPath, setDownloadMaxSpeed, setDownloadSpeed }) {
    const [isLoading, setLoading] = useState(false);
    const [isMount, setMount] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentLocation, setCurrentLocation] = useState({});
    const [beginTime, setBeginTime] = useState(null);
    // const [endTime, setEndTime] = useState(null);
    const [dlSpeed, setDlSpeed] = useState(null);
    const [modalVisible, setModalVisible] = useState(false)
    const [question, setQuestion] = useState('تست متوقف شود؟')
    const [maxDlSpeed, setMaxDlSpeed] = useState(null)
    const [web, setWeb] = useState([
        {
            url: null,
            time: null,
            weight: null,
            pr: null,
            begin: false,
        },
        {
            url: null,
            time: null,
            weight: null,
            pr: null,
            begin: false,
        },
        {
            url: null,
            time: null,
            weight: null,
            pr: null,
            begin: false,
        },
        {
            url: null,
            time: null,
            weight: null,
            pr: null,
            begin: false,
        },
        {
            url: null,
            time: null,
            weight: null,
            pr: null,
            begin: false,
        }
    ]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            Geolocation.getCurrentPosition(info => setCurrentLocation({ lat: info.coords.latitude, lng: info.coords.longitude }));

            BackHandler.addEventListener(
                "hardwareBackPress",
                handleBack
            );
            CommandDlUp('dl').then(re => {
                // console.log(re, 'javadddd')
                setDlSpeed(Number(re.avg));
                setMaxDlSpeed(Number(re.max))
                getBrowserUrl().then(res => {
                    if (res.status === 200) {
                        var webpages = new Array();
                        for (let i = 0; i < res.data.length; i++) {
                            var item = new Object();
                            item.id = res.data[i].Id
                            item.url = res.data[i].Url;
                            item.weight = res.data[i].PageWeight;
                            item.time = null;
                            item.pr = null;
                            item.begin = false;
                            webpages.push(item);
                        }
                        // console.log(res)
                        setWeb(webpages);
                        setCurrentIndex(0);
                        setBeginTime(null);
                        setMount(true);
                    }
                });
            });

            return unsubscribe;
        });
    }, [navigation]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', e => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBack
            );
            setMount(false);
            setCurrentIndex(0)
            setWeb([
                {
                    url: null,
                    time: null,
                    weight: null,
                    pr: null,
                    begin: false,
                },
                {
                    url: null,
                    time: null,
                    weight: null,
                    pr: null,
                    begin: false,
                },
                {
                    url: null,
                    time: null,
                    weight: null,
                    pr: null,
                    begin: false,
                },
                {
                    url: null,
                    time: null,
                    weight: null,
                    pr: null,
                    begin: false,
                },
                {
                    url: null,
                    time: null,
                    weight: null,
                    pr: null,
                    begin: false,
                },
            ]);
        });
        return unsubscribe;
    }, [navigation]);
    // function onShouldStartLoadWithRequest(navigator) {
    //     if (navigator.url.indexOf(INTERCEPT_URL) === -1) {
    //         return true;
    //     } else {
    //         webviewRef.stopLoading(); //Some reference to your WebView to make it stop loading that URL
    //         return false;
    //     }
    // }
    function handleBack() {
        setQuestion('تست متوقف شود؟')
        setModalVisible(true)
        return true;
    }
    return (
        <Body>
            <View style={{ flex: 0.15 }}>
                <Header title="سنجش وبگردی" />
            </View>

            <ScrollView style={{ flex: 0.85 }}>
                <CloseModal navigation={navigation} setVisible={setModalVisible} visible={modalVisible} question={question} />
                <View style={{ alignItems: 'center' }}>
                    <BrowsingProcess stage={currentIndex} />
                    <ImageBackground
                        source={macbg}
                        style={{
                            width: 300,
                            height: 251,
                            alignItems: 'center',
                            paddingTop: 12,
                            marginBottom: 20,
                        }}
                        resizeMode="contain">
                        <View style={{ width: 274, height: 159, backgroundColor: '#393b44' }}>
                            {isMount ? (
                                <WebView

                                    source={{ uri: web[currentIndex].url }}
                                    javaScriptEnabled={true}
                                    style={{ width: 274, height: 159, resizeMode: 'cover' }}
                                    injectedJavaScript={`
                                            var meta = document.createElement('meta');
                                            var content = 'width=device-width, initial-scale= 0.2' ;
                                            meta.setAttribute('name', 'viewport');
                                            meta.setAttribute('content', content);
                                            document.getElementsByTagName('head')[0].appendChild(meta);
                                        `}
                                    scrollEnabled={false}
                                    cacheMode='LOAD_NO_CACHE'
                                    // onShouldStartLoadWithRequest={(syntheticEvent) => {
                                    //     const url = syntheticEvent.url
                                    //     // Needed on iOS for the initial load
                                    //     if (url === URL_PREFIX + OFFLINE_CACHE_PATH) {
                                    //         return true
                                    //     }

                                    //     this.onLinkPress(url)

                                    //     return false
                                    // }
                                    // }
                                    // cacheMode={'LOAD_NO_CACHE'}
                                    // onError={(syntheticEvent) => {
                                    //     const { nativeEvent } = syntheticEvent;
                                    //     console.warn('WebView error: ', nativeEvent);
                                    // }}
                                    // injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
                                    onLoadStart={(syntheticEvent) => {
                                        let t = web;
                                        t[currentIndex].begin = true;
                                        setWeb(t);
                                        var start = Date.now();
                                        // console.log('start', start)
                                        setBeginTime(start);
                                        setLoading(true)

                                    }}

                                    onLoadEnd={(syntheticEvent) => {
                                        // setLoading(nativeEvent.loading)
                                        // var end = beginTime;
                                        // console.log('end loading',nativeEvent.loading)
                                        if (isLoading) {
                                            var loadTime = (Date.now() - beginTime) / 1000;
                                            // console.log('load time',loadTime)
                                            let t = web;
                                            // var loadTime = (end - beginTime) / 1000
                                            // console.log('load time', loadTime / 1000)
                                            t[currentIndex].time = loadTime.toFixed(2);
                                            var commonDlSpeed = dlSpeed / 8; // MB/s
                                            //console.log('dlspeed', commonDlSpeed)
                                            var currentDlSpeed = ((t[currentIndex].weight) / 1000000) / loadTime; // MB/s
                                            // console.log('dlspeed current', currentDlSpeed)

                                            t[currentIndex].pr = ((currentDlSpeed / commonDlSpeed) * 100)

                                            // console.log('amirrrr', t[currentIndex].pr)

                                            // t[currentIndex].pr =
                                            //   (
                                            //     ((endTime - beginTime) /
                                            //       1000 /
                                            //       (t[currentIndex].weight /
                                            //         1000000 /
                                            //         (dlSpeed / 8))) *
                                            //     100
                                            //   ).toFixed(2) + ' %';
                                            setWeb(t);
                                            setLoading(false)
                                            if (currentIndex + 1 < web.length) {
                                                setCurrentIndex(currentIndex + 1);
                                            } else {
                                                var sum = 0;
                                                var arr = new Array()
                                                for (let i = 0; i < web.length; i++) {
                                                    if (typeof (web[i].pr) === 'number') {
                                                        if (web[i].pr > 100) {
                                                            arr.push(100)
                                                            sum += 100
                                                        } else {
                                                            arr.push(web[i].pr)
                                                            sum += web[i].pr
                                                        }
                                                    }
                                                    // for(let j=0; j<arr.length; j++){
                                                    //     sum = arr[i] + 
                                                    // }
                                                }
                                                console.log('sum', sum)
                                                console.log('arr', arr)
                                                setBrowsingData({
                                                    perf: Number((sum / arr.length).toFixed(2)),
                                                })
                                                setMount(false);
                                                setTimeout(async () => {
                                                    if (selectedCatId == 2) {
                                                        navigation.navigate('StreamingScreen');
                                                        // navigation.navigate('PrepareScreen', {
                                                        //     nextPage: 'StreamingScreen',
                                                        //     title: 'سنجش پخش ویدیو',
                                                        //     // id:Id
                                                        // });
                                                    } else {
                                                        // <CloseModal navigation={navigation} visible={true} question={question} />
                                                        // setQuestion('تست به اتمام رسید، خارج می شوید ؟')
                                                        // setModalVisible(true)
                                                        var data = await CalPingParams('158.58.187.188');
                                                        setDataPath(data)
                                                        setDownloadMaxSpeed(maxDlSpeed)
                                                        setDownloadSpeed(dlSpeed)
                                                        try {
                                                            await new SaveResult().DlUpload(
                                                                dlSpeed,
                                                                maxDlSpeed,
                                                                0,
                                                                data.avgPing,
                                                                data.maxPing,

                                                                // data.pingArray[0],
                                                                data.pingArray[data.pingArray.length - 1],
                                                                data.jitter,
                                                                data.plr.toString(),
                                                                selectedCatId,
                                                                Number((sum / arr.length).toFixed(2)),
                                                                0
                                                            ).then(() => {
                                                              
                                                                var arr = new Array();
                                                                for (let i = 0; i < web.length; i++) {
                                                                    var obj = new Object()
                                                                    obj.SiteId = web[i].id;
                                                                    obj.SrvAddr = web[i].url;
                                                                    obj.LoadTime = web[i].time.toString();
                                                                    obj.PageWeight = web[i].weight.toString();
                                                                    obj.PR = web[i].pr.toString();
                                                                    obj.Lat = currentLocation.lat;
                                                                    obj.Lng = currentLocation.lng;
                                                                    arr.push(obj)
                                                                }
                                                                let body ={
                                                                    "submitWebs":arr
                                                                }
                                                                console.log('arr',arr)
                                                                submitBrowsingResult(body).then(res=>{
                                                                    console.log('res browsing',res)
                                                                }).catch(err=>{
                                                                    console.log('errererer',err)
                                                                })
                                                                navigation.dispatch(
                                                                    CommonActions.reset({
                                                                        index: 6,
                                                                        routes: [{ name: 'Result' }],
                                                                    }),
                                                                );
                                                            })
                                                        } catch (error) {
                                                            console.log('error')
                                                        }


                                                    }

                                                }, 5000)

                                            }
                                        }
                                    }}

                                    onMessage={event => {

                                        // console.log(event)
                                    }}
                                />
                            ) : (
                                    <Image
                                        source={logoType}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            flex: 1,
                                        }}
                                        resizeMode="contain"
                                    />
                                )}
                        </View>
                    </ImageBackground>
                    <ActivityIndicator
                        color={'#fff'}
                        size={'small'}
                        style={{ opacity: isLoading ? 1 : 0 }}
                    />
                    <BrowseReuslt
                        title="نشانی"
                        weight="حجم صفحه"
                        loadtime="زمان"
                        pr="نرخ عملکرد"
                        hasBorder={true}
                    />
                    {web.length &&
                        web.map((i, j) => {
                            return (
                                <BrowseReuslt
                                    title={i.url}
                                    weight={(i.weight / 1000000).toFixed(2) + ' MB'}
                                    loadtime={i.time}
                                    pr={i.pr}
                                    key={j}
                                    isBegin={i.begin}
                                />
                            );
                        })}
                </View>
            </ScrollView>
        </Body>
    );
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setBrowsingData: setBrowsingData,
        setDataPath,
        setDownloadMaxSpeed,
        setDownloadSpeed
    }, dispatch);
};

const mapStateToProps = state => {
    return {
        dataParam: state.paramHandler.dataParam,
        selectedCatId: state.catHandler.selectedCatId,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WebBrowsing);

// export default WebBrowsing;

const s = StyleSheet.create({
    TblRow: {
        flexDirection: 'row',
        margin: 10,
    },
    TblChilds: {},
});
