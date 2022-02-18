import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, Text, Button} from 'react-native';

function CustomInput({type, width, height, placeholder, password}) {
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

        // <TextInput
        //     style={{...styles.input, width: parseInt(width), height: parseInt(height)}}
        //     onChangeText={(value) => handleChange('firstName', value)}
        //     value={values.firstName}
        //     multiline
        // />


        <TextInput
            style={{...styles.input2, width: parseInt(width), height: parseInt(height) }}
            onChangeText={(value) => handleChange('firstName', value)}
            value={values.firstName}
            placeholder={placeholder}
            secureTextEntry={password?true:false}
        />


    )
        ;
}

const styles = StyleSheet.create(
    {
        input: {
            borderColor: "#A2A2A2",
            margin: 12,
            borderWidth: 2,
            padding: 10
        },
        input2: {
            // borderColor: "#A2A2A2",
            borderColor: "transparent",
            borderBottomColor: "#A2A2A2",
            margin: 12,
            borderWidth: 2,
            padding: 10,
        }
    }
);


export default CustomInput;
