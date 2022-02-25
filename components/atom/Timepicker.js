import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function Timepicker({id, currentInfo, handleChange}) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [time, setTime] = useState(null);

    // useEffect(() => {
    //     console.log(time)
    // }, [time])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (time) => {
        setTime(time);
        hideDatePicker();
    };

    const getFormattedTime = (time) => {
        let a = time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})
        return a;
    }

    return (
        <View>
            <TouchableOpacity onPress={showDatePicker} activeOpacity={0.9}>
                <View style={{
                    width: 233,
                    height: 40,
                    flexDirection: 'row',
                    borderWidth: "1",
                    borderColor: "gray",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10
                }}>
                    <Text>
                        {currentInfo[id] === null ? "시간 선택" : getFormattedTime(currentInfo[id])}
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
                isVisible={isDatePickerVisible}
                mode="time"
                date={currentInfo[id] === null ? new Date() : currentInfo[id]}
                onConfirm={(time) => {
                    console.log(time);
                    handleChange(id, time);
                    hideDatePicker();
                }}
                onCancel={hideDatePicker}/>
        </View>)

        ;
}

export default Timepicker;