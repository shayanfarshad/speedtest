import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Stl from '../../../components/styles'
export default function BrowsingProcess({ stage, sections }) {
    const renderStage = () =>{
        if(typeof(sections) !== 'undefined'){
            switch (stage) {
                case 0:
                    return '100%'
                case 1:
                    return '66%'
                case 2:
                    return '33%'
                default:
                    return '0%'
            }
        }else{
            switch (stage) {
                case 0:
                    return '100%'
                case 1:
                    return '75%'
                case 2:
                    return '50%'
                case 3:
                    return '25%'
                default:
                    return '0%'
            }
        }

    }
    const renderPercent = () =>{
        if(typeof(sections) !== 'undefined'){
            switch (stage) {
                case 0:
                    return 0
                case 1:
                    return 33
                case 2:
                    return 66
                default:
                    return 100
            }
        }else{
            switch (stage) {
                case 0:
                    return 0
                case 1:
                    return 25
                case 2:
                    return 50
                case 3:
                    return 75
                default:
                    return 100
            }
        }
        
    }
    return (
        <View style={s.container}>
            <Animated.View style={[s.label,{marginRight:renderStage(), left: 20}]}>
                <Text style={[s.labelTxt, Stl.font]}>{renderPercent() + '%'}</Text>
            </Animated.View>
            <View style={{ backgroundColor: '#464B53', borderRadius: 10, height: 15, paddingHorizontal: 4 }}>
                <LinearGradient
                    colors={['rgba(255,255,255,0)', '#00B9FF']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0.8, y: 0.0 }}
                    style={[s.indicator,{marginRight: renderStage()}]}
                />
            </View>

        </View>
    )
}

const s = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 50,
        marginBottom: 20
    },
    label: {
        backgroundColor: '#5C5C5C',
        borderRadius: 10,
        // padding: 5,
        paddingVertical: 3,
        width: 40, 
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    labelTxt: {
        color: '#fff',
        fontSize: 9
    },
    indicator: {
        margin: 3,
        borderRadius: 10,
        flex: 1,
    }
})