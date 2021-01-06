import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity as TO } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { H4, Label, P } from '../../components/typo';
import * as Stl from '../../components/styles';
import AsyncStorage from '@react-native-community/async-storage';
import { setDataPath, setDownloadSpeed, setUploadSpeed } from '../../store/actions/paramAction';
// import { navigationRef } from '../../navigation';
import { CommonActions } from '@react-navigation/native';

export default function TopTenHistory({ navigation, recieved }) {
  const [data, setData] = useState([]);
  async function GetData() {
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
      setData(b.reverse());
    } catch (err) { }
  }
  useEffect(() => {
    GetData()
  }, [recieved])

  
  return (
    <LinearGradient
      colors={['#373B43', '#0c0c0c']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.8 }}
      locations={[0.02, 0.9]}>
      <SafeAreaView>
        <ScrollView>
          <H4 style={[Stl.Gold, { textAlign: 'center', marginVertical: 10 }]}>
            ‏10 سنجش اخیر
          </H4>
          <View style={{ marginHorizontal: 15 }}>
            {data.length > 0 ? (
              <View style={s.rowHeading}>
                <View>
                  <P style={s.t}>تاریخ</P>
                  <Label style={s.t}>زمان</Label>
                </View>
                <View>
                  <P style={s.t}>پینگ</P>
                  <Label style={s.t}>میلی ثانیه</Label>
                </View>
                <View>
                  <P style={s.t}>دانلود</P>
                  <Label style={s.t}>بر ثانیه</Label>
                </View>
                <View>
                  <P style={s.t}>نوع</P>
                  <Label style={s.t}>تست</Label>
                </View>
              </View>
            ) : null}
            <View style={s.tblContainer}>
              {data.length > 0 ? (

                data.map((item, index) => {
                  if (index <= 9) {
                    return (
                      
                        <View style={s.tblItem} key={index}>
                          <View style={s.item}>
                            <P style={s.iTxt}>{item.date}</P>
                            <Label style={s.iTxt}>{item.time}</Label>
                          </View>
                          <View style={s.item}>
                            <P style={s.iTxt}>{item.rtt !== null ? item.rtt.toFixed(2) : ''}</P>
                          </View>
                          <View style={s.item}>
                            <P style={s.iTxt}>{item.avgDl !== null ? item.avgDl.toFixed(2) : ''}</P>
                            <Label style={s.iTxt}>مگابیت</Label>
                          </View>
                          <View style={s.item}>
                            <P style={s.iTxt}>
                              {item.cat !== null ? item.cat : ''}
                            </P>
                            {/* <Label style={s.iTxt}>مگابیت</Label> */}
                          </View>
                        </View>
                    
                    );
                  } return null
                })
              ) : (
                  <Label style={{ color: '#fff', textAlign: 'center' }}>
                    هنوز تستی انجام نشده
                  </Label>
                )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  t: {
    color: Stl.Gold.color,
    textAlign: 'center',
  },
  iTxt: {
    color: Stl.typo.color,
    textAlign: 'center',
  },
  item: {
    justifyContent: 'center',
  },
  rowHeading: {
    flexDirection: 'row-reverse',
    marginVertical: 10,
    borderBottomColor: Stl.Gold.color,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  tblContainer: {
    marginBottom: 10,
  },
  tblItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 19,
  },
});
