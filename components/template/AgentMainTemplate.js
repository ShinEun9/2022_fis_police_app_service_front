import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, findNodeHandle, useWindowDimensions, Modal, Alert, StyleSheet} from "react-native";
import CustomLeftImageButton from "../atom/CustomLeftImageButton";
import ListContainer from "../organisms/ListContainer";
import CustomNavigation from "../CustomNavigation";
import MoneyCheckTemplate from "./MoneyCheckTemplate";


function AgentMainTemplate(props) {
    const [todaySchedule, setTodaySchedule] = useState([{
        c_name: "이화유치원",
        c_address: "서울특별시 용산구 이촌로 100-8 동아그린아파트adfadfadadfaadfadfadffadffhashdadfadfkhsddkfdf",
        c_studentNumber: "38명"
    }, {
        c_name: "이화유치원",
        c_address: "서울특별시 용산구 이촌로 100-8 동아그린아파트",
        c_studentNumber: "38명"
    },{
        c_name: "이화유치원",
        c_address: "서울특별시 용산구 이촌로 100-8 동아그린아파트",
        c_studentNumber: "38명"
    },{
        c_name: "이화유치원",
        c_address: "서울특별시 용산구 이촌로 100-8 동아그린아파트",
        c_studentNumber: "38명"
    },{
        c_name: "이화유치원",
        c_address: "서울특별시 용산구 이촌로 100-8 동아그린아파트",
        c_studentNumber: "38명"
    }]);
    useEffect(() => {
        // 오늘 일정 받아오기 api 실행
        // setTodaySchedule();
    }, [])


    const onPress = () => {
        console.log("hi")
    }

    const goScheduleAcceptTemplate = () => {
        props.navigation.navigate('ScheduleAcceptTemplate')
    }
    const goScheduleCheckTemplate = () => {
        props.navigation.navigate('ScheduleCheckTemplate')
    }
    const goMoneyCheckTemplate = () =>{
        props.navigation.navigate('MoneyCheckTemplate')

    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="agent"/>
            </View>
            <View style={{flex: 4, justifyContent: "center", alignItems: 'center'}}>
                <View style={{alignItems: "flex-start", width: useWindowDimensions().width * 0.9, marginBottom: 5}}>
                    <Text style={{fontSize: 24}}>오늘 일정</Text>
                </View>
                <ListContainer onPress={onPress} info={todaySchedule}/>
            </View>
            <View style={{flex: 5, backgroundColor: "teal", justifyContent: "center", alignItems: "center"}}>
                <CustomLeftImageButton content="내 일정 수락하러 가기" onPress={goScheduleAcceptTemplate} name="calendar-check-o"
                                       size={30} color="black"/>
                <CustomLeftImageButton content="확정된 일정 열람하러 가기" onPress={goScheduleCheckTemplate} name="calendar"
                                       size={30} color="black"/>
                <CustomLeftImageButton content="급여 확인" onPress={goMoneyCheckTemplate} name="dollar" size={30}
                                       color="black"/>
            </View>


        </SafeAreaView>
    );
}

export default AgentMainTemplate;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});