import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from "react-native";


function CustomButton({keyValue, width, height, backgroundColor, onPress, content}) { // 버튼 이용 시 사용
    return (
        <TouchableOpacity disabled={content==="확인 대기중"?true:false} onPress={()=>{onPress(keyValue)}} activeOpacity={0.9}>
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
        fontSize: Dimensions.get('window').width>400?20:18,
        color: "white",
        textAlign: "center"

    },
})