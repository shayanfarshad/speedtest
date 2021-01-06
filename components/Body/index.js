import React from 'react';
import { SafeAreaView, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';


export default function Body({ children, style }) {
    return (
        <LinearGradient colors={['#383D45', '#1A1B1F']} style={{ flex: 1 }}>
            <SafeAreaView style={[style, { flex: 1 }]}>
                {children}
            </SafeAreaView>
        </LinearGradient>
    )
}