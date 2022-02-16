import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from "react-native";

function CustomButton({type, width, height, backgroundColor, onPress, content }) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <View style={{...styles.button, width: parseInt(width), height:parseInt(height), backgroundColor}}>
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
        alignItems: "center"
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }
})