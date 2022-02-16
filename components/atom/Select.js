import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Ionicons} from '@expo/vector-icons';

function Select(props) {
    const [selectValue, setSelectValue] = React.useState({sido: '', local: ''});
    const handleSelectChange = (name, value) => {
        setSelectValue({
            ...selectValue,
            [name]: value
        })
    }

    return (
        // <View style={styles.container}>
        //     <RNPickerSelect
        //         value={selectValue.sido}
        //         onValueChange={(value) => handleSelectChange("sido", value)}
        //         placeholder={{
        //             label: '시/도 선택',
        //             value: null
        //         }}
        //         items={[
        //             {label: 'Football', value: 'football'},
        //             {label: 'Baseball', value: 'baseball'},
        //             {label: 'Hockey', value: 'hockey'},
        //         ]}
        //         style={{
        //             ...styles,
        //             width: 160,
        //             iconContainer: {
        //                 top: 10,
        //                 right: 18,
        //             },
        //         }}
        //         useNativeAndroidPickerStyle={false}
        //         textInputProps={{underlineColor: 'yellow'}}
        //     />
        //     <Ionicons name="md-arrow-down" size={24} color="gray"/>
        // </View>


    <View style={{display: "flex", flexDirection: "row"}}>
        <RNPickerSelect
            value={selectValue.sido}
            onValueChange={(value) => handleSelectChange("sido", value)}
            placeholder={{
                label: '시/도 선택',
                value: null
            }}
            items={[
                {label: 'Football', value: 'football'},
                {label: 'Baseball', value: 'baseball'},
                {label: 'Hockey', value: 'hockey'},
            ]}
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
        <RNPickerSelect
            onValueChange={(value) => handleSelectChange("local", value)}
            value={selectValue.local}
            placeholder={{
                label: '지역 선택',
                value: null
            }}
            items={[
                {label: 'Football', value: 'football'},
                {label: 'Baseball', value: 'baseball'},
                {label: 'Hockey', value: 'hockey'},
            ]}
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
// const styles = StyleSheet.create(
//         {
//             container: {
//                 display: "flex",
//                 flexDirection: "row",
//                 borderWidth: 1,
//                 borderRadius: 10,
//                 borderColor: "gray",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 paddingHorizontal: 15
//             },
//             inputIOS: {
//                 marginRight: 10,
//                 fontSize: 16,
//                 height: 50,
//                 borderRadius: 4,
//                 color: 'black',
//                 paddingRight: 30,  //to ensure the text is never behind the icon
//             },
//             inputAndroid: {
//                 fontSize: 16,
//                 paddingHorizontal: 10,
//                 paddingVertical: 8,
//                 borderWidth: 0.5,
//                 borderColor: 'purple',
//                 borderRadius: 8,
//                 color: 'black',
//                 paddingRight: 30,  //to ensure the text is never behind the icon
//             }
//         }
//     )
// ;


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
                paddingRight: 30,  //to ensure the text is never behind the icon
            },
            inputAndroid: {
                fontSize: 16,
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