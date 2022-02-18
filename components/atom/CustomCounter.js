import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import CustomInput from "./CustomInput";
import {TextInput} from "react-native";
import {placeholder} from "react-native/Libraries/DeprecatedPropTypes/DeprecatedTextInputPropTypes";
import {Style} from "../../Style";
import CustomImageButton from "./CustomImageButton";

function CustomCounter(props) {
    const [number,setNumber]=useState(0);
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

    const increaseNum=()=>{
        setNumber(number+1);
    }
    const decreaseNum=()=>{
        setNumber(number-1)
    }
    return (
        <View>
            <TextInput
                style={{...styles.input, width: parseInt(width), height: parseInt(height)}}
                onChangeText={(value) => handleChange('firstName', value)}
                value={values.firstName}
                placeholder={placeholder}
            />
            <View>
                <CustomImageButton/>
                <CustomImageButton/>
            </View>

        </View>
    );
}

export default CustomCounter;
const styles = StyleSheet.create(
    {
        input: {
            borderColor: `${Style.color1}`,
            margin: 12,
            borderWidth: 2,
            padding: 10
        },
    }
);