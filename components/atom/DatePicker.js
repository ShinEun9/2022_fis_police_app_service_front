import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {AntDesign} from "@expo/vector-icons";
import {Style} from "../../Style";

function DatePicker({id, handleChange, currentInfo, width}) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const getFormattedDate = (date) => {
        const year = date.toLocaleDateString('ko-KR', {year: 'numeric'});
        const month = date.toLocaleDateString('ko-KR', {month: 'long',});
        const day = date.toLocaleDateString('ko-KR', {day: 'numeric',});
        return `${year} ${month} ${day}`;
    }

    return (
        <View>
            <TouchableOpacity onPress={showDatePicker} activeOpacity={0.9}>
                <View style={{
                    width: parseInt(width),
                    height: 40,
                    flexDirection: 'row',
                    //borderwidth: "2",
                    borderColor: `${Style.color5}`,
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10
                }}>
                    <Text style={{color: currentInfo[id] === null ? Style.color5 : "black"}}>
                        {currentInfo[id] === null ? "날짜 선택" : `${getFormattedDate(currentInfo[id])}`}
                    </Text>
                    <AntDesign name="calendar" size={24} color={Style.color5}/>
                </View>
            </TouchableOpacity>
            <DateTimePickerModal
                id="c_date"
                locale="ko"
                isVisible={isDatePickerVisible}
                mode="date"
                date={currentInfo[id] === null ? new Date() : currentInfo[id]}
                onConfirm={(value) => {
                    handleChange(id, value);
                    hideDatePicker();
                }}
                onCancel={hideDatePicker}
            />

        </View>
    );
}

export default DatePicker;