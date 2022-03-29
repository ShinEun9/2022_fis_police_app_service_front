import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    useWindowDimensions,
    Dimensions, ActivityIndicator, TouchableOpacity, Platform, StyleSheet
} from "react-native";
import Modal from "react-native-modal";

import CustomLeftImageButton from "../atom/CustomLeftImageButton";
import ListContainer from "../organisms/ListContainer";
import CustomNavigation from "../organisms/CustomNavigation";
import MoneyCheckTemplate from "./MoneyCheckTemplate";
import MessageInputForm from "../organisms/MessageInputForm";
import {Style} from "../../Style";
import * as Location from "expo-location";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesome} from "@expo/vector-icons";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import {showErrorMessage} from "../showErrorMessage";


function AgentMainTemplate({props}) {
    const [schedule, setSchedule] = useState([]); // 오늘 일정 저장
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState();
    const [login, setLogin] = useRecoilState(loginState);
    const [ok, setOk] = useState(true); //위치 권한 허용 여부 저장


    const ask = async (options) => {
        const {status} = await Location.requestForegroundPermissionsAsync(); // 사용자의 위치 접근 권한을 요청하는 코드
        if (status !== "granted") {
            setOk(false);
        } else {
            const {backgroundPermission} = await Location.requestBackgroundPermissionsAsync() // 백그라운드에서의 위치 접근 권한을 요청하는 코드 -> 안드로이드에서는 살행 안 됨,,
            if (backgroundPermission !== "granted") {
                setOk(false);
            }
        }
    }
    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token")
        return t
    }

    const sendLocation = async (token, lat, lng) => {
        const location = { // 현장요원의 위치를 받아 문자열로 변경하여 서버와 통신
            a_cur_lat: lat.toString(),
            a_cur_long: lng.toString()
        }
        await axios.post(`http://3.35.135.214:8080/app/agent/currentLocation`, location, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(location)
                console.log("send")
            })
            .catch((err) => {
                console.log("전송에러")
                console.log(token)
                console.log(err.response.data.message)
                //안됨
                showErrorMessage(err.response.data.message, setLogin, props, () => {
                    console.log("hi")
                }, "main")
            })
    }

    const toSendLoc = (latitude, longitude) => {
        getToken().then((res) => {
            sendLocation(res, latitude, longitude)
        })
    }


    useEffect(async () => {
        ask().then((res) => {
            if (ok === true) {
                Location.watchPositionAsync({ //3초에 한 번 현장요원의 위치를 서버로 보냄
                        accuracy: 6,
                        timeInterval: 3000,
                    }, async (position) => {
                        let t = await AsyncStorage.getItem("@u_auth")
                        if (t === "AGENT") { //현장요원으로 로그인 한 경우에만 서버에 현장요원 위치 전송
                            const {latitude, longitude} = position.coords;
                            toSendLoc(latitude, longitude)
                        }

                    },
                )
            }
        })
    }, [])

    const getTodaySchedule = async (token) => { // 오늘 일정을 받아오는 코드
        await axios.get(`http://3.35.135.214:8080/app/schedule/today`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setSchedule(res.data);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err.response)
                setIsLoading(false)
                showErrorMessage(err.response.data.message, setLogin, props, getTodaySchedule, "main")

            })
    }

    useEffect(() => {
        getToken().then((res) => {
            getTodaySchedule(res)
        })
    }, []);


    const onPress = (keyValue) => {
        setSelectedSchedule(keyValue)
        setModalVisible(true)
    }

    // 해당 메뉴로 이동할 수 있는 코드
    const goScheduleAcceptTemplate = () => {
        props.navigation.navigate('ScheduleAcceptTemplate')
    }
    const goScheduleCheckTemplate = () => {
        props.navigation.navigate('ScheduleCheckTemplate')
    }
    const goMoneyCheckTemplate = () => {
        props.navigation.navigate('MoneyCheckTemplate')

    }

    return (

        <SafeAreaView style={{flex: 1}}>
            <View style={{paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 1,}}>
                <CustomNavigation props={props} type="agentMain"/>
            </View>
            <View style={{flex: 9,}}>
                <View style={{flex: 5, justifyContent: "center", alignItems: 'center',}}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: useWindowDimensions().width * 0.9,
                        marginBottom: 5
                    }}>
                        <Text style={{fontSize: 24, marginRight: 10}}>오늘 일정</Text>
                        <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={() => {
                            setIsLoading(true)
                            getToken().then((res) => {
                                getTodaySchedule(res)
                            })
                        }}>
                            <Text style={{color: "gray"}}>일정 새로고침 </Text>
                            <FontAwesome name="refresh" size={15} color="gray"/>
                        </TouchableOpacity>

                    </View>
                    {isLoading ? <View style={{
                            backgroundColor: `${Style.color3}`,
                            padding: 10,
                            paddingBottom: 0,
                            minHeight: 250,
                            marginBottom: 20,
                            height: "auto",
                            width: Dimensions.get('window').width * 0.96,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <ActivityIndicator color="gray"/>
                        </View> :
                        <ListContainer onPress={onPress} info={schedule} minHeight="250"
                                       listButtonContent="늦음"/>
                    }
                    <Modal
                        isVisible={modalVisible}
                        useNativeDriver={true}
                        hideModalContentWhileAnimating={true}
                        onBackdropPress={() => {
                            setModalVisible(false)
                        }}
                        style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                    >
                        <View style={{...styles.container, width: useWindowDimensions().width * 0.9, height: 300}}>
                            <MessageInputForm setModalVisible={setModalVisible}
                                              selectedScheduleId={selectedSchedule} props={props}/>
                        </View>
                    </Modal>
                </View>

                <View style={{flex: 5, justifyContent: "center", alignItems: "center"}}>
                    <CustomLeftImageButton content="내 일정 수락하러 가기" onPress={goScheduleAcceptTemplate}
                                           name="calendar-check-o"
                                           size={30} color="black"/>
                    <CustomLeftImageButton content="확정된 일정 열람하러 가기" onPress={goScheduleCheckTemplate}
                                           name="calendar"
                                           size={30} color="black"/>
                    <CustomLeftImageButton content="급여 확인하러 가기" onPress={goMoneyCheckTemplate} name="dollar" size={30}
                                           color="black"/>

                </View>

            </View>
        </SafeAreaView>
    )
        ;
}

export default AgentMainTemplate;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },
})