import React from 'react';
import {FontAwesome} from "@expo/vector-icons";
import {TouchableOpacity,View} from "react-native";

function CustomImageButton({onPress,name,size,color}) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <View>
                <FontAwesome name={name} size={size} color={color}></FontAwesome>
            </View>
        </TouchableOpacity>

    );
}

export default CustomImageButton;

// const styles = StyleSheet.create({
//     button:{
//
//     }
// })