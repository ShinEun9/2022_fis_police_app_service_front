import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Ionicons} from '@expo/vector-icons';
import {Style} from "../../Style";

function Select({label, id, items, width, height, handleChange, currentInfo}) {
    return (
        <View style={{display: "flex"}}>
            <RNPickerSelect
                value={currentInfo[id]}
                onValueChange={(value) => handleChange(id, value)}
                placeholder={{
                    label: label,
                    value: null
                }}
                items={items}
                style={{
                    ...pickerSelectStyles,
                    flex: 1,
                    iconContainer: {
                        top: 10,
                        right: 18,
                    },
                }}
                useNativeAndroidPickerStyle={false}
                textInputProps={{underlineColor: 'yellow'}}
                Icon={() => {
                    return <Ionicons name="md-arrow-down" size={24} color={Style.color1}/>;
                }}
            />
        </View>

    )
        ;
}


const pickerSelectStyles = StyleSheet.create(
        {
            inputIOS: {
                marginRight: 10,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 2,
                borderColor: `${Style.color1}`,
                paddingRight: 30,  //to ensure the text is never behind the icon
            },
            inputAndroid: {
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 0.5,
                borderColor: `${Style.color1}`,
                borderRadius: 8,
                color: 'black',
                paddingRight: 30,  //to ensure the text is never behind the icon
            }
        }
    )
;

export default Select;