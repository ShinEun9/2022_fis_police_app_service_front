import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    useWindowDimensions,
    Alert,
    StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

import CustomLeftImageButton from "../atom/CustomLeftImageButton";
import ListContainer from "../organisms/ListContainer";
import CustomNavigation from "../CustomNavigation";
import MoneyCheckTemplate from "./MoneyCheckTemplate";
import {todaySchedule} from "../../store/dummy-data/todaySchedule";
import MessageInputForm from "../organisms/MessageInputForm";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

function AgentMainTemplate({props}) {
    const [schedule, setSchedule] = useState([]);
    // const [schedule, setSchedule] = useState(todaySchedule);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState();

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token")
        return t
    }

    const getTodaySchedule = async (token) => {
        await axios.get(`http://localhost:8080/app/schedule/today`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log(res);
                setSchedule(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getToken().then((res)=>{
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
            <View style={{flex: 1}}>
                <CustomNavigation navigation={props.navigation} type="agentMain"/>
            </View>
            <View style={{flex: 4, justifyContent: "center", alignItems: 'center'}}>
                <View style={{
                    alignItems: "flex-start",
                    width: useWindowDimensions().width * 0.9,
                    marginBottom: 5
                }}>
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