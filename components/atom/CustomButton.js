import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from "react-native";

function CustomButton({ backgroundColor, onPress, content}) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <View style={{...styles.button, backgroundColor}}>
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
        paddingVertical: 15,
        paddingHorizontal: 25,
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }
})