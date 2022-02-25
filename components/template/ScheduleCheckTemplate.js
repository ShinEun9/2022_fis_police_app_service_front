import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, Alert, Pressable, StyleSheet, ScrollView, useWindowDimensions} from "react-native";
import CustomNavigation from "../CustomNavigation";
import ListContainer from "../organisms/ListContainer";
import {Style} from "../../Style";
import {schedule} from "../../store/dummy-data/schedule";
import {week} from "../../store/dummy-data/week";
import Modal from "react-native-modal";
import MessageInputForm from "../organisms/MessageInputForm";
import ConfirmationModal from "../ConfirmationModal";
import ConfirmationForm from "../organisms/ConfirmationForm";

function ScheduleCheckTemplate(props) {
    // dummy-data에 있는 schedule을 todaySchedule에 set해줌
    const [todayAndFutureSchedule, setTodayAndFutureSchedule] = useState(schedule);
    const [pastSchedule, setPastSchedule] = useState(schedule);
    const [modalVisible, setModalVisible] = useState(false);

    // 확인서 작성 모달을 띄울지 확인서열람 모달을 띄울지 정하는 state
    const [whichModal, setWhichModal] = useState()

    const dataRequest = async () => {
        // confirm/schedule로 get api요청 (방문예정 일정들) =>setTodayAndFutureSchedule
        // confirm으로 get api요청 (과거 방문 이력들 api요청) =>setPastSchedule
    }

    // 첫 화면에서 보여줄 데이터 페칭
    useEffect(() => {
        dataRequest();
    }, [])


    // 날짜 별로 그룹핑 하는 함수 groupByDate
    const groupByDate = (array) => array.sort(function (a, b) {
        return new Date(a.visit_date) - new Date(b.visit_date)
    }).reduce((group, schedule) => {
        const {visit_date} = schedule;
        group[visit_date] = group[visit_date] ?? [];
        group[visit_date].push(schedule);
        return group;
    }, {});

    // 날짜 별로 그룹핑한 것을 schedules1 이라는 변수에 넣음
    // schedules변수 구조 예시 {2021-02-11: [{schedule1}][{schedule2}], 2022-02-12: Array(1), 2022-02-13: Array(1)
    let schedules1 = groupByDate(todayAndFutureSchedule);
    let schedules2 = groupByDate(pastSchedule);

    const onPress = (keyValue) => {
        console.log(keyValue);
        todayAndFutureSchedule.map((item)=>{if(item.schedule_id===keyValue){
            setWhichModal(item.complete);
        }})

        setModalVisible(true);

    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="noGearTitleNavbar" title="확정된 일정 열람하러 가기"/>
            </View>
            <View style={{flex: 9, alignItems: "center"}}>
                <ScrollView>
                    <Text style={{fontSize: 24, marginBottom: 15}}>예정일정</Text>

                    {/*schedules를 객체에서 배열로 만들Ï어야 함.(map 함수 쓰기 위해서)*/}
                    {/*Object.entries(schedules)하면은 구조가 [array(2), array(2), array(2)]*/}
                    {/*array(2) 첫번째 원소는 날짜, 두번째 원소는 그 날짜의 스케쥴 배열들*/}
                    {Object.entries(schedules1).map((item, index) => {
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
                            <ListContainer onPress={onPress} info={item[1]} />
                        </View>
                    })}

                    <Text style={{fontSize: 24, marginTop: 30, marginBottom: 15}}>과거 일정</Text>
                    {Object.entries(schedules2).map((item, index) => {
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
                            <ListContainer onPress={onPress} info={item[1]} listButtonContent="확인서 열람"/>
                        </View>
                    })}
                </ScrollView>
                <Modal
                    isVisible={modalVisible}
                    useNativeDriver={true}
                    hideModalContentWhileAnimating={true}
                    onBackdropPress={() => {
                        setModalVisible(false)
                    }}
                    style={{flex: 1, justifyContent: "center", alignItems: "center", }}
                >
                    <View style={{...styles.container, width: useWindowDimensions().width*0.95, height: "auto"}}>
                        {whichModal==="complete"?<ConfirmationModal setModalVisible={setModalVisible}/>: <ConfirmationForm setModalVisible={setModalVisible} />}
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

export default ScheduleCheckTemplate;

const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 10,
            paddingVertical: 20
        },

    }
)
