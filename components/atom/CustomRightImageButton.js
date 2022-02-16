import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

function CustomRightImageButton({onPress, name, size, content, color}) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <View style={styles.button}>
                <Text>{content}</Text>
                <AntDesign name={name} size={size} color={color}></AntDesign>
            </View>
        </TouchableOpacity>
    );
}

export default CustomRightImageButton;

const styles = StyleSheet.create({
    button:{
        borderRadius:10,
        paddingHorizontal: 10,
        paddingVertical:10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#ECE6E6',
        justifyContent:"space-between",
        width:300,
        height:90
    }
})