import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity as TO,
  Image,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import Body from '../../components/Body';
import Header from '../../components/Header';
import {H1, H2, H3, H4, H5, P, Label} from '../../components/typo';
import * as Stl from '../../components/styles';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment-jalaali';
import AppAlert from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import {ScrollView} from 'react-native-gesture-handler';
// import Share from 'react-native-share';
import logo from '../../assets/img/logo.png';
import NetState from '../../components/NetState';


function Result({navigation}) {
  var pageShot = useRef();
  const [dlSpeed, setDlSpeed] = useState(0);
  const [upSpeed, setUpSpeed] = useState(0);
  const [starCount, setStarCount] = useState(2);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [packetLoss, setPacketLoss] = useState(0);
  const [currentCar, setCurrentCar] = useState('')
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetch();
    });
    return unsubscribe;
  }, [navigation]);

  async function fetch() {
    try {
      const res = await AsyncStorage.getItem(`tempRtt`);
      const res2 = await AsyncStorage.getItem(`tempRttAvg`);
      const dl = await AsyncStorage.getItem('tempDlSpeed');
      const up = await AsyncStorage.getItem('tempUpSpeed');
      //console.log(res, 'test')
      var a = res;
      if (res !== null) {
        // We have data!!
        a = JSON.parse(res);
        setPacketLoss(10 - a.length);
        var jitterL = [];
        for (var item in a) {
          if (item !== '0') {
            jitterL.push(Math.abs(a[item] - a[item - 1]));
          }
        }
        var sum = jitterL.reduce(function(a, b) {
          return a + b;
        }, 0);
        //console.log(sum, 'sum')
        sum = sum / jitterL.length;
        //console.log(jitterL.length, 'jitterL.length')
        //console.log(sum, 'sum2')

        setJitter(sum.toFixed(2));
        var abs = {
          date: moment().format('jYYYY/jMM/jDD'),
          time: moment().format('HH:mm:ss'),
          dl: Number(dl),
          up: Number(up),
          rtt: Number(res2),
        };
        try {
          const res = await AsyncStorage.getItem(`LastTest`);
          var a = res;
          var b = [];
          if (res !== null) {
            // We have data!!
            if (res.startsWith('{')) {
              b.push(JSON.parse(a));
            } else {
              b = JSON.parse(a);
            }
          } else {
            b = [];
          }
          b.push(abs);
          AsyncStorage.setItem('LastTest', JSON.stringify(b));
          AsyncStorage.removeItem(`tempRtt`);
          AsyncStorage.removeItem(`tempRttAvg`);
          AsyncStorage.removeItem('tempDlSpeed');
          AsyncStorage.removeItem('tempUpSpeed');
        } catch (err) {}
      } else {
      }
      setPing(Number(res2).toFixed(2));
      setDlSpeed(Number(dl).toFixed(2));
      setUpSpeed(Number(up).toFixed(2));
    } catch (err) {
      setDlSpeed(0);
      setUpSpeed(0);
      setRtt([]);
      setRtt(0);
    }
  }

  function ratingCompleted(value) {
    setStarCount(value);
  }

  const listData = [1, 2, 3, 4];
  return (
    //<ViewShot captureMode="mount" ref={ref => pageShot = ref} style={{ flex: 1 }}>
    <Body style={{flex: 1}}>
      <ScrollView>
        <View style={{flex: 0.15}}>
          <Header />
          <H3 style={[{textAlign: 'center', marginTop: -20}, Stl.Primary]}>
            نتایج سنجش
          </H3>
        </View>
        <View style={{flex: 0.85}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <H1
                  style={[
                    Stl.lightBlue,
                    {textAlign: 'center', marginBottom: 10},
                  ]}>
                  آپلود
                </H1>
                <Icon
                  name="caretup"
                  type="antdesign"
                  color={Stl.lightBlue.color}
                  size={16}
                  style={{top: -2}}
                />
              </View>

              <H1
                style={{color: '#fff', textAlign: 'center', marginBottom: 10}}>
                {upSpeed}
              </H1>
              <H3 style={{color: '#fff', textAlign: 'center'}}>Mbps</H3>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <H1
                  style={[Stl.Green, {textAlign: 'center', marginBottom: 10}]}>
                  دانلود
                </H1>
                <Icon
                  name="caretdown"
                  type="antdesign"
                  color={Stl.Green.color}
                  size={16}
                  style={{top: -5}}
                />
              </View>

              <H1
                style={{color: '#fff', textAlign: 'center', marginBottom: 10}}>
                {dlSpeed}
              </H1>
              <H3 style={{color: '#fff', textAlign: 'center'}}>Mbps</H3>
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
              <Label style={{color: '#fff', textAlign: 'center'}}>
                Ping: {ping} ms
              </Label>
            </View>
            <View
              style={{
                flex: 0.33,
                justifyContent: 'center',
                borderRightWidth: 1,
                borderRightColor: '#fff',
              }}>
              <Label style={{color: '#fff', textAlign: 'center'}}>
                Jitter: {jitter} ms
              </Label>
            </View>
            <View style={{flex: 0.33, justifyContent: 'center'}}>
              <Label style={{color: '#fff', textAlign: 'center'}}>
                PacketLoss: {packetLoss}
                {packetLoss !== 0 ? '%' : ''}
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
              <View style={{flex: 0.3}}>
                <TO
                  onPress={() => {
                    // pageShot.capture().then(uri => {
                    //   Share.open({
                    //     type: 'JPG',
                    //     url: Platform.OS === 'ios' ? uri : 'file://' + rui // (Platform.OS === 'android' ? 'file://' + filePath)
                    //   })
                    //   // console.log("do something with ", uri);
                    // });
                  }}>
                  <Icon
                    name={'sharealt'}
                    type={'antdesign'}
                    color={'#fff'}
                    size={25}
                  />
                  <P style={{color: '#fff', textAlign: 'center'}}>
                    اشتراک گذاری
                  </P>
                </TO>
              </View>
              <View style={{flex: 0.3}}>
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
                  <P style={{color: '#fff', textAlign: 'center'}}>شروع مجدد</P>
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
                start={{x: 0.0, y: 0.25}}
                end={{x: 0.5, y: 1.0}}>
                  <Image source={logo} style={{width:50,height:50, alignSelf: 'center'}} resizeMode="contain" />
                {/* <H2 style={[{textAlign: 'center', marginTop: 20}, Stl.Primary]}>
                  امتیاز سرویس
                </H2>
                <H1 style={[{textAlign: 'center'}, Stl.Primary]}>۱۰۰</H1> */}
              </LinearGradient>
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <P style={{color: '#fff', textAlign: 'center'}}>سرویس دهنده</P>
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
            <P style={{color: '#fff', textAlign: 'center', marginBottom: 10}}>
              امتیاز شما به خدمات این شرکت :
            </P>
            <StarRating
              disabled={false}
              maxStars={5}
              starSize={25}
              fullStarColor="yellow"
              containerStyle={{width: '50%'}}
              rating={starCount}
              selectedStar={rating => ratingCompleted(rating)}
            />
          </View>
          <View style={{width: '100%', marginTop: 15}}>
            <H3 style={{color: '#fff', textAlign: 'center'}}>جزئیات سنجش</H3>
            <View style={{width: '95%', marginHorizontal: '2.5%'}}>
              <NetState setCarr={(e)=>{setCurrentCar(e)}}/>
            </View>
            {/* <View style={{width: '95%', marginHorizontal: '2.5%'}}> 
              <View style={styles.list}>
                <P style={Stl.Light}>سرور</P>
                <P style={Stl.Light}>ایران</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>اپراتور</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>تکنولوژی</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>آی پی شما</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>موقعیت مکانی</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>دانلود بیت ریت(حداکثر)</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>دانلود بیت ریت(میانگین)</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>آپلود بیت ریت(حداکثر)</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>آپلود بیت ریت(میانگین)</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>میزان تاخبر (حداقل)</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>میزان تاخبر (حداکثر)</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>میزان تاخبر (جیتر)</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>پینگ</P>
                <P style={Stl.Light}>google.com</P>
              </View>
              <View style={styles.list}>
                <P style={Stl.Light}>اتلاف بسته</P>
                <P style={Stl.Light}>google.com</P>
              </View>
            </View>*/}
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

export default Result;
