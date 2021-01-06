import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { P } from '../../../components/typo';

function LineCharts({ params }) {
    return (
        // <View style={{backgroundColor: '#fff'}}>
        <View >
            <LineChart
                style={{ height: 100 }}
                data={params}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 25, height: 25, padding: 10 }}
                animate={true}
                curve={shape.curveNatural}
                animationDuration={1000}
            >
            </LineChart>
        </View>
    )
}

export default LineCharts;
