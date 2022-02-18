import React from 'react';
import {Dimensions, StyleSheet, TextInput, useWindowDimensions, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

function SearchInput({id, submitFunction, handleChange, currentInfo, placeholder}) {

    return (
        <View style={styles.passwordContainer}>
            <TextInput
                id={id}
                value={currentInfo[id]}
                onSubmitEditing={submitFunction}
                onChangeText={(value)=>handleChange(id, value)}
                placeholder = {placeholder}
                style={styles.inputStyle}
            />
            <Ionicons name="search" size={20} color="gray" />
        </View>    );
}

export default SearchInput;

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