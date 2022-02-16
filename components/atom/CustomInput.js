import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, Text, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Ionicons} from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {TouchableOpacity} from "react-native";

function CustomInput({type, width, height}) {
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
            multiline
        />


        // <TextInput
        //     style={{...styles.input2, width: parseInt(width)}}
        //     onChangeText={(value) => handleChange('firstName', value)}
        //     value={values.firstName}
        //     placeholder="hi"
        //     secureTextEntry={true}
        // />


    )
        ;
}

const styles = StyleSheet.create(
    {
        input: {
            borderColor: "#ECE6E6",
            margin: 12,
            borderWidth: 2,
            padding: 10
        },
        input2: {
            borderColor: "#ECE6E6",
            // borderColor: "transparent",
            borderBottomColor: "#ECE6E6",
            margin: 12,
            borderWidth: 2,
            padding: 10,
        },
        passwordContainer: {
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'center',
            borderWidth: 1,
            width: 300,
            height: 40,
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


export default CustomInput;
