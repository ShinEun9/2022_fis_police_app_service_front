import React from 'react';
import {FontAwesome} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";

function CustomImageButton({onPress,name,size,color}) { // fontawesome에 있는 아이콘을 이용한 버튼 사용 가능
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                <FontAwesome name={name} size={size} color={color}></FontAwesome>
        </TouchableOpacity>

    );
}

export default CustomImageButton;
