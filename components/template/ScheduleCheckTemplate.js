import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, Alert, Pressable, StyleSheet, ScrollView, useWindowDimensions} from "react-native";
import CustomNavigation from "../CustomNavigation";
import ListContainer from "../organisms/ListContainer";
import {Style} from "../../Style";
import {schedule} from "../../dummy-data/schedule";
import {week} from "../../dummy-data/week";

function ScheduleCheckTemplate(props) {
    // dummy-data에 있는 schedule을 todaySchedule에 set해줌
    const [todaySchedule, setTodaySchedule] = useState(schedule);

    // 날짜 별로 그룹핑 하는 함수 groupByDate
    const groupByDate = todaySchedule.sort(function (a, b) {
        return new Date(a.visit_date) - new Date(b.visit_date)
    }).reduce((group, schedule) => {
        const {visit_date} = schedule;
        group[visit_date] = group[visit_date] ?? [];
        group[visit_date].push(schedule);
        return group;
    }, {});

    // 날짜 별로 그룹핑한 것을 schedules라는 변수에 넣음
    // schedules변수 구조 예시 {2021-02-11: [{schedule1}][{schedule2}], 2022-02-12: Array(1), 2022-02-13: Array(1)
    let schedules = groupByDate;

    const onPress = () => {
        console.log("hi")
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="titleNavbar" title="확정된 일정 열람하러 가기"/>
            </View>
            <View style={{flex: 9, alignItems: "center"}}>
                <ScrollView>

                    {/*schedules를 객체에서 배열로 만들어야 함.(map 함수 쓰기 위해서)*/}
                    {/*Object.entries(schedules)하면은 구조가 [array(2), array(2), array(2)]*/}
                    {/*array(2) 첫번째 원소는 날짜, 두번째 원소는 그 날짜의 스케쥴 배열들*/}

                    {Object.entries(schedules).map((item, index) => {
                        return <View key={index} style={{alignItems: "flex-start"}}>
                            <View style={{backgroundColor: Style.color2, borderTopRightRadius: 10, borderTopLeftRadius:10, padding: 10}}>
                                <Text style={{color: "white", fontSize: 16}}>{item[0]} {week[new Date(item[0]).getDay()]}요일</Text>
                            </View>
                            <ListContainer onPress={onPress} info={item[1]} listButtonContent="확인서 열람" />
                        </View>
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default ScheduleCheckTemplate;

