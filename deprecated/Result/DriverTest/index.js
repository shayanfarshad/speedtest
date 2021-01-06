import React from 'react';
import {View,Text} from 'react-native';
import Body from '../../../components/Body';
import Header from '../../../components/Header';
import * as Stl from '../../../components/styles';

function DriveTest({}){

    return(
        <Body>
            <Header />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[{color: '#fff', textAlign: 'center'}, Stl.font]}> درایو تست ، به زودی...</Text>
            </View>
        </Body>
    )
}

export default DriveTest;