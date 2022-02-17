import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';


function CustomMultilineInput({type, width, height, placeholder}) {
    const [values, setValues] = React.useState({firstName: '', lastName: ''});
    useEffect(() => {
        console.log(values);
    }, [values])


    // input handleChange 함수
    const handleChange = (name, value) => {
        setValues({
            ...values,
            [name]: value
        })
    }


    //  select handleChange 함수
    return (

        <TextInput
            style={{...styles.input, width: parseInt(width), height: parseInt(height)}}
            onChangeText={(value) => handleChange('firstName', value)}
            value={values.firstName}
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
            borderColor: "#A2A2A2",
            margin: 12,
            borderWidth: 2,
            padding: 10
        },
    }
);