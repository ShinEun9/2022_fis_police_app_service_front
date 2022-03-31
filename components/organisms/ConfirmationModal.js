import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, ActivityIndicator, Alert} from 'react-native'
import {Style} from "../../Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomButton from "../atom/CustomButton";
import {showErrorMessage} from "../showErrorMessage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";

const screen = Dimensions.get("window");

function ConfirmationModal({setModalVisible, schedule_id, props}) {
    const [login, setLogin] = useRecoilState(loginState)
    const [confirmInfo, setConfirmInfo] = useState(); // 확인서 내용 저장
    const [isLoading, setIsLoading] = useState({
        getData: true,
        sendConfirm: false
    });

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }

    const getData = async (token) => { // 작성된 확인서를 불러오는 코드
        await axios.get(`http://3.35.135.214:8080/app/confirm/${schedule_id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setConfirmInfo(res.data);
                setIsLoading({...isLoading, getData: false})
            }).catch((err) => {
                if (err.response.data.message === "NoConfirm") {
                    setConfirmInfo(null);
                } else {
                    showErrorMessage(err.response.data.message, setLogin, props, getData)
                }
                setIsLoading({...isLoading, getData: false})
            })
    }
    const onPress = () => {
        setIsLoading({...isLoading, sendConfirm: true})
        getToken().then((token) => {
            sendData(token)
        })
    }

    useEffect(() => {
        getToken().then((token) => {
            getData(token)
        })
    }, [])

    const sendData = async (token) => { // 시설 담당자가 확인서에 서명을 하면 한 내용을 서버로 보내는 코드 -> 이후 시설담당자와 현장요원이 열람 가능
        let confirm_id = {confirm_id: confirmInfo.confirm_id}

        await axios.post(`http://3.35.135.214:8080/app/confirm/check/${schedule_id}`, confirm_id, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setIsLoading({...isLoading, sendConfirm: false})
                Alert.alert("완료되었습니다", "", [{
                    text: "확인", onPress: () => {
                        setModalVisible(false)
                    }
                }])
            }).catch((err) => {
                setIsLoading({...isLoading, sendConfirm: false})
                showErrorMessage(err.response.data.message, setLogin, props, sendData);
            })
    }
    return (
        isLoading.getData ? <View style={styles.mainContainer}><ActivityIndicator color="gray"/></View> :
            <View style={{...styles.mainContainer, height: confirmInfo === null ? screen.height * 0.5 : "auto"}}>
                {confirmInfo === null ?
                    <Text>확인서 없음</Text>
                    :
                    <>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginBottom: 15}}>현장 등록 확인서</Text>
                        <View style={styles.container}>
                            <View style={styles.item}>
                                <Text style={styles.title}>시설이름</Text>
                                <Text style={styles.content}>{confirmInfo.center_name}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.title}>시설주소</Text>
                                <Text style={styles.content}>{confirmInfo.center_address}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.title}>연락처</Text>
                                <Text style={styles.content}>{confirmInfo.center_ph}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.title}>방문시간</Text>
                                <Text style={styles.content}>{confirmInfo.visit_date} {confirmInfo.visit_time}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={{...styles.title, flex: 1}}>신규인원</Text>
                                <Text style={{
                                    ...styles.content,
                                    flex: 1
                                }}>{confirmInfo.new_child === null ? 0 : confirmInfo.new_child} 명</Text>
                                <Text style={{...styles.title, flex: 1}}>기존인원</Text>
                                <Text style={{
                                    ...styles.content,
                                    flex: 1
                                }}>{confirmInfo.old_child === null ? 0 : confirmInfo.old_child} 명</Text>

                            </View>

                        </View>
                        <View style={styles.container}>
                            <Text style={{...styles.title, flex: undefined, marginBottom: 5}}>
                                특이사항
                            </Text>

                            <View style={{
                                borderWidth: 2, borderColor: Style.color5, padding: 5, minHeight: 100
                            }}>

                                <Text>
                                    {confirmInfo.etc}
                                </Text>
                            </View>

                        </View>
                        <View
                            style={{
                                ...styles.container,
                                width: "50%",
                                justifyContent: "flex-end",
                                alignSelf: "flex-end"
                            }}>
                            <View style={{...styles.item, flex: undefined, justifyContent: "center"}}>
                                <Text style={{...styles.title, flex: undefined, marginRight: 10}}>현장요원</Text>
                                <Text style={{
                                    ...styles.content,
                                    flex: undefined,
                                    fontSize: 16
                                }}>{confirmInfo.agent_name.join(", ")}</Text>
                            </View>
                            <View style={{...styles.item, flex: undefined, justifyContent: "center"}}>
                                <Text style={{...styles.title, flex: undefined, marginRight: 10}}>시설담당자</Text>
                                <Text
                                    style={{
                                        ...styles.content,
                                        flex: undefined,
                                        fontSize: 16
                                    }}>{confirmInfo.manager_name}</Text>
                            </View>
                        </View>
                        {confirmInfo.complete === "complete" ?
                            <CustomButton onPress={() => setModalVisible(false)} width={150} height={40}
                                          backgroundColor={Style.color2} content={"닫기"}/> :
                            <CustomButton onPress={onPress} width={150} height={40} backgroundColor={Style.color2}
                                          content={isLoading.sendConfirm ? <ActivityIndicator color="gray"/> : "서명"}/>
                        }
                    </>
                }
            </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width * 0.9,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    container: {
        width: "100%",
        marginBottom: 10,
    },
    item: {
        width: "100%",
        height: "auto",
        paddingVertical: 10,
        flexDirection: "row",
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
    },
    content: {
        flex: 2,
    }

})

export default ConfirmationModal;