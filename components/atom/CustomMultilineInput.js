import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Style} from "../../Style";


function CustomMultilineInput({id, width, height, placeholder, handleChange, currentInfo}) {

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
<<<<<<< HEAD
            //borderwidth: 2,
=======
            // borderWidth: 2,
>>>>>>> cff5fde89cb0014bd50e129f4337b508af9a30a5
            padding: 10
        },
    }
);