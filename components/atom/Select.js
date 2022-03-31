import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {FontAwesome} from '@expo/vector-icons';
import {Style} from "../../Style";

function Select({label, id, items, width, handleChange, currentInfo}) {
    // label-> 아무 것도 선택하지 않았을 때 default로 나오는 값 (예를 들면 ‘참여/비참여 선택’)
    // items->[{label: “참여”, value: true},{label:”비참여", value: false}]
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
                    borderWidth: 2,
                    borderColor: `${Style.color5}`,
                    paddingRight: 30,  //to ensure the text is never behind the icon
                },
                inputAndroid: {
                    width: width,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderWidth: 2,
                    borderColor: `${Style.color5}`,
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

export default Select;