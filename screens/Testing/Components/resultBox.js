import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { H2, H5, Label } from '../../../components/typo';
import * as Stl from '../../../components/styles';
import Counter from 'react-native-counter';

export default function ResultBox({ dlSpeed, upSpeed, ping, plr, jitter }) {
    return (
        <View style={{ marginVertical: 30, marginBottom: 30, borderBottomColor: '#888', borderBottomWidth: 0.5, paddingBottom: 20, marginHorizontal: 10 }}>
            <View style={{ flexDirection: 'row-reverse' }}>
                <View style={{ flex: 0.5 }}>
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'center' }}>
                        <View>
                            <Icon
                                name='download'
                                type='feather'
                                color={Stl.Green.color}
                                style={{ marginBottom: 2 }}
                                size={30}
                            />
                            <H5 style={{ textAlign: 'center', color: Stl.Green.color }}>دانلود</H5>
                            <Label style={{ textAlign: 'center', color: '#fff' }}>Mb/s</Label>
                        </View>
                        {/* {console.log('del speed',typeof(dlSpeed.avg))} */}
                        {
                            
                            dlSpeed !== null &&
                            typeof(dlSpeed.avg) !== 'undefined'?
                            <View style={{justifyContent: 'center'}}>
                                <Counter
                                    end={Number(dlSpeed.avg)}
                                    start={0}
                                    time={1000}
                                    digits={2}
                                    easing="linear"
                                    style={[{ color: Stl.Green.color, alignSelf: 'center', marginRight: 15 }, Stl.fontB, Stl.h2]}
                                />
                                <View style={{flexDirection: 'row-reverse', right: 15}}>
                                    <Counter
                                        end={Number(dlSpeed.max)}
                                        start={0}
                                        time={1000}
                                        digits={2}
                                        easing="linear"
                                        style={[{ color: Stl.Green.color, alignSelf: 'center', marginRight: 15 }, Stl.font]}
                                    />
                                    <Label style={{ color: Stl.Green.color, paddingRight: 10 }}>
                                       ماکزیمم
                                    </Label>
                                </View>
                            </View>
                                :
                                <H2 style={{ color: Stl.Green.color, alignSelf: 'center', marginRight: 15 }}>--</H2>
                        }


                        {/* <Label style={{ color: '#fff', alignSelf: 'center', top: -5 }}>مگابیت</Label> */}
                    </View>
                </View>
                <View style={{ flex: 0.5 }}>
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'center' }}>
                        <View>
                            <Icon
                                name='upload'
                                type='feather'
                                color={Stl.lightBlue.color}
                                style={{ marginBottom: 2 }}
                                size={30}
                            />
                            <H5 style={{ textAlign: 'center', color: Stl.lightBlue.color }}>آپلود</H5>
                            <Label style={{ textAlign: 'center', color: '#fff' }}>Mb/s</Label>
                        </View>
                        {
                            upSpeed ?
                            <View style={{justifyContent: 'center'}}>
                                <Counter
                                    end={upSpeed}
                                    start={0}
                                    time={1000}
                                    digits={2}
                                    easing="linear"
                                    style={[{ color: Stl.lightBlue.color, alignSelf: 'center', marginRight: 15 }, Stl.fontB, Stl.h2]}
                                />
                                {/* <Counter
                                    end={upSpeed}
                                    start={0}
                                    time={1000}
                                    digits={2}
                                    easing="linear"
                                    style={[{ color: Stl.lightBlue.color, alignSelf: 'center', marginRight: 15 }, Stl.font]}
                                /> */}
                            </View>
                                :
                                <H2 style={{ color: Stl.lightBlue.color, alignSelf: 'center', marginRight: 15 }}>--</H2>
                        }
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <View style={{ flex: 0.33, borderLeftColor: '#888', borderLeftWidth: 1, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            ping ?
                                <Counter
                                    end={Number(ping)}
                                    start={0}
                                    time={1000}
                                    digits={2}
                                    easing="linear"
                                    style={[Stl.Label, Stl.fontB, s.label]}
                                /> : <Label style={s.label}>--</Label>
                        }
                        <Label style={s.label}> ms</Label>
                    </View>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Icon
                            name='console-network'
                            type='material-community'
                            color={'#fff'}
                            style={{ marginLeft: 5 }}
                            size={20}
                        />
                        <Label style={s.label}>پینگ (ping)</Label>
                    </View>
                </View>
                <View style={{ flex: 0.33, borderLeftColor: '#888', borderLeftWidth: 1, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            jitter ?
                                <Counter
                                    end={Number(jitter)}
                                    start={0}
                                    time={1000}
                                    digits={2}
                                    easing="linear"
                                    style={[Stl.Label, Stl.fontB, s.label]}
                                /> : <Label style={s.label}>--</Label>
                        }
                        <Label style={s.label}> ms</Label>
                    </View>

                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Icon
                            name='chart-multiline'
                            type='material-community'
                            color={'#fff'}
                            style={{ marginLeft: 5 }}
                            size={20}
                        />
                        <Label style={s.label}>جیتر (jitter)</Label>
                    </View>
                </View>
                <View style={{ flex: 0.33, alignItems: 'center' }}>
                    <Label style={s.label}>{plr ? plr : '--'} %</Label>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Icon
                            name='pipe-disconnected'
                            type='material-community'
                            color={'#fff'}
                            style={{ marginLeft: 5 }}
                            size={20}
                        />
                        <Label style={s.label}>اتلاف (PLR)</Label>
                    </View>
                </View>
            </View>
        </View>
    )
}
const s = StyleSheet.create({
    label: {
        color: '#fff'
    }
})