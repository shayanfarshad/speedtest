import React from 'react';
import {Text,View} from 'react-native';
import * as Stl from '../styles';

export const H1 = ({children, style}) =>{
    return(
        <Text style={[Stl.fontB, Stl.h1, style? style :{}]}>{children}</Text>
    )
}
export const H2 = ({children, style}) =>{
    return(
        <Text style={[Stl.fontB, Stl.h2, style? style :{}]}>{children}</Text>
    )
}
export const H3 = ({children, style}) =>{
    return(
        <Text style={[Stl.fontB, Stl.h3,style? style :{}]}>{children}</Text>
    )
}
export const H4 = ({children, style}) =>{
    return(
        <Text style={[Stl.fontB, Stl.h4,style? style :{}]}>{children}</Text>
    )
}
export const H5 = ({children, style}) =>{
    return(
        <Text style={[Stl.fontB, Stl.h5,style? style :{}]}>{children}</Text>
    )
}
export const Label = ({children, style}) =>{
    return(
        <Text style={[Stl.fontB, Stl.Label,style? style :{}]}>{children}</Text>
    )
}
export const P = ({children, style}) =>{
    return(
        <Text style={[Stl.font, Stl.Paragraph,style? style :{}]}>{children}</Text>
    )
}

export const SubLine = () =>{
    return(
        <View 
            style={{
                flex:0.3,
                borderWidth: 2,
                width: '40%',
                alignSelf: 'flex-end',
                marginVertical: 10,
                borderColor: Stl.Primary.color
            }}
        />
    )
}