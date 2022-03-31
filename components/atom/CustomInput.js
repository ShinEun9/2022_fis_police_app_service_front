import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Style} from "../../Style";

function CustomInput({type = "normal", id, width, height, placeholder, keyboardType = "default", handleChange, currentInfo}) {
    let element;
    if (type === "normal") {
        element = <TextInput
            id={id}
            style={{...styles.input, width: parseInt(width), height: parseInt(height)}}
            placeholder={placeholder}
            onChangeText={(value) => handleChange(id, value)}
            value={currentInfo[id]}
            autoCapitalize="none"
        />;
    } else if(type === "line") {
        element = <TextInput
            id={id}
            style={{...styles.input2, width: parseInt(width), height: parseInt(height)}}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onChangeText={(value) => handleChange(id, value)}
            value={currentInfo[id]}
            autoCapitalize="none"
        />
    }

    return (
        element
    );
}

const styles = StyleSheet.create(
    {
        input: {
            borderColor: `${Style.color5}`,
            margin: 12,

            borderWidth: 2,

            padding: 10,
        },
        input2: {
            borderColor: "transparent",
            borderBottomColor: `${Style.color5}`,
            margin: 12,

            borderWidth: 2,

            padding: 10,
        }
    }
);


export default CustomInput;
