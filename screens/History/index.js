import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity as TO } from 'react-native';
import Body from '../../components/Body';
import Header from '../../components/Header';
import * as Stl from '../../components/styles';
import AsyncStorage from '@react-native-community/async-storage';
import { H4, Label, P } from '../../components/typo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { setDataPath, setDownloadMaxSpeed, setDownloadSpeed, setUploadSpeed } from '../../store/actions/paramAction';
import setBrowsingData from '../../store/actions/setBrowsingData';
function History({ navigation, setDownloadSpeed, setUploadSpeed, setDataPath,setDownloadMaxSpeed,setBrowsingData }) {
  const [data, setData] = useState([]);
  async function GetData() {
    try {
      const res = await AsyncStorage.getItem(`LastTest`);
      var a = res;
      console.log('history', a)
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
  }, [navigation]);
  async function testDetail(i) {
    console.log('clicked', data[i])

    try {
      setDownloadSpeed(data[i].avgDl)
      setDownloadMaxSpeed(data[i].maxDl)
      setUploadSpeed(data[i].up)
      setBrowsingData({perf:data[i].browsing})
      setDataPath({ avgPing: Number(data[i].rtt), jitter: Number(data[i].jit), maxPing: Number(data[i].maxPing) })

    } catch (error) {

    }//


    navigation.navigate('Result', {
      prevScreen: 'History'
    })

  }
  function filter(){
    console.log('filter')
  }
  return (
    <Body>
      <Header title="تاریخچه سنجش اینترنت"  type={'history'} onPress={filter} />
      <ScrollView>
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
                return (
                  <TO style={{ backgroundColor: '#121212', borderRadius: 10, marginBottom: 10, justifyContent: 'center', paddingHorizontal: 10, elevation: 4 }} onPress={() => testDetail(index)}>
                    <View style={s.tblItem} key={index}>
                      <View style={s.item}>
                        <P style={s.iTxt}>{item.date}</P>
                        <Label style={s.iTxt}>{item.time}</Label>
                      </View>
                      <View style={s.item}>
                        <P style={s.iTxt}>
                          {item.rtt !== null ? item.rtt.toFixed(2) : ''}
                        </P>
                      </View>
                      <View style={s.item}>
                        <P style={s.iTxt}>
                          {item.avgDl !== null ? item.avgDl.toFixed(2) : ''}
                        </P>
                        <Label style={s.iTxt}>مگابیت</Label>
                      </View>
                      <View style={s.item}>
                        <P style={s.iTxt}>
                          {item.cat !== null ? item.cat : ''}
                        </P>
                        {/* <Label style={s.iTxt}>مگابیت</Label> */}
                      </View>
                    </View>
                  </TO>
                );
              })
            ) : (
                <Label style={{ color: '#fff', textAlign: 'center' }}>
                  هنوز تستی انجام نشده
                </Label>
              )}
          </View>
        </View>
      </ScrollView>
    </Body>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setDownloadSpeed,
      setUploadSpeed,
      setDownloadMaxSpeed,
      setDataPath,
      setBrowsingData
    },
    dispatch,
  );
};

const mapStateToProps = state => {
  return {
    selectedCatId: state.catHandler.selectedCatId,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(History);
// export default History;

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
    // marginBottom: 19,
    marginVertical: 5
  },
});
