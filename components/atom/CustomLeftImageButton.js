import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import {FontAwesome} from '@expo/vector-icons'

function CustomLeftImageButton({ content,onPress,name,size,color}) { // 왼쪽에 fontawesome 아이콘이 있는 버튼
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <View style={styles.button}>
                <FontAwesome name={name} size={size} color={color} />
                <View style={{flex: 1, alignItems: "center"}}><Text style={{fontSize: Dimensions.get("window").width>360?20:18}}>{content}</Text></View>
            </View>
        </TouchableOpacity>
    );
}

export default CustomLeftImageButton;

const styles = StyleSheet.create({
    button:{
        marginBottom: 13,
        paddingHorizontal: 10,
        paddingVertical:16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#ECE6E6',
        justifyContent:"space-between",
        width: Dimensions.get('window').width * 0.8,
    }
})