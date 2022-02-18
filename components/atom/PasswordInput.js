import React, {useState} from 'react';
import {Dimensions, StyleSheet, TextInput, View, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

function PasswordInput({id, submitFunction, handleChange, currentInfo, placeholder}) {
    const [showPassword, setShowPassword] = useState(false);
    const onPress = () => {
        setShowPassword((prev) => !prev);
    }

    return (
        <View style={styles.passwordContainer}>
            <TextInput
                id={id}
                // value={currentInfo[id]}
                // onSubmitEditing={submitFunction}
                // onChangeText={(value)=>handleChange(id, value)}
                placeholder={placeholder}
                style={styles.inputStyle}
                secureTextEntry={!showPassword?true:false}

            />
            <TouchableOpacity onPress={onPress}>
                {showPassword ? <Ionicons name="md-eye" size={24} color="black"/> :
                    <Ionicons name="md-eye-off" size={24} color="black"/>}
            </TouchableOpacity>
        </View>);
}

export default PasswordInput;

const styles = StyleSheet.create(
    {
        passwordContainer: {
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            borderWidth: 1,
            width: Dimensions.get("window").width * 0.8,
            height: 50,
            padding: 10,
            borderColor: '#A2A2A2',
            paddingBottom: 10,
            borderRadius: 10
        },
        inputStyle: {
            flex: 1,
        }
    }
);