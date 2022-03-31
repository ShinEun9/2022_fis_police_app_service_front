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

function CheckReservationTemplate(props) { //시설 담당자가 자신의 예약 내용을 확인하는 템플릿
    const [selectedSchedule, setSelectedSchedule] = useState()
    const [modalVisible, setModalVisible] = useState(false); // 모달을 띄울지 말지 true,false 로 구분
    const [historyList, setHistoryList] = useState([]) // 과거 지문등록 이력 저장
    const [agentList, setAgentList] = useState([]) // 배치된 현장요원 목록 저장
    const [today, setToday] = useState(() => { // 오늘 날짜 초기화
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month / 10 < 1) {
            month = '0' + month
        }
        if (day / 10 < 1) {
            day = '0' + day
        }
        return `${year}-${month}-${day}`
    })

    const [isLoading, setIsLoading] = useState(true) // loading 구현을 위해
    const [login, setLogin] = useRecoilState(loginState);
    const [refreshing, setRefreshing] = React.useState(false);

    // 새로고침했을 때 데이터 불러오는 함수
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getToken().then((token) => {
            getHistoryList(token)
            getAgentList(token).then(() => {
                setRefreshing(false);
            })
        })
    }, []);

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }

    // 첫 렌더 시 실행되는 함수
    useEffect(() => {
        getToken().then((token) => {
            getHistoryList(token)
            getAgentList(token)
        })
    }, [])

    const getHistoryList = async (token) => { // 시설의 과거 지문 등록 이력을 받아오는 코드
        await axios.get(`http://3.35.135.214:8080/app/confirm/center`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
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
                const sortBuf = buf.sort((a, b) => new Date(a.visit_date) - new Date(b.visit_date)) // 날짜 순으로 정렬
                setHistoryList(sortBuf)
            }).catch((err) => {
                console.log(err);
                console.log(err.response.data.message);
                showErrorMessage(err.response.data.message, setLogin, props, getHistoryList);
            })
    }

    // 예정 일정을 가져오는 코드
    const getAgentList = async (token) => {
        await axios.get(`http://3.35.135.214:8080/app/schedule/confirm`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                let list = []
                if(res.data.length!==0){
                    res.data.map((data, index) => {
                        if (data.a_picture === null) {
                            list[index] = {
                                key: data.agent_id,
                                a_name: data.a_name,
                                a_ph: data.a_ph,
                                a_picture: 'https://ifh.cc/g/pvXWYR.png',
                                late_comment: data.late_comment,
                                schedule_id: data.schedule_id,
                                c_name: data.c_name,
                                visit_date: data.visit_date,
                                visit_time: data.visit_time
                            }
                        } else {
                            list[index] = {
                                key: data.agent_id,
                                a_name: data.a_name,
                                a_ph: data.a_ph,
                                a_picture: 'data:image/;base64,' + data.a_picture, // base64로 인코딩된 사진을 디코딩하여 띄움
                                late_comment: data.late_comment,
                                schedule_id: data.schedule_id,
                                c_name: data.c_name,
                                visit_date: data.visit_date,
                                visit_time: data.visit_time
                            }
                        }
                        nowSchedule = data.schedule_id
                        c_latitude = data.c_latitude
                        c_longitude = data.c_longitude
                    })
                    centerName = list[0].c_name
                }
                setIsLoading(false)
                setAgentList(list)
            }).catch((err) => {
                console.log(err)
                setIsLoading(false)
                showErrorMessage(err.response.data.message, setLogin, props, getAgentList);
            })
    }

    // 확인서 열람 버튼을 누르면 동작하는 함수
    const onPress = (keyValue) => {
        setSelectedSchedule(keyValue)
        setModalVisible(true)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 0.7,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1
            }}>
                <CustomNavigation props={props} type="CenterTitleNavbar" title="내 예약 확인하러 가기" />
            </View>

            <View style={{flex: 9, zIndex: 0,}}>
                {isLoading ?
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <ActivityIndicator color="gray"/>
                    </View>
                    : <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />} contentContainerStyle={{
                        alignItems: "center",
                        paddingVertical: Dimensions.get('window').height * 0.02
                    }}>
                        <View style={{marginBottom: Dimensions.get('window').height * 0.05}}>
                            <Text style={{fontSize: 24,}}>오늘 일정</Text>
                            {agentList.length === 0 || agentList[0].visit_date != today ?
                                <View style={styles.box}>
                                    <Text style={{fontSize: 20, color: "gray"}}>오늘 일정이 없습니다.</Text>
                                </View> :
                                <View style={{width: Dimensions.get('window').width * 0.9, alignItems: "center"}}>
                                    <CustomMap c_latitude={c_latitude} c_longitude={c_longitude}
                                               c_name={centerName} props={props} />
                                    <View style={styles.info}>
                                        {
                                            <ScrollView horizontal pagingEnabled>
                                                {agentList.map((data, index) => {
                                                        if (today === data.visit_date) {
                                                            return <View key={index} style={{alignItems: "center",}}>
                                                                <View style={{...styles.agent,}}>
                                                                    <Image
                                                                        style={styles.image}
                                                                        source={{uri: data.a_picture}}/>
                                                                    <View style={styles.textContainer}>
                                                                        <Text style={styles.text}>현장요원 이름
                                                                            : {data.a_name}</Text>
                                                                        <Text style={styles.text}>전화번호 : {data.a_ph}</Text>
                                                                    </View>
                                                                </View>
                                                                <Text style={{
                                                                    ...styles.text,
                                                                    fontWeight: "700"
                                                                }}>{data.late_comment}</Text>
                                                            </View>
                                                        }
                                                    }
                                                )}
                                            </ScrollView>

                                        }
                                    </View>
                                    <CustomButton keyValue={nowSchedule} width={150} height={40}
                                                  backgroundColor={Style.color2}
                                                  onPress={onPress} content={"확인서 열람"}/>

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
                            }


                        </View>

                        <View style={{marginBottom: Dimensions.get('window').height * 0.05}}>
                            {/* 두 명의 현장요원이 같은 날 다른 시간에 올 일은? */}
                            {/* 같은 날 와도 문제임 */}
                            <Text style={{fontSize: 24}}>예정 일정</Text>
                            <View style={styles.box}>
                                {
                                    agentList.length != 0 ?
                                        agentList.map((data, index) => {
                                                return <View key={index} style={{flexDirection: "row",}}>
                                                    <Text style={{...styles.text, marginRight: 10}}>{data.visit_date}</Text>
                                                    <Text style={{...styles.text,}}>{data.visit_time}</Text>
                                                </View>
                                            }
                                        ) : <Text style={{fontSize: 20, color: "gray"}}>예정 일정 없음</Text>
                                }
                            </View>
                        </View>


                        <View>
                            <Text style={{fontSize: 24, marginVertical: 10}}>과거 일정</Text>
                            <View style={styles.box}>

                                {
                                    historyList.map((data, a) => {
                                        if (a < 3) {
                                            return <Text key={a} style={styles.text}>{data.visit_date}</Text>
                                        }
                                    })}
                                <View style={styles.button}>
                                    {historyList.length === 0 ?
                                        <Text style={{color: "gray", fontSize: 20}}>과거이력 없음</Text> :
                                        <CustomImageModal name={"plus-square-o"} size={24} color={"gray"}
                                                          modalContent={<ApplyRecord content={historyList}/>}/>}

                                </View>
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
        },
        map: {
            height: 300
        }
        ,
        info: {
            width: Dimensions.get('window').width * 0.9,
            height: 170,
            justifyContent: "center",
            marginVertical: 15
        }
        ,
        agent: {
            width: Dimensions.get('window').width * 0.9,
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 13
        }
        ,
        box: {
            width: Dimensions.get('window').width * 0.9,
            height: "auto",
            minHeight: Dimensions.get('window').height * 0.2,
            backgroundColor: Style.color3,
            alignItems: "center",
            justifyContent: "center"
        },
        history: {
            alignItems: "center",
            paddingVertical: 20
        }
        ,
        button: {
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center"

        }
        ,
        text: {
            fontSize: Dimensions.get('window').width>400?20:16,
            paddingVertical: 3,
        }
        ,
        image: {
            width: 130,
            height: 130,
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
