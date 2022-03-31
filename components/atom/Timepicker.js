import React, { useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Style} from "../../Style";
import {AntDesign} from "@expo/vector-icons";

function Timepicker({id, currentInfo, handleChange, width}) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const getFormattedTime = (time) => {
        let a = time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})
        return a;
    }

    return (
        // timepicker value값은 date 형식, 보이는 형식은 string
        <View>
            <TouchableOpacity onPress={showDatePicker} activeOpacity={0.9}>
                <View style={{
                    width: parseInt(width),
                    height: 40,
                    flexDirection: 'row',
                    borderWidth: 2,
                    borderColor:  Style.color5,
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10
                }}>
                    <Text style={{color: currentInfo[id] === null ? Style.color5: "black"}}>
                        {currentInfo[id] === null ? "시간 선택" : getFormattedTime(currentInfo[id])}
                    </Text>
                    <AntDesign name="clockcircle" size={20} color={Style.color5} />
                </View>
            </TouchableOpacity>
            <DateTimePickerModal
                locale="ko"
                isVisible={isDatePickerVisible}
                mode="time"
                date={currentInfo[id] === null ? new Date() : currentInfo[id]}
                onConfirm={(time) => {
                    handleChange(id, time);
                    hideDatePicker();
                }}
                onCancel={hideDatePicker}/>
        </View>)

        ;
}

export default Timepicker;