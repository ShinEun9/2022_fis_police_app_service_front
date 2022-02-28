import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    useWindowDimensions,
    Alert,
    StyleSheet, Dimensions,
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

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
let LATITUDE_DELTA = 0.02;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let newLocation={}
let location=[]
function AgentMainTemplate(props) {
    const [schedule, setSchedule] = useState(todaySchedule);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState();
    const [alocation, setaLocation] = useState();
    const [ok,setOk]=useState(true);
    const[latitude,setLatitude] = useState();
    const [longitude,setLongitude] = useState();

    const ask = async (options, callback)=>{
        const {granted} = await Location.requestForegroundPermissionsAsync();
        if(!granted){
            setOk(false);
        }
        const {coords:{latitude,longitude}}= await Location.getCurrentPositionAsync({distanceInterval:2})
        newLocation={
            latitude:latitude,
            longitude:longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }
        setaLocation(newLocation)
    }
    useEffect(() => {
        ask();
    }, []); // 위치가 바뀔 때 마다,,,,,받아와야 되는데,,,,,, 이게 가능한가????/아랭너란어라ㅣ

    useEffect((options, callback)=> {
        Location.watchPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 1,
            distanceInterval: 1
        }, position => {
            const {latitude, longitude} = position.coords;
            setLatitude(latitude)
            setLongitude(longitude)
        })
    })
    console.log("바뀌는 위치")
    console.log(latitude)
    console.log(longitude)

    useEffect(() => {
        // 오늘 일정 받아오기 api 실행
        // setTodaySchedule();
    }, [])


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
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="agentMain"/>
            </View>
            <View style={{flex: 4, justifyContent: "center", alignItems: 'center'}}>
                <View style={{alignItems: "flex-start", width: useWindowDimensions().width * 0.9, marginBottom: 5}}>
                    <Text style={{fontSize: 24}}>오늘 일정</Text>
                </View>
                <ListContainer onPress={onPress} info={schedule} minHeight="300"
                               listButtonContent="늦음"/>

                {/*<Modal*/}
                {/*    isVisible={modalVisible}*/}
                {/*    useNativeDriver={true}*/}
                {/*    onBackdropPress={()=>{setModalVisible(false)}}*/}
                {/*    hideModalContentWhileAnimating={true}*/}
                {/*>*/}
                {/*    <View style={styles.centeredView}>*/}
                {/*        <View style={styles.modalView}>*/}
                {/*            <MessageInputForm setModalVisible={setModalVisible} selectedScheduleId={selectedSchedule}/>*/}
                {/*        </View>*/}

                {/*        */}
                {/*    </View>*/}
                {/*</Modal>*/}


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
                        <MessageInputForm setModalVisible={setModalVisible} selectedScheduleId={selectedSchedule}/>
                    </View>
                </Modal>


            </View>
            <View style={{flex: 5, justifyContent: "center", alignItems: "center"}}>
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
        container: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 10,
        },

    }
)