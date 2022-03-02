import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

function CustomRightImageButton({keyValue, onPress, name, size, content, color}) {
    return (
        <TouchableOpacity onPress={()=>{onPress(keyValue)}} activeOpacity={0.8}>
            <View style={styles.button}>
                <Text style={{fontSize: 25}}>{content}</Text>
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
        width: Dimensions.get("window").width * 0.8,
        height:Dimensions.get("window").height * 0.1,
    }
})