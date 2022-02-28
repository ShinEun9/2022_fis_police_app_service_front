import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, Alert} from "react-native";
import ListContainer from "../organisms/ListContainer";
import {Style} from "../../Style";
import CustomImageButton from "../atom/CustomImageButton";
import CustomNavigation from "../CustomNavigation";
import {schedule} from "../../store/dummy-data/schedule";
import {week} from "../../store/dummy-data/week";

function ScheduleAcceptTemplate(props) {
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


    const onPress = (keyValue) => {
        let schedule_id = []
        console.log(Object.entries(schedules)[keyValue[1]][1])
        Object.entries(schedules)[keyValue[1]][1].map((schedule)=>{
            console.log(schedule.schedule_id);
            schedule_id.push(schedule.schedule_id)
        })
        if(keyValue[0]==="accept"){
            Alert.alert(
                "수락하시겠습니까?",
                "My Alert Msg",
                [
                    {
                        text: "취소",
                        style: "cancel"
                    },
                    {
                        text: "확인", onPress: () => {
                            // api 수락 요청
                            // visit_date와 accept 보내면 됨.
                            console.log(schedule_id)
                        }
                    }
                ]
            );
        }else{
            Alert.alert(
                "거절 하시겠습니까?",
                "My Alert Msg",
                [
                    {
                        text: "취소",
                        style: "cancel"
                    },
                    {
                        text: "확인", onPress: () => {
                            // api 수락 요청
                            // visit_date와 accept 보내면 됨.
                            console.log(schedule_id)

                        }
                    }
                ]
            );
        }

    }


    useEffect(() => {
        // 오늘 일정 받아오기 api 실행
        // setTodaySchedule();
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, zIndex: 1}}>
                <CustomNavigation navigation={props.navigation} type="noGearTitleNavbar" title="내 일정 수락하러 가기"/>
            </View>
            <View style={{flex: 9, alignItems: "center", zIndex: 0}}>
                <ScrollView>

                    {/*schedules를 객체에서 배열로 만들어야 함.(map 함수 쓰기 위해서)*/}
                    {/*Object.entries(schedules)하면은 구조가 [array(2), array(2), array(2)]*/}
                    {/*array(2) 첫번째 원소는 날짜, 두번째 원소는 그 날짜의 스케쥴 배열들*/}

                    {Object.entries(schedules).map((item, index) => {
                        return <View key={index} style={{alignItems: "flex-start"}}>
                            <View style={{
                                backgroundColor: Style.color2,
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10,
                                padding: 10
                            }}>
                                <Text style={{
                                    color: "white",
                                    fontSize: 16
                                }}>{item[0]} {week[new Date(item[0]).getDay()]}요일</Text>
                            </View>
                            <ListContainer onPress={onPress} info={item[1]} type="buttonListContainer" keyValue={index}/>
                        </View>
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>);
}

export default ScheduleAcceptTemplate;

const styles = StyleSheet.create(
    {
        label: {
            backgroundColor: Style.color2,
            padding: 8,
            width: 150,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: "center"

        },
        labelText: {
            fontSize: 20,
            color: "white"
        }
    }
);