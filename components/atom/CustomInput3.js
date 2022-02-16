import React from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

function CustomInput3(props) {
    const [password, onPasswordEntry] = React.useState("")
    // input handleChange 함수

    return (
        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.inputStyle}
                secureTextEntry
                placeholder="Password"
                value={password}
                onChangeText={onPasswordEntry}
            />
            <Ionicons name="search" size={20} color="gray" />
        </View>    );
}

export default CustomInput3;

const styles = StyleSheet.create(
    {
        passwordContainer: {
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            borderWidth: 1,
            width: 300,
            height: 40,
            padding: 10,
            borderColor: '#A2A2A2',
            paddingBottom: 10,
            borderRadius: 10
        },
    }
);