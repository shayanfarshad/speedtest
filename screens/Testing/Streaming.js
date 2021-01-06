import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, ScrollView, BackHandler } from 'react-native';
import Body from '../../components/Body';
import Header from '../../components/Header';
import { WebView } from 'react-native-webview';
import * as Stl from '../../components/styles';
import { H1, P, Label } from '../../components/typo';
import tv from '../../assets/img/tv.png';
import BrowsingProcess from './Components/BrowsingProcess';
import Video from 'react-native-video';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getVideoUrl, submitStreamingResult } from './_test_services';
import setStreamData from '../../store/actions/setStreamData';
import CloseModal from '../../components/Modal';
import { setDataPath, setDownloadMaxSpeed, setDownloadSpeed } from '../../store/actions/paramAction'
import CommandDlUp from './Components/dlupFn';
import CalPingParams from './Components/ping';
import SaveResult from './Components/saveResults';
import Geolocation from '@react-native-community/geolocation';


const VideoReuslt = ({ title, td1, td2, td3, hasBorder }) => {
    return (
        <View style={[s.TblRow, , hasBorder ? { borderBottomColor: '#fff', borderBottomWidth: 1, paddingBottom: 10 } : {}]}>
            <View style={[s.TblChilds, { flex: 0.2 }]}>
                <Label style={{ color: '#fff', textAlign: 'center' }}>{td3 !== null ? td3 : '-'}</Label>
            </View>
            <View style={[s.TblChilds, { flex: 0.2 }]}>
                <Label style={{ color: '#fff', textAlign: 'center' }}>{td2 !== null ? td2 : '-'}</Label>
            </View>
            <View style={[s.TblChilds, { flex: 0.2 }]}>
                <Label style={{ color: '#fff', textAlign: 'center' }}>{td1 !== null ? td1 : '-'}</Label>
            </View>
            <View style={[s.TblChilds, { flex: 0.4 }]}>
                <Label style={{ color: '#fff', textAlign: 'right' }}>{title}</Label>
            </View>
        </View>
    )
}


