import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import NetInfo, { NetInfoCellularGeneration } from '@react-native-community/netinfo';
import { P } from '../../components/typo';


function DriveTest({ navigation }) {
    const [fer, setFer] = useState()
    const [strength, setStrength] = useState()
    useEffect(() => {
        NetInfo.fetch().then(state => {
            // console.log("Connection type", state.details);
            setFer(state.details.frequency)
            // console.log("Is connected?", state.details.strength);
            setStrength(state.details.strength)
            console.log('net info',state.details)
        });
    }, [])


    return (
        <View style={styles.container}>
            <P>salam</P>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default DriveTest;