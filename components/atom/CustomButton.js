import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, Dimensions} from 'react-native';
import {TouchableOpacity} from "react-native";



const screen = Dimensions.get("window");

function CustomButton({width, height, backgroundColor, onPress, content}) {


    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <View style={{...styles.button, width: parseInt(width), height: parseInt(height), backgroundColor}}>
                <Text style={styles.buttonText}>{content}</Text>
            </View>
        </TouchableOpacity>
    );


}

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "white",
        textAlign: "center"

    },
})