import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    useWindowDimensions,
    Alert,
    StyleSheet, Dimensions, ActivityIndicator, ScrollView, TouchableOpacity, Platform,
} from "react-native";
import Modal from "react-native-modal";

import CustomLeftImageButton from "../atom/CustomLeftImageButton";
import ListContainer from "../organisms/ListContainer";
import CustomNavigation from "../organisms/CustomNavigation";
import MoneyCheckTemplate from "./MoneyCheckTemplate";
import {todaySchedule} from "../../store/dummy-data/todaySchedule";
import MessageInputForm from "../organisms/MessageInputForm";

import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";
import styled from "styled-components/native";
import * as Location from "expo-location";
import position from "react-native-web/dist/exports/Touchable/Position";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesome} from "@expo/vector-icons";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import {showErrorMessage} from "../showErrorMessage";
import * as TaskManager from "expo-task-manager"
import Expo from "react-native/Libraries/Components/View/ReactNativeViewViewConfig";


const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
let LATITUDE_DELTA = 0.02;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let newLocation = {}
let location = []


function AgentMainTemplate({props}) {
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState();
    const [login, setLogin] = useRecoilState(loginState);
    const [alocation, setaLocation] = useState();
    const [ok, setOk] = useState(true);

    const TASK_NAME ="BACKGROUND_LOCATION_TASK"

    const ask = async (options) => {
        const {status}=await Location.requestForegroundPermissionsAsync();
        if (status!=="granted") {
            setOk(false);
        }
        else{
            const {backgroundPermission}=await Location.requestBackgroundPermissionsAsync()
            if (backgroundPermission!=="granted") {
                setOk(false);
            }
        }
    }
    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token")
        return t
    }
    // useEffect(()=>{
    //     ask();
    // })

    const sendLocation = async (token,lat,lng) => {
        const location={
            a_cur_lat:lat.toString(),
            a_cur_long:lng.toString()
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
                showErrorMessage(err.response.data.message, setLogin, props)
            })
    }

    const toSendLoc = (latitude,longitude) => {
        getToken().then((res) => {
            sendLocation(res,latitude,longitude)
        })
    }

    // useEffect(()=>{
    //     if(ok===true) {
    //         const agentLocation = Geolocation.watchPosition(
    //             (position) => {
    //                 const latitude = position.coords.latitude
    //                 const longitude = position.coords.longitude
    //             },
    //             (error) => {
    //                 console.error(error.message)
    //             },
    //             {
    //                 enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
    //             }
    //         )
    //     }
    // })



    useEffect(() => {
        ask().then((res) => {
            if(ok===true) {
                console.log("inside")
                Location.watchPositionAsync({
                        accuracy:6,
                        timeInterval: 3000,
                        // distanceInterval:5
                    }, position => {
                        console.log(position)
                        const {latitude, longitude} = position.coords;
                        toSendLoc(latitude, longitude)
                    },
                )
            }
        })

    }, [])

    const getTodaySchedule = async (token) => {
        await axios.get(`http://3.35.135.214:8080/app/schedule/today`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                // console.log(res);
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
            <View style={{paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 1, }}>
                <CustomNavigation props={props} type="agentMain"/>
            </View>
            <View style={{flex: 9, }}>
                <View style={{flex: 5, justifyContent: "center", alignItems: 'center', }}>
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


    }
)