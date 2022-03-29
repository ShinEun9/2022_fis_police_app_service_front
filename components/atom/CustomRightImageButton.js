import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";

function CustomRightImageButton({keyValue, onPress, name, size, content, color}) { // 오른쪽에 antdesign 아이콘이 있는 버튼
    return (
        <TouchableOpacity onPress={() => {
            onPress(keyValue)
        }} activeOpacity={0.8} style={styles.button}>
            <>{content}</>
            <AntDesign name={name} size={size} color={color}></AntDesign>
        </TouchableOpacity>
    );
}

export default CustomRightImageButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECE6E6',
        justifyContent: "space-between",
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.12,
    }
})