import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function DatePicker(props) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
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
                    width: 200,
                    height: 40,
                    flexDirection: 'row',
                    borderWidth: "1",
                    borderColor: "gray",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10
                }}>
                    <Text>
                        {date === null ? "날짜 선택" : `${getFormattedDate(date)}`}
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
                locale="ko"
                date={date}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

        </View>
    );
}

export default DatePicker;