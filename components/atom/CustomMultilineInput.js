import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Style} from "../../Style";


function CustomMultilineInput({id, width, height, placeholder, handleChange, currentInfo}) { // 글자를 여러줄에 걸쳐 쓸 수 있는 인풋폼

    return (
        <TextInput
            id={id}
            style={{...styles.input, width: parseInt(width), height: parseInt(height)}}
            onChangeText={(value) => handleChange(id, value)}
            value={currentInfo[id]}
            placeholder={placeholder}
            multiline
        />
    )
        ;
}

export default CustomMultilineInput
const styles = StyleSheet.create(
    {
        input: {
            borderColor: `${Style.color5}`,
            margin: 12,
            borderWidth: 2,
            padding: 10
        },
    }
);