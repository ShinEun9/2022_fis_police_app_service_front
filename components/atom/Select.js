import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {Style} from "../../Style";

function Select({label, id, items, width, handleChange, currentInfo}) {
    return (
        <RNPickerSelect
            value={currentInfo[id]}
            onValueChange={(value) => handleChange(id, value)}
            placeholder={{
                label: label,
                value: null
            }}
            items={items}
            style={{
                inputIOS: {
                    width: width,
                    marginRight: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    //borderwidth: 2,
                    borderColor: `${Style.color5}`,
                    paddingRight: 30,  //to ensure the text is never behind the icon
                },
                inputAndroid: {
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    //borderwidth: 0.5,
                    borderColor: `${Style.color5}`,
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 30,  //to ensure the text is never behind the icon

                },
                flex: 1,
                iconContainer: {
                    top: 10,
                    right: 18,
                },
            }}
            useNativeAndroidPickerStyle={false}
            textInputProps={{underlineColor: 'yellow'}}
            Icon={() => {
                return <FontAwesome name="angle-down" size={24} color={Style.color5} />
            }}
        />

    )
        ;
}


const pickerSelectStyles = StyleSheet.create(

    )
;

export default Select;