import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Ionicons} from '@expo/vector-icons';

function Select({label, id, items, handleChange, currentInfo}) {
    return (
        <View style={{display: "flex", flexDirection: "row"}}>
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
                    return <Ionicons name="md-arrow-down" size={24} color="gray"/>;
                }}
            />
        </View>

    )
        ;
}


const pickerSelectStyles = StyleSheet.create(
        {
            inputIOS: {
                width: Dimensions.get('window').width*0.4,
                marginRight: 10,
                height: 50,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
                paddingRight: 30,  //to ensure the text is never behind the icon
            },
            inputAndroid: {
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 0.5,
                borderColor: 'purple',
                borderRadius: 8,
                color: 'black',
                paddingRight: 30,  //to ensure the text is never behind the icon
            }
        }
    )
;

export default Select;