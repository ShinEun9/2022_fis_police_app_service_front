import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    StyleSheet,
    ScrollView,
    useWindowDimensions,
    ActivityIndicator, Platform, RefreshControl
} from "react-native";
import CustomNavigation from "../organisms/CustomNavigation";
import ListContainer from "../organisms/ListContainer";
import {Style} from "../../Style";
import {week} from "../../store/dummy-data/week";
import Modal from "react-native-modal";
import ConfirmationModal from "../organisms/ConfirmationModal";
import ConfirmationForm from "../organisms/ConfirmationForm";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import {showErrorMessage} from "../showErrorMessage";

function ScheduleCheckTemplate(props) {
    const [todayAndFutureSchedule, setTodayAndFutureSchedule] = useState([]);
    const [pastSchedule, setPastSchedule] = useState([]);

    // 클릭된 schedule에 대한 info를 modal에 props로 전달하기 위한 state
    const [selectedScheduleInfo, setSelectedScheduleInfo] = useState([]);

    // 모달을 띄울지 말지 true false로 정하는 state
    const [modalVisible, setModalVisible] = useState(false);

    // 확인서 작성 모달을 띄울지 확인서열람 모달을 띄울지 정하는 state
    const [whichModal, setWhichModal] = useState()

    const [isLoading, setIsLoading] = useState(true);
    const [login, setLogin] = useRecoilState(loginState);
    const [refreshing, setRefreshing] = React.useState(false);

    // 새로고침, 데이터를 불러오는 함수
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getToken().then((token) => {
            getFutureData(token).then(() => {
                setRefreshing(false)
            })
        })
    }, []);


    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token")
        return t
    }

    // 예정 일정을 불러오는 함수
    const getFutureData = async (token) => {
        console.log("getFutureData 요청")
        await axios.get(`http://3.35.135.214:8080/app/schedule/agent`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res.data)
                getPastData(token, res.data)
            })
            .catch((err) => {
                setIsLoading(true)
                // console.log("getFutureData 실패")
                showErrorMessage(err.response.data.message, setLogin, props, getFutureData)
                setIsLoading(false)
            })
    }

    // 과거 일정을 불러오는 함수
    const getPastData = async (token, futureData) => {
        await axios.get(`http://3.35.135.214:8080/app/schedule/old`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res.data);
                setIsLoading(false)
                setTodayAndFutureSchedule(futureData)
                setPastSchedule(res.data)
            })
            .catch((err) => {
                showErrorMessage(err.response.data.message, setLogin, props)
                setIsLoading(false)
            })
    }

    // 첫 화면에서 보여줄 데이터 페칭
    useEffect(() => {
        getToken().then((token) => {
            getFutureData(token)
        })
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
        let tmp = [];
        tmp = [...todayAndFutureSchedule, ...pastSchedule];
        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].schedule_id === keyValue) {
                setSelectedScheduleInfo(tmp[i]);
                setWhichModal(tmp[i].complete);
                break;
            }
        }
        setModalVisible(true);
    }


    return (
        <SafeAreaView style={{flex: 1,}}>
            <View style={{paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 0.8, zIndex: 1, position: "relative"}}>
                <CustomNavigation props={props} type="AgentTitleNavbar" title="확정된 일정 열람하러 가기"/>
            </View>
            <View style={{flex: 9, zIndex: 0, alignItems: "center"}}>
                <ScrollView style={{width: useWindowDimensions().width * 0.96}}
                            contentContainerStyle={{alignItems: "center"}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                >
                    {isLoading ? <ActivityIndicator color="gray"/> :
                        <>
                            <Text style={{fontSize: 24, marginBottom: 15, alignSelf: "flex-start"}}>예정일정</Text>

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
                                    <ListContainer onPress={onPress} info={item[1]}/>
                                </View>
                            })}

                            <Text style={{fontSize: 24, marginTop: 30, marginBottom: 15, alignSelf: "flex-start"}}>과거
                                일정</Text>
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
                        </>

                    }
                </ScrollView>
                <Modal
                    isVisible={modalVisible}
                    useNativeDriver={true}
                    hideModalContentWhileAnimating={true}
                    onBackdropPress={() => {
                        setModalVisible(false)
                    }}
                    style={{flex: 1, justifyContent: "center", alignItems: "center",}}
                >
                    <View style={{...styles.container, width: useWindowDimensions().width * 0.95, height: "auto"}}>
                        {whichModal === "complete" ? <ConfirmationModal setModalVisible={setModalVisible}
                                                                        schedule_id={selectedScheduleInfo.schedule_id}
                                                                        props={props}/> :
                            <ConfirmationForm setModalVisible={setModalVisible} defaultValue={selectedScheduleInfo}
                                              props={props} getDataFunction={() => {
                                getToken().then((token) => {
                                    getFutureData(token)
                                })
                            }
                            }/>}

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
