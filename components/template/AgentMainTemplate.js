import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    useWindowDimensions,
    Alert,
    StyleSheet, Dimensions, ActivityIndicator, RefreshControl, ScrollView,
} from "react-native";
import Modal from "react-native-modal";

import CustomLeftImageButton from "../atom/CustomLeftImageButton";
import ListContainer from "../organisms/ListContainer";
import CustomNavigation from "../CustomNavigation";
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


const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
let LATITUDE_DELTA = 0.02;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let newLocation = {}
let location = []

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


function AgentMainTemplate({props, setLogin}) {
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState();
    const [alocation, setaLocation] = useState();
    const [ok, setOk] = useState(true);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    const ask = async (options, callback) => {
        const {granted} = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }
        const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({distanceInterval: 2})
        newLocation = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }
        setaLocation(newLocation)
    }
    useEffect(() => {
        ask();
    }, []); // 처음 로딩했을 때 권한 요청 & 처음 위치 get

    useEffect((options, callback) => {
        Location.watchPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 300,
            distanceInterval: 1
        }, position => {
            const {latitude, longitude} = position.coords;
            setLatitude(latitude)
            setLongitude(longitude)
        })
        console.log("send")
    },)// 시간 간격마다 사용자의 위치 변화 추적 근데 안됨,,,,,,왜!!!!!! https://velog.io/@flowersayo/React-NativeExpo%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-GPS-%EC%9C%84%EC%B9%98%EC%B6%94%EC%A0%81-%EB%9F%AC%EB%8B%9D-%ED%8A%B8%EB%9E%98%ED%82%B9-%EC%95%B1-%EB%A7%8C%EB%93%A4%EA%B8%B0


    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token")
        return t
    }

    const getTodaySchedule = async (token) => {
        await axios.get(`http://localhost:8080/app/schedule/today`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res);
                setSchedule(res.data);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getToken().then((res) => {
            console.log(res);
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
            <View style={{flex: 0.5}}>
                <CustomNavigation navigation={props.navigation} type="agentMain" setLogin={setLogin}/>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={{flex: 4, justifyContent: "center", alignItems: 'center'}}>

                    <View style={{
                        alignItems: "flex-start",
                        width: useWindowDimensions().width * 0.9,
                        marginBottom: 5
                    }}>
                        <Text style={{fontSize: 24}}>오늘 일정</Text>
                    </View>
                    {isLoading ? <View style={{
                            backgroundColor: `${Style.color3}`,
                            padding: 10,
                            paddingBottom: 0,
                            minHeight: 300,
                            marginBottom: 20,
                            height: "auto",
                            width: Dimensions.get('window').width * 0.96,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <ActivityIndicator color={Style.color2}/>
                        </View> :
                        <ListContainer onPress={onPress} info={schedule} minHeight="300"
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
                                              selectedScheduleId={selectedSchedule}/>
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
                    <CustomLeftImageButton content="급여 확인" onPress={goMoneyCheckTemplate} name="dollar" size={30}
                                           color="black"/>

                </View>
            </ScrollView>


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