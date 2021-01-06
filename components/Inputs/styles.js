'use strict';

var React = require('react-native');
import {Platform} from 'react-native'
import * as Stl from '../styles';

var {StyleSheet} = React;

const leftRight = Platform.select({
  ios: 'right',
  android: 'right'
});

module.exports = StyleSheet.create({
    container:{
        paddingHorizontal: 15,
        paddingLeft: 0,
        paddingVertical: 10,
    },
    inputTitle:{
        fontSize:16,
        textAlign: 'right',
        paddingVertical: 0,
        color: Stl.Gold.color
    },
    inputLeftIcon:{
        fontSize: 14
    },
    InputRow:{
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        borderColor: Stl.Gold.color,
        borderWidth: 1,
        backgroundColor: '#3B4048',
        borderRadius: 25,
        marginVertical: 5
    },
    SelectContainer:{
        paddingHorizontal: 15,
        paddingLeft: 0,
        paddingVertical: 5,
        borderColor: '#D2AB67',
        borderWidth: 1,
        backgroundColor: '#353a40',
        borderRadius: 25,
        marginVertical: 5
    },
    SelectBoxRow:{
        flexDirection: 'row-reverse',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center'
    },
    SelecBoxTitle:{
        flex: 0.95,
    },
    SelectBoxIcon:{
        flex: 0.05,
    },
    ListItemStyle:{
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginVertical: 5,
        paddingVertical: 5,
        color: 'gray',
        paddingHorizontal: 2,
        borderBottomWidth: 0,
    },
    ActiveListItem:{
        backgroundColor: '#803b96',
        borderRadius: 10,
    },
    ActiveListItemTxt:{
        color: '#fff'
    }
});
