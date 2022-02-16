import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, Text, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Ionicons} from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {TouchableOpacity} from "react-native";

function CustomInput({type, width, height}) {
    const [values, setValues] = React.useState({firstName: '', lastName: ''});
    const [color, setColor] = React.useState("")
    const [selectValue, setSelectValue] = React.useState({sido: '', local: ''});
    useEffect(() => {
        console.log(selectValue);
    }, [selectValue])


    const [password, onPasswordEntry] = React.useState("")
    // input handleChange 함수
    const handleChange = (name, value) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSelectChange = (name, value) => {
        setSelectValue({
            ...selectValue,
            [name]: value
        })
    }


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };


    // select handleChange 함수
    return (
        // <TextInput
        //     style={{...styles.input, width: parseInt(width), height: parseInt(height)}}
        //     onChangeText={(value) => handleChange('firstName', value)}
        //     value={values.firstName}
        //     multiline
        // />

        // <View style={{display:"flex", flexDirection: "row"}}>
        //     <RNPickerSelect
        //         value={selectValue.sido}
        //         onValueChange={(value) => handleSelectChange("sido", value)}
        //         placeholder={{
        //             label: '시/도 선택',
        //             value: null
        //         }}
        //         items={[
        //             { label: 'Football', value: 'football' },
        //             { label: 'Baseball', value: 'baseball' },
        //             { label: 'Hockey', value: 'hockey' },
        //         ]}
        //         style={{
        //             ...pickerSelectStyles,
        //             flex:1,
        //             iconContainer: {
        //                 top: 10,
        //                 right: 18,
        //             },
        //         }}
        //         useNativeAndroidPickerStyle={false}
        //         textInputProps={{ underlineColor: 'yellow' }}
        //         Icon={() => {
        //             return <Ionicons name="md-arrow-down" size={24} color="gray" />;
        //         }}
        //     />
        //     <RNPickerSelect
        //         onValueChange={(value) => handleSelectChange("local",value)}
        //         value={selectValue.local}
        //         placeholder={{
        //             label: '지역 선택',
        //             value: null
        //         }}
        //         items={[
        //             { label: 'Football', value: 'football' },
        //             { label: 'Baseball', value: 'baseball' },
        //             { label: 'Hockey', value: 'hockey' },
        //         ]}
        //         style={{
        //             ...pickerSelectStyles,
        //             flex:1,
        //             iconContainer: {
        //                 top: 10,
        //                 right: 18,
        //             },
        //         }}
        //         useNativeAndroidPickerStyle={false}
        //         textInputProps={{ underlineColor: 'yellow' }}
        //         Icon={() => {
        //             return <Ionicons name="md-arrow-down" size={24} color="gray" />;
        //         }}
        //     />
        // </View>


        // <TextInput
        //     style={{...styles.input2, width: parseInt(width)}}
        //     onChangeText={(value) => handleChange('firstName', value)}
        //     value={values.firstName}
        //     placeholder="hi"
        //     secureTextEntry={true}
        // />

        // <View style={styles.passwordContainer}>
        //     <TextInput
        //         style={styles.inputStyle}
        //         secureTextEntry
        //         placeholder="Password"
        //         value={password}
        //         onChangeText={onPasswordEntry}
        //     />
        //     <Ionicons name="search" size={20} color="gray" />
        // </View>


        <View>
            <TouchableOpacity onPress={showDatePicker} activeOpacity={0.9}>
                <View style={{width: 200, height: 40, flexDirection: 'row', borderWidth: "1", borderColor: "gray", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10}}>
                    <Text>
                        날짜 선택
                    </Text>
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            borderTopWidth: 10,
                            borderTopColor: 'gray',
                            borderRightWidth: 10,
                            borderRightColor: 'transparent',
                            borderLeftWidth: 10,
                            borderLeftColor: 'transparent',
                            width: 0,
                            height: 0,
                        }}
                    />
                </View>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

        </View>


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
            // borderColor: "#ECE6E6",
            borderColor: "transparent",
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

const pickerSelectStyles = StyleSheet.create(
        {
            inputIOS: {
                width: 140,
                marginRight: 10,
                fontSize: 16,
                height: 50,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
                color: 'black',
                paddingRight: 30, // to ensure the text is never behind the icon
            },
            inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 0.5,
                borderColor: 'purple',
                borderRadius: 8,
                color: 'black',
                paddingRight: 30, // to ensure the text is never behind the icon
            }
        }
    )
;

export default CustomInput;
