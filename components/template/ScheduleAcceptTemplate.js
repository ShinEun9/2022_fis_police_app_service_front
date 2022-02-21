import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, ScrollView, StyleSheet, useWindowDimensions} from "react-native";
import ListContainer from "../organisms/ListContainer";
import {Style} from "../../Style";

function ScheduleAcceptTemplate(props) {
    // const [todaySchedule, setTodaySchedule] = useState([{
    //     c_name: "이화유치원",
    //     c_address: "서울특별시 용산구 이촌로 100-8 동아그린아파트adfadfadadfaadfadfadffadffhashdadfadfkhsddkfdf",
    //     c_studentNumber: "38명"
    // }, {
    //     c_name: "또박이 유치원",
    //     c_address: "서울특별시 용산구 이촌로 100-8 동아그린아파트",
    //     c_studentNumber: "38명"
    // }, {
    //     c_name: "또또유치원",
    //     c_address: "서울특별시 용산구 이촌로 100-8 동아그린아파트",
    //     c_studentNumber: "38명"
    // }]);

    const onPress = () => {
        console.log("hi")
    }


    useEffect(() => {
        // 오늘 일정 받아오기 api 실행
        // setTodaySchedule();
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                {/*{todaySchedule.map((item) =>*/}
                {/*    <View style={{height: useWindowDimensions().height * 0.5}}>*/}
                {/*        <View style={styles.label}>*/}
                {/*            <Text style={styles.labelText}>2/17 목요일</Text>*/}
                {/*        </View>*/}
                {/*        <ListContainer onPress={onPress} info={item}/>*/}
                {/*     </View>)*/}
                {/*}*/}
            </ScrollView>
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