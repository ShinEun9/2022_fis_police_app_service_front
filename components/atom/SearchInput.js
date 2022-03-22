import React from 'react';
import {Dimensions, StyleSheet, TextInput, useWindowDimensions, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Style} from "../../Style";

function SearchInput({id,width, submitFunction, handleChange, currentInfo, placeholder}) {

    return (
        <View style={{...styles.passwordContainer, width: width}}>
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
<<<<<<< HEAD
            //borderwidth: 2,
=======
            // borderWidth: 2,
>>>>>>> cff5fde89cb0014bd50e129f4337b508af9a30a5
            width: Dimensions.get("window").width * 0.8,
            height: 50,
            padding: 10,
            borderColor: Style.color5,
            paddingBottom: 10,
        },
        inputStyle: {
            flex: 1,
        }
    }
);