function Streaming({ navigation, selectedCatId, setStreamData, setDataPath, setDownloadMaxSpeed, setDownloadSpeed }) {
    const player = React.createRef();
    const [isLoading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentLocation, setCurrentLocation] = useState({});
    const [isDone, setDone] = useState(false);
    const [isMount, setMount] = useState(false)
    const [loadTime, setLoadTime] = useState(null)
    const [ tempStartInit, setTempStartInit] = useState(null);
    const [tempEndInit, setTempEndInit] = useState(null);
    const [tempEndVid, setTempEndVid] = useState(null);
    const [modalVisible, setModalVisible] = useState(false)
    const [dlSpeed, setDlSpeed] = useState(null);
    const [maxDlSpeed, setMaxDlSpeed] = useState(null)
    const [question, setQuestion] = useState('تست متوقف شود؟')


    const [vid, setVid] = useState([{
        videoUrl: null,
        loadingTime: null,
        bufferTime: null,
        totalTime: null,
        size: null,
        pr: null,
        isLoading: false
    }, {
        videoUrl: null,
        loadingTime: null,
        bufferTime: null,
        totalTime: null,
        size: null,
        pr: null,
        isLoading: false
    }, {
        videoUrl: null,
        loadingTime: null,
        bufferTime: null,
        totalTime: null,
        size: null,
        pr: null,
        isLoading: false
    },])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', (e) => {
            Geolocation.getCurrentPosition(info => setCurrentLocation({ lat: info.coords.latitude, lng: info.coords.longitude }));
            BackHandler.addEventListener(
                "hardwareBackPress",
                handleBack
            );
            CommandDlUp('dl').then(re => {
                // console.log(re, 'javadddd')
                setDlSpeed(Number(re.avg))
                setMaxDlSpeed(Number(re.max))
                getVideoUrl().then(res => {
                    if (res.status === 200) {
                        // console.log('res url', res.data)
                        var VideoUrl = new Array();

                        for (let i = 0; i < res.data.length; i++) {
                            var item = new Object();
                            item.Id = res.data[i].Id;
                            item.videoUrl = res.data[i].videoUrl;
                            item.loadingTime = null;
                            item.totalTime = res.data[i].TotalTime;
                            item.bufferTime = null;
                            item.pr = null;
                            item.size = res.data[i].Size;
                            item.isLoading = false;
                            VideoUrl.push(item)
                        }

                        // console.log('video', VideoUrl)
                        setVid(VideoUrl)
                    }
                })
                setMount(true)
                setLoading(false)
                setCurrentIndex(0)
                setDone(false)
                setTempStartInit(null)
                setTempEndInit(null)
                setTempEndVid(null)
            });
            return unsubscribe;
        })
    }, [navigation]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', (e) => {
            setMount(false)
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBack
            );
        });
        return unsubscribe;
    }, [navigation]);

    // useEffect(()=>{
    //     const backAction = () => {
    //       props.navigation.navigate('Home')
    //       return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //       "hardwareBackPress",
    //       backAction
    //     );

    //     return () => backHandler.remove();
    //   },[])
    // const [vid, setVid] = useState([
    //     {
    //         videoUrl: 'https://as1.cdn.asset.aparat.com/aparat-video/2eccb82f785f7e77f5b943b1be176d2725069348-240p.mp4',
    //         loadingTime: null,
    //         bufferTime: null,
    //         size: '291 KB',
    //         pr: null,
    //         isLoading: false
    //     },
    //     {
    //         videoUrl: 'https://as1.cdn.asset.aparat.com/aparat-video/2eccb82f785f7e77f5b943b1be176d2725069348-480p.mp4',
    //         loadingTime: null,
    //         bufferTime: null,
    //         size: '822 KB',
    //         pr: null,
    //         isLoading: false
    //     },
    //     {
    //         videoUrl: 'https://hw1.cdn.asset.aparat.com/aparat-video/2eccb82f785f7e77f5b943b1be176d2725069348-720p.mp4',
    //         loadingTime: null,
    //         bufferTime: null,
    //         size: '1.6 MB',
    //         pr: null,
    //         isLoading: false
    //     }
    // ])

    function handleBack() {
        setQuestion('تست متوقف شود؟')
        setModalVisible(true)
        return true;
    }
    return (
        <Body>
            <View style={{ flex: 0.15 }}>
                <Header title="سنجش تماشای فیلم و ویدئو" />
            </View>
            <ScrollView style={{ flex: 0.85 }}>
                <CloseModal navigation={navigation} setVisible={setModalVisible} visible={modalVisible} question={question} />

                <View style={{ alignItems: 'center' }}>
                    <BrowsingProcess stage={isDone ? 3 : currentIndex} sections={'3'} />
                    <ImageBackground source={tv} style={{ width: 360, height: 251, alignItems: 'center', paddingTop: 7 }} resizeMode="contain" >
                        {
                            isMount ?
                                <Video source={{ uri: vid[currentIndex].videoUrl }}   // Can be a URL or a local file.
                                    // volume={0.0}
                                    ref={player}                                      // Store reference
                                    // poster={{}}
                                    onBuffer={(e) => {
                                        // console.log(e, 'buffer')
                                    }}                // Callback when remote video is buffering
                                    onLoadStart={(e) => {
                                        // console.log(e, 'onLoadStart')
                                        // init time
                                        setLoading(true)
                                        var beginInitT = new Date().getTime()
                                        setTempStartInit(beginInitT)
                                    }}
                                    onReadyForDisplay={(e) => {
                                        // console.log(e, 'onReadyForDisplay')
                                        if (isLoading) {
                                            var endInitTime = new Date().getTime()
                                            setTempEndInit(endInitTime)
                                            // console.log('loadTime', endInitTime - tempStartInit)
                                            var t = vid;
                                            t[currentIndex].loadingTime = ((endInitTime - tempStartInit) / 1000).toFixed(1).toString() + ' s'
                                            setLoadTime(((endInitTime - tempStartInit) / 1000).toFixed(1))
                                            setVid(t);
                                        }

                                    }}
                                    onEnd={(e) => {
                                        // console.log(e, 'onEnd')
                                        if (isLoading) {
                                            var EndPlayTime = new Date().getTime()
                                            setTempEndVid(EndPlayTime)
                                            // console.log('bufferTime', EndPlayTime - tempStartInit)
                                            var t = vid;
                                            t[currentIndex].bufferTime = ((EndPlayTime - tempStartInit) / 1000).toFixed(1).toString() + ' s'
                                            t[currentIndex].pr = ((10 / (parseFloat(((EndPlayTime - tempStartInit) / 1000)) + parseFloat(loadTime))) * 100).toFixed(2)
                                            // console.log('keyfiat service', ((10 / (parseFloat(((EndPlayTime - tempStartInit) / 1000)) + parseFloat(loadTime))) * 100).toFixed(2) + ' %')
                                            setVid(t);
                                        }
                                        setLoading(false)

                                        if (currentIndex + 1 < vid.length) {
                                            setCurrentIndex(currentIndex + 1)
                                            // setCurrentWeb(vid[currentIndex + 1].url)
                                        }
                                        else {
                                            setDone(true)
                                            setMount(false)
                                            // console.log('ye video',typeof(Number(vid[0].pr)))
                                            setStreamData({
                                                perf: Number((((Number(vid[0].pr) + Number(vid[1].pr) + Number(vid[2].pr)) / 3).toFixed(2)))
                                            })
                                            setTimeout(async () => {
                                                if (selectedCatId === 2) {
                                                    // console.log('full test result')
                                                    navigation.navigate('Result');
                                                    // navigation.navigate('PrepareScreen', {
                                                    //     nextPage: 'StreamingScreen',
                                                    //     title: 'سنجش پخش ویدیو',
                                                    //     // id:Id
                                                    // });
                                                } else {
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
                                                            0,
                                                            Number((((Number(vid[0].pr) + Number(vid[1].pr) + Number(vid[2].pr)) / 3).toFixed(2))),
                                                        ).then(() => {
                                                            
                                                            var arr = new Array();
                                                            for (let i = 0; i < vid.length; i++) {
                                                                var obj = new Object()
                                                                obj.VideoId = vid[i].Id;
                                                                obj.BufferTime = vid[i].bufferTime.toString();
                                                                obj.LoadTime = vid[i].loadingTime.toString();
                                                                obj.PR = vid[i].pr.toString();
                                                                obj.Lat = currentLocation.lat;
                                                                obj.Lng = currentLocation.lng;
                                                                arr.push(obj)
                                                            }
                                                            // let body ={
                                                            //     "submitVideoStreamDtos":arr
                                                            // }
                                                            // console.log('arr',arr)
                                                            submitStreamingResult(arr).then(res=>{
                                                                console.log('res streaming',res)
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
                                                        console.log('error',error)
                                                    }

                                                    // navigation.dispatch(
                                                    //     CommonActions.reset({
                                                    //         index:6 ,
                                                    //         routes: [{ name: 'Result' }],
                                                    //     }),
                                                    // );
                                                }
                                            }, 5000);
                                        }
                                    }}
                                    resizeMode="cover"
                                    onProgress={(e) => {
                                        // console.log(e, 'onProgress')
                                    }}
                                    onError={() => { }}               // Callback when video cannot be loaded
                                    style={{ width: 348, height: 200 }} /> : null
                        }
                    </ImageBackground>
                    <ActivityIndicator color={'#fff'} size={'small'} style={{ opacity: isLoading ? 1 : 0 }} />
                    <VideoReuslt title="وبسایت آپارات" td1="240p" td2="480p" td3="720p" hasBorder={true} />
                    <VideoReuslt title="زمان بارگذاری" td1={vid[0].loadingTime} td2={vid[1].loadingTime} td3={vid[2].loadingTime} />
                    <VideoReuslt title="مجموع زمان بافرینگ" td1={vid[0].bufferTime} td2={vid[1].bufferTime} td3={vid[2].bufferTime} />
                    <VideoReuslt title="حجم دیتای مصرفی" td1={vid[0].bufferTime !== null ? vid[0].size : null} td2={vid[1].bufferTime !== null ? vid[1].size : null} td3={vid[2].bufferTime !== null ? vid[2].size : null} />
                    <VideoReuslt title="نرخ کیفیت سرویس" td1={vid[0].bufferTime !== null ? vid[0].pr + '%' : null} td2={vid[1].bufferTime !== null ? vid[1].pr + '%' : null} td3={vid[2].bufferTime !== null ? vid[2].pr + '%' : null} />
                </View>
            </ScrollView>

        </Body>
    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getVideoUrl, setStreamData: setStreamData,
            setDataPath,
            setDownloadMaxSpeed,
            setDownloadSpeed,
        },
        dispatch,
    );
};

const mapStateToProps = state => {
    return {
        dataParam: state.paramHandler.dataParam,
        selectedCatId: state.catHandler.selectedCatId

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Streaming);


const s = StyleSheet.create({
    TblRow: {
        flexDirection: 'row',
        margin: 10
    },
    TblChilds: {

    }
})

