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
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }

    return (
        // datePicker의 value 값은 date 형식으로, 보이는 형식은 string으로
        <View>
            <TouchableOpacity onPress={showDatePicker} activeOpacity={0.9}>
                <View style={{
                    width: parseInt(width),
                    height: 40,
                    flexDirection: 'row',

                    borderWidth: 2,

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