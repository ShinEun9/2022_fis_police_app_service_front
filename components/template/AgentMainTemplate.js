import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    View,
    findNodeHandle,
    useWindowDimensions,
    Modal,
    Alert,
    StyleSheet,
    Pressable
} from "react-native";
import CustomLeftImageButton from "../atom/CustomLeftImageButton";
import ListContainer from "../organisms/ListContainer";
import CustomNavigation from "../CustomNavigation";
import MoneyCheckTemplate from "./MoneyCheckTemplate";
import {todaySchedule} from "../../dummy-data/todaySchedule";
import MessageInputForm from "../organisms/MessageInputForm";


function AgentMainTemplate(props) {
    const [schedule, setSchedule] = useState(todaySchedule);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState();

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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <MessageInputForm setModalVisible={setModalVisible} selectedScheduleId={selectedSchedule}/>
                        </View>
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
        padding: 20,
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
});