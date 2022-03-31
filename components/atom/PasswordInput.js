import React, {useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Style} from "../../Style";

function PasswordInput({
                           type = "normal",
                           id,
                           width,
                           height,
                           placeholder,
                           handleChange,
                           currentInfo
                       }) {
    const [showPassword, setShowPassword] = useState(false);
    const onPress = () => {
        setShowPassword((prev) => !prev);
    }

    let element;
    if (type === "normal") {
        element = <View style={{...styles.passwordContainer, width: parseInt(width), height: parseInt(height)}}>
            <TextInput
                id={id}
                value={currentInfo[id]}
                onChangeText={(value)=>handleChange(id, value)}
                placeholder={placeholder}
                style={styles.inputStyle}
                secureTextEntry={!showPassword ? true : false}

            />
            <TouchableOpacity onPress={onPress}>
                {showPassword ? <Ionicons name="md-eye" size={24} color="black"/> :
                    <Ionicons name="md-eye-off" size={24} color="black"/>}
            </TouchableOpacity>
        </View>;
    } else if(type === "line"){
        element = <View style={{...styles.passwordContainer2, width: parseInt(width), height: parseInt(height)}}>
            <TextInput
                id={id}
                value={currentInfo[id]}
                onChangeText={(value)=>handleChange(id, value)}
                placeholder={placeholder}
                style={styles.inputStyle}
                secureTextEntry={!showPassword ? true : false}

            />
            <TouchableOpacity onPress={onPress}>
                {showPassword ? <Ionicons name="md-eye" size={24} color="#A2A2A2"/> :
                    <Ionicons name="md-eye-off" size={24} color="#A2A2A2"/>}

            </TouchableOpacity>
        </View>;
    }
    return (
        element
    );
}

export default PasswordInput;

const styles = StyleSheet.create(
    {
        passwordContainer: {
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            borderWidth: 1,
            padding: 10,
            borderColor: `${Style.color5}`,
            paddingBottom: 10,
            borderRadius: 10
        },
        passwordContainer2: {
            flexDirection: 'row',
            justifyContent: "space-between",
            borderColor: "transparent",
            borderBottomColor: `${Style.color5}`,
            margin: 12,
            borderWidth: 2,
            padding: 10,
        },
        inputStyle:{
            flex:1
        }

    }
);