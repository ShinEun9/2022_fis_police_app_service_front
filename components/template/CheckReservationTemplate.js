import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Image,
    Alert,
    ActivityIndicator,
    useWindowDimensions
} from "react-native";
import CustomMap from "../molecule/CustomMap";
import {Style} from "../../Style";
import CustomNavigation from "../organisms/CustomNavigation";
import CustomModal from "../atom/CustomModal";
import CustomImageModal from "../atom/CustomImageModal";
import ConfirmationModal from "../organisms/ConfirmationModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ApplyRecord from "../organisms/ApplyRecord";
import ConfirmationForm from "../organisms/ConfirmationForm";

import CustomButton from "../atom/CustomButton";
import Modal from "react-native-modal";

import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";


const screen = Dimensions.get("window");
let nowSchedule = [];


function CheckReservationTemplate(props) {

    const [selectedSchedule, setSelectedSchedule] = useState()
    const [confirmation, setConfirmation] = useState([])
    const [confirm, setConfirm] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    const [historyList, setHistoryList] = useState([])
    const [agentList, setAgentList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [login, setLogin] = useRecoilState(loginState);


    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }
    useEffect(() => {
        getToken().then((token) => {
            getHistoryList(token)
            getAgentList(token)
        })
    }, [])

    const onPress = (keyValue) => {
        setSelectedSchedule(keyValue)
        setModalVisible(true)
    }


    const getHistoryList = async (token) => {
        await axios.get(`http://localhost:8080/app/confirm/center`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log("과거기록")
                console.log(res.data)
                const buf = []
                res.data.data.map((data, index) => {
                    buf[index] = {
                        key: index,
                        visit_date: data.visit_date,
                        new_child: data.new_child,
                        old_child: data.old_child
                    }
                })

                setHistoryList(buf)
            }).catch((err) => {

                console.log(err)
            })
    }

    // const getConfirmation = async (token) => {
    //     await axios.get(`http://localhost:8080/app/confirm/${nowSchedule}`, {headers: {Authorization: `Bearer ${token}`}})
    //         .then((res) => {
    //             console.log("확인서")
    //             console.log(res.data)
    //             setConfirmation(res.data)
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }


    const getAgentList = async (token) => {
        await axios.get(`http://localhost:8080/app/schedule/confirm`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log("현장요원")
                console.log(res.data)
                let list = []
                res.data.map((data, index) => {
                    list[index] = {
                        key: index,
                        a_name: data.a_name,
                        a_ph: data.a_ph,
                        a_picture: 'data:image/png;base64,' + data.a_picture,
                        late_comment: data.late_comment,
                        schedule_id: data.schedule_id,
                    }
                    nowSchedule[0] = data.schedule_id
                    // getToken().then((token) => {
                    //     getConfirmation(token)
                    // })
                })
                setIsLoading(false)
                setAgentList(list)

            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.nav}>
                <CustomNavigation navigation={props.navigation} type="titleNavbar" title="내 예약 확인하러 가기"/>
            </View>
            {isLoading?<View style={{flex:9, justifyContent:"center", alignItems:"center"}}><ActivityIndicator/></View>:<>
                <View style={styles.comment}>
                    <Text style={styles.text}>{agentList.late_comment}</Text>
                </View>
                <View style={styles.map}>
                    <CustomMap/>
                </View>
                <View style={styles.info}>
                    <ScrollView horizontal pagingEnabled>
                        {agentList.map((data, index) => {
                            return <View key={index} style={styles.agent}>
                                <Image
                                    style={styles.image}
                                    source={{uri: data.a_picture}}/>
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>현장요원 이름 : {data.a_name}</Text>
                                    <Text style={styles.text}>전화번호 : {data.a_ph}</Text>


                                    {/*{confirm === false ? <CustomModal backgroundColor={Style.color2} width={120}*/}
                                    {/*                                  height={35} content={"확인서 서명"}*/}
                                    {/*                                  modalWidth={screen.width * 0.93}*/}
                                    {/*                                  modalHeight={screen.height * 0.7}*/}
                                    {/*                                  modalButtonContent={"서명"}*/}
                                    {/*                                  confirm_id={confirmation.confirm_id}*/}
                                    {/*                                  schedule_id={nowSchedule}*/}
                                    {/*                                  modalContent={<ConfirmationModal*/}
                                    {/*                                      name={data.a_name} content={confirmation}*/}
                                    {/*                                      schedule_id={nowSchedule}/>}/> :*/}
                                    {/*    <CustomModal backgroundColor={Style.color2} width={120}*/}
                                    {/*                 height={35} content={"확인서 열람"} modalWidth={screen.width * 0.93}*/}
                                    {/*                 modalHeight={screen.height * 0.7} modalButtonContent={"확인"}*/}
                                    {/*                 modalContent={<ConfirmationModal name={data.a_name}*/}
                                    {/*                                                  content={confirmation}*/}
                                    {/*                                                  schedule_id={nowSchedule}/>}/>}*/}


                                </View>
                            </View>
                        })}

                    </ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <CustomButton keyValue={nowSchedule} width={150} height={40} backgroundColor={Style.color2}
                                      onPress={onPress} content={"확인서 열람"}/>
                    </View>

                    <Modal
                        isVisible={modalVisible}
                        useNativeDriver={true}
                        hideModalContentWhileAnimating={true}
                        onBackdropPress={() => {
                            setModalVisible(false)
                        }}
                        style={{flex: 1, justifyContent: "center", alignItems: "center",}}
                    >
                        <View style={{
                            ...styles.modalContainer,
                            width: screen.width * 0.95,
                            height: "auto"
                        }}>
                            <ConfirmationModal setModalVisible={setModalVisible}
                                               schedule_id={selectedSchedule}/>
                        </View>
                    </Modal>



                </View>
                <View style={styles.history}>
                    <View style={{paddingVertical: 8}}>
                        <Text style={{fontSize: 25}}>내 과거 신청 이력</Text>
                    </View>

                    {/*<Text style={styles.text}>과거이력</Text>*/}
                    {/*<Text style={styles.text}>과거이력</Text>*/}
                    {/*<Text style={styles.text}>과거이력</Text>*/}
                    {/*<Text style={styles.text}>과거이력</Text>*/}

                    {historyList.map((data, a) => {
                        return <Text key={a} style={styles.text}>{data.visit_date}</Text>
                    })}
                    <View style={styles.button}>
                        <CustomImageModal name={"plus-square-o"} size={24} color={"black"}
                                          modalContent={<ApplyRecord content={historyList}/>}/>
                    </View>


                </View>
            </>}

        </SafeAreaView>
    );
}

export default CheckReservationTemplate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 4,
    },
    comment: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    info: {
        flex: 2.7,
        justifyContent: "center"
    },
    agent: {
        // justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: screen.width
    },
    history: {
        flex: 2.9,
        alignItems: "center",
    },
    nav: {
        flex: 0.7,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        marginTop: 5
    },
    text: {
        fontSize: 20,
        paddingVertical: 3,
    },
    image: {
        width: 130,
        height: 130,
    },
    textContainer: {
        paddingHorizontal: 25,
    },
    modalContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },

})