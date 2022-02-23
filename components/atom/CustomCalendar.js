import React, {Component, useEffect, useState} from 'react'
import {Text, View} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {FontAwesome} from "@expo/vector-icons";
import {Style} from "../../Style";

function CustomCalendar(props) {
    // const [selectedDates, setSelectedDates] = useState([]);
    // let markedDates = {}
    //
    // useEffect(() => {
    //     // api data 요청
    //     // setSelectedDates
    //     for (let selectedDate of selectedDates) {
    //         console.log(selectedDate)
    //         if (new Date(selectedDate) > new Date()) {
    //             markedDates[selectedDate] = {selected: true, selectedColor: Style.color2}
    //         } else {
    //             console.log(false)
    //             markedDates[selectedDate] = {selected: true, selectedColor: Style.color6}
    //         }
    //     }
    // }, [])

    let markedDates = {}
    let selectedDates = ['2022-02-16', '2022-02-22', '2022-02-23', '2022-02-24']
    for (let selectedDate of selectedDates) {
        console.log(selectedDate)
        if (new Date(selectedDate) > new Date()) {
            markedDates[selectedDate] = {selected: true, selectedColor: Style.color2}
        } else {
            console.log(false)
            markedDates[selectedDate] = {selected: true, selectedColor: Style.color6}
        }

    }
    useEffect(() => {
        console.log(markedDates)
    }, [markedDates])

    return (
        <View style={{backgroundColor: "white", padding: 10}}>
            <Calendar
                // Initially visible month. Default = Date()
                current={new Date().toString()}

                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => {
                    console.log('selected day', day)
                }}

                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {
                    console.log('selected day', day)
                }}

                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}

                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {
                    console.log('month changed', month)
                }}

                // Hide month navigation arrows. Default = false
                hideArrows={false}

                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                renderArrow={(direction) => {
                    return direction === "right" ? <FontAwesome name="angle-right" size={24} color="black"/> :
                        <FontAwesome name="angle-left" size={24} color="black"/>
                }}

                // Do not show days of other months in month page. Default = false
                hideExtraDays={false}

                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}


                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}

                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={substractMonth => substractMonth()}

                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}

                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                markedDates={markedDates}
            />

            <View><View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: 10,
                marginBottom: 5
            }}>
                <FontAwesome name="square" size={20} color={Style.color6}/>
                <Text style={{marginLeft: 10, color: Style.color1}}>근무일</Text>
            </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}}>

                    <FontAwesome name="square" size={20} color={Style.color2}/>
                    <Text style={{marginLeft: 10, color: Style.color1}}>근무 예정일</Text>
                </View>

            </View>
        </View>
    )
}

export default CustomCalendar;