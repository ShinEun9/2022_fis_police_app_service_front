import React from 'react';
import {FontAwesome} from "@expo/vector-icons";
import {TouchableOpacity,View} from "react-native";

function CustomImageButton({onPress,name,size,color}) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                <FontAwesome name={name} size={size} color={color}></FontAwesome>
        </TouchableOpacity>

    );
}

export default CustomImageButton;

// const styles = StyleSheet.create({
//     button:{
//
//     }
// })