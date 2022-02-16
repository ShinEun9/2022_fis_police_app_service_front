import React from 'react';
import {View,Text, TouchableOpacity, StyleSheet} from "react-native";
import {AntDesign} from '@expo/vector-icons'

function CustomLeftImageButton({content,onPress,name,size,color}) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <View style={styles.button}>
                <AntDesign name={name} size={size} color={color}></AntDesign>
                <Text>{content}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CustomLeftImageButton;

const styles = StyleSheet.create({
    button:{
        borderRadius:10,
        paddingHorizontal: 10,
        paddingVertical:10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#ECE6E6',
        justifyContent:"space-between",
        width:200,
    }
})