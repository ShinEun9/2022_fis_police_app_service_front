import React, {useEffect, useState} from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Image,
    ActivityIndicator, Platform, RefreshControl,
} from "react-native";
import CustomMap from "../molecule/CustomMap";
import {Style} from "../../Style";
import CustomNavigation from "../organisms/CustomNavigation";
import CustomImageModal from "../atom/CustomImageModal";
import ConfirmationModal from "../organisms/ConfirmationModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ApplyRecord from "../organisms/ApplyRecord";
import CustomButton from "../atom/CustomButton";
import Modal from "react-native-modal";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import {showErrorMessage} from "../showErrorMessage";


const screen = Dimensions.get("window");
let nowSchedule = -1;
let c_latitude;
let c_longitude;
let centerName;

function CheckReservationTemplate(props) {

    const [selectedSchedule, setSelectedSchedule] = useState()
    const [modalVisible, setModalVisible] = useState(false);

    const [historyList, setHistoryList] = useState([])
    const [agentList, setAgentList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [login, setLogin] = useRecoilState(loginState);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getToken().then((token) => {
            getHistoryList(token)
            getAgentList(token).then(()=>{
                setRefreshing(false);
            })
        })
    }, []);

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
        await axios.get(`http://3.35.135.214:8080/app/confirm/center`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log("과거기록")
                console.log(res.data)
                const buf = []
                res.data.data.map((data, index) => {
                    buf[index] = {
                        key: index,
                        visit_date: data.visit_date,
                        new_child: data.new_child,
                        old_child: data.old_child,
                        center_name: data.center_name
                    }
                })
                const sortBuf = buf.sort((a, b) => new Date(a.visit_date) - new Date(b.visit_date))

                setHistoryList(sortBuf)
            }).catch((err) => {
                console.log(err);
                console.log(err.response.data.message);
                showErrorMessage(err.response.data.message);
            })
    }

    const getAgentList = async (token) => {
        await axios.get(`http://3.35.135.214:8080/app/schedule/confirm`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log("현장요원")
                console.log(res.data)
                let list = []
                res.data.map((data, index) => {
                    if (data.a_picture === null) {
                        list[index] = {
                            key: data.agent_id,
                            a_name: data.a_name,
                            a_ph: data.a_ph,
                            a_picture: 'https://ifh.cc/g/pvXWYR.png',
                            late_comment: data.late_comment,
                            schedule_id: data.schedule_id,
                            c_name:data.c_name
                        }
                    } else {
                        list[index] = {
                            key: data.agent_id,
                            a_name: data.a_name,
                            a_ph: data.a_ph,
                            a_picture: 'data:image/;base64,' + data.a_picture,
                            late_comment: data.late_comment,
                            schedule_id: data.schedule_id,
                            c_name:data.c_name
                        }
                    }
                    nowSchedule = data.schedule_id
                    c_latitude = data.c_latitude,
                        c_longitude = data.c_longitude
                })
                setIsLoading(false)
                centerName = list[0].c_name
                setAgentList(list)
                console.log(agentList)
            }).catch((err) => {
                setIsLoading(false)
                showErrorMessage(err.response.data.message, setLogin, props);
                console.log("현장요원 에러")
                console.log(err)
                console.log(err.response.data.message)
            })
    }

    {
        console.log()
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 0.7,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1
            }}>

                <CustomNavigation props={props} type="CenterTitleNavbar" title="내 예약 확인하러 가기"/>
            </View>

            <View style={{flex: 9, zIndex: 0}}>
                {isLoading ?
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <ActivityIndicator color="gray"/>
                    </View>
                    : <ScrollView  refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                                   contentContainerStyle={{height: "auto"}}>
                        {/*<View style={styles.comment}>*/}
                        {/*    <Text style={styles.text}>{agentList.late_comment}</Text>*/}
                        {/*</View>*/}
                        <View style={styles.map}>
                            <CustomMap c_latitude={c_latitude} c_longitude={c_longitude} c_name={centerName}/>
                        </View>
                        <View style={styles.info}>
                            <ScrollView horizontal pagingEnabled>

                                {agentList.map((data, index) => {
                                    return <View key={index}>
                                        <View style={{...styles.agent, paddingVertical: 3}}>
                                            <Image
                                                style={styles.image}
                                                source={{uri: data.a_picture}}/>
                                            <View style={styles.textContainer}>
                                                <Text style={styles.text}>현장요원 이름 : {data.a_name}</Text>
                                                <Text style={styles.text}>전화번호 : {data.a_ph}</Text>
                                            </View>
                                        </View>
                                        <ScrollView pagingEnabled>
                                            <View style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                paddingVertical: 3,
                                                width: screen.width
                                            }}>
                                                <Text style={{
                                                    ...styles.text,
                                                    fontWeight: "700"
                                                }}>{data.late_comment}</Text>
                                            </View>
                                        </ScrollView>

                                    </View>
                                })}

                            </ScrollView>
                            <View style={{alignItems: 'center', marginTop: 7}}>
                                <CustomButton keyValue={nowSchedule} width={150} height={40}
                                              backgroundColor={Style.color2}
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
                                                       schedule_id={selectedSchedule}
                                                       agentList={agentList}/>


                                </View>
                            </Modal>
                        </View>

                        <View style={styles.history}>
                            <View style={{paddingVertical: 8}}>
                                <Text style={{fontSize: 25}}>내 과거 신청 이력</Text>
                            </View>

                            {
                                historyList.map((data, a) => {
                                    if (a < 3) {
                                        return <Text key={a} style={styles.text}>{data.visit_date}</Text>
                                    }
                                })}
                            <View style={styles.button}>
                                {historyList.length===0?<Text style={{color:"gray"}}>과거이력 없음</Text>: <CustomImageModal name={"plus-square-o"} size={24} color={"black"}
                                                                                                modalContent={<ApplyRecord content={historyList}/>}/>}

                            </View>


                        </View>
                    </ScrollView>}
            </View>
        </SafeAreaView>
    );
}

export default CheckReservationTemplate;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        }
        ,
        map: {
            height: 300
        }
        ,
        comment: {
            height: 40,
            justifyContent: "center",
            alignItems: "center",
        }
        ,
        info: {
            height: 218,
            justifyContent: "center"
        }
        ,
        agent: {
            alignItems: "center",
            flexDirection: "row",
            width: screen.width
        }
        ,
        history: {
            alignItems:
                "center",
            paddingVertical: 20
        }
        ,
        button: {
            marginTop: 5
        }
        ,
        text: {
            fontSize: 20,
            paddingVertical: 3,
        }
        ,
        image: {
            width: 130,
            height: 130,
        }
        ,
        textContainer: {
            paddingHorizontal: 25,
        }
        ,
        modalContainer: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 10,
        }
        ,

    }
)