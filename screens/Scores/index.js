import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity as TO, Image, FlatList } from 'react-native';
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
import { setUserScoreData } from '../../store/actions/userAction'
function Scores({ navigation, setUserScoreData }) {

    const [userScore, setUserScore] = useState('')
    const [mainScore, setMainScore] = useState(null)
    const [packages, setPackages] = useState(null)
    useEffect(() => {
        GetUserScore().then((res) => {
            setUserScore(res.data),
                setUserScoreData(res.data)
            console.log('userScore sabt shod')
        })
        GetMainScore().then(res => {
            console.log('score', res.data)
            setMainScore(res.data)
        })
        GetPackages().then(res => {
            setPackages(res.data)
        })
    }, [navigation])


    function showFullPackages(item) {
        navigation.navigate('fullShow', { type: item })
    }
    return (
        <Body>

            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>


                    {/* <View style={{width:'100%',position:'absolute' , height: 200, backgroundColor: 'black', borderBottomRightRadius: 250, borderBottomLeftRadius: 250 }}> */}

                    <LinearGradient
                        colors={['#141719', '#494E55']}
                        style={{
                            // width: 140,
                            width: '110%',
                            height: 150,
                            // height: 140,
                            // position: 'absolute',
                            // zIndex:-10000000,
                            // borderRadius: 1000000,
                            borderBottomLeftRadius: 250,
                            borderBottomRightRadius: 250,
                            justifyContent: 'flex-start',
                            paddingHorizontal: '5%'
                        }}
                        start={{ x: 0.0, y: 0.25 }}
                        end={{ x: 0.5, y: 1.0 }}>
                        <Header title="امتیاز ها" />

                    </LinearGradient>
                    {/* </View> */}
                    <View
                        style={{
                            // flex: 0.4,
                            shadowColor: '#000',
                            borderRadius: 1000000,
                            position: 'absolute',
                            top: 80,
                            width: 140,
                            height: 140,
                            // backgroundColor:'red',
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
                            <TO style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                                <P style={[Stl.Gold]}>امتیاز شما</P>

                                <P style={[Stl.Gold]}>{userScore}</P>
                            </TO>

                        </LinearGradient>
                    </View>


                </View>
                <View style={{ width: '100%', marginTop: 80, paddingHorizontal: '5%' }} >
                    <P style={[Stl.Gold]}>در اپلیکیشن ما می‌توانید امتیاز جمع کنید و با استفاده از
                    امتیاز های جمع شده، از جوایز و تخفیف‌های اختصاصی
                    استفاده کنید</P>
                    <P>
                        کنید  توجه : برای امتیازگیری و استفاده از فروشگاه باید
                    </P>
                </View>
                <View style={{ width: '100%', paddingHorizontal: '5%', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                        <H5 style={[Stl.Gold]}>فروشگاه ها</H5>
                        <TO onPress={() => showFullPackages('packages')} style={{ flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center' }}>
                            <P style={{ color: 'white', marginLeft: 10 }}>نمایش همه</P>
                            <Icon name='chevron-left' type='font-awesome-5' color="white" size={15} />
                        </TO>
                    </View>
                    <P style={{ color: '#B2B2B2' }}>از امتیاز های خود استفاده کنید:</P>
                    {packages !== null ? <FlatList
                        data={packages}
                        style={{ flexDirection: 'row-reverse' }}
                        snapToAlignment="center"
                        renderItem={({ index, item }) => {
                            return (<TO key={index.toString()} style={{ width: 88, height: 150, borderRadius: 16, backgroundColor: '#17181C', justifyContent: 'space-around', alignItems: 'center', marginHorizontal: 10 }}>
                                <P style={{ color: 'white', textAlign: 'center' }}> {item.Description}</P>
                                <P style={{ color: 'white', textAlign: 'center' }}>هزینه: {item.Score}</P>
                                <P style={{ color: 'white', textAlign: 'center' }}> {item.Name}</P>
                            </TO>)

                        }}
                    >
                    </FlatList> : <View></View>}
                    {/* <ScrollView horizontal>
                        {packages.length &&
                            packages.map((i) => {
                                return (

                                  
                                );
                            })}
                    </ScrollView> */}
                </View>
                <ScrollView style={{ width: '100%', paddingHorizontal: '5%', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                        <H5 style={[Stl.Gold]}>امتیازگیری</H5>
                        <TO onPress={() => showFullPackages('scores')} style={{ flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center' }}>
                            <P style={{ color: 'white', marginLeft: 10 }}>نمایش همه</P>
                            <Icon name='chevron-left' type='font-awesome-5' color="white" size={15} />
                        </TO>
                    </View>
                    <P style={{ color: '#B2B2B2' }}>با استفاده از روش های زیر امتیاز بیشتری بگیر:</P>
                    <ScrollView>
                        {mainScore !== null ?
                            mainScore.map((i) => {
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
                            }) : <View></View>}
                    </ScrollView>
                </ScrollView>
            </ScrollView>
        </Body >
    )
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setUserScoreData
    }, dispatch);
};

const mapStateToProps = state => {
    return {

    };
};

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(FullResult);
export default connect(mapStateToProps, mapDispatchToProps)(Scores);