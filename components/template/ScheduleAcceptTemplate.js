import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Alert,
    ActivityIndicator, Platform, RefreshControl
} from "react-native";
import ListContainer from "../organisms/ListContainer";
import {Style} from "../../Style";
import CustomNavigation from "../organisms/CustomNavigation";
import {week} from "../../store/dummy-data/week";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import {showErrorMessage} from "../showErrorMessage";

function ScheduleAcceptTemplate(props) {
    // dummy-data에 있는 schedule을 todaySchedule에 set해줌
    const [incompleteSchedule, setIncompleteSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [login, setLogin] = useRecoilState(loginState);
    const [refreshing, setRefreshing] = React.useState(false);

    // 새로고침. 데이터를 불러오는 함수
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getToken().then((token) => {
            getIncompleteSchedule(token).then(() => {
                setRefreshing(false)
            })
        })
    }, []);


    // 날짜 별로 그룹핑 하는 함수 groupByDate
    const groupByDate = incompleteSchedule.sort(function (a, b) {
        return new Date(a.visit_date) - new Date(b.visit_date)
    }).reduce((group, schedule) => {
        const {visit_date} = schedule;
        group[visit_date] = group[visit_date] ?? [];
        group[visit_date].push(schedule);
        return group;
    }, {});

    // 날짜 별로 그룹핑한 것을 schedules라는 변수에 넣음
    // schedules변수 구조 예시 {2021-02-11: [{schedule1}][{schedule2}], 2022-02-12: Array(1), 2022-02-13: Array(1)
    let schedules = groupByDate;

    const getToken = async () => {
        console.log("token 받기")
        const t = await AsyncStorage.getItem("@token")
        return t
    }

    // 수락하기 전의 일정을 받아오는 함수
    const getIncompleteSchedule = async (token) => {
        await axios.get(`http://3.35.135.214:8080/app/schedule/incomplete`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setIsLoading(false)
                setIncompleteSchedule(res.data)
            })
            .catch((err) => {
                setIsLoading(false)
                showErrorMessage(err.response.data.message, setLogin, props, getIncompleteSchedule)
            })
    }

    useEffect(() => {
        getToken().then((res) => {
            getIncompleteSchedule(res);
        })
    }, [])

    // 수락, 거절 api요청하는 함수
    const acceptRequest = async (token, schedule_id, accept) => {
        await axios.post(`http://3.35.135.214:8080/app/schedule/accept`,
            {schedule_id, accept},
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                if (accept === "accept") {
                    Alert.alert("수락되었습니다", "수락한 일정을 확인해보세요", [{
                        text: "확인", onPress: () => {
                            setIsLoading(true)
                            getToken().then((res) => {
                                getIncompleteSchedule(res);
                            })
                        }
                    }])
                } else {
                    Alert.alert("거절되었습니다", "", [{
                        text: "확인", onPress: () => {
                            setIsLoading(true)
                            getToken().then((res) => {
                                getIncompleteSchedule(res);
                            })
                        }
                    }])
                }
            })
            .catch(async (err) => {
                console.log(err.response)
                console.log(err.response.data.message)

                if(err.response.data.message!=="ExpiredToken"){
                    showErrorMessage(err.response.data.message, setLogin, props);
                }
                else{
                    await axios.get(`http://3.35.135.214:8080/app/refreshToken`, {headers: {RefreshToken: `Bearer ${refreshToken}`}})
                        .then(async (res) => {
                            await AsyncStorage.setItem("@token", res.data.accessToken,  () => {
                                AsyncStorage.setItem("@refresh_token", res.data.refreshToken,  () => {
                                    getToken.then((token)=>{
                                        acceptRequest(token, schedule_id,accept)
                                    })
                                })
                            })
                        }).catch(() => {
                            Alert.alert("로그인 시간이 만료되었습니다.", "다시 로그인해주세요", [
                                {
                                    text: "확인",
                                    onPress: async () => {
                                        await AsyncStorage.removeItem("@u_auth")
                                        await AsyncStorage.removeItem("@token")
                                        await AsyncStorage.removeItem("@refresh_token")
                                        props.navigation.popToTop();
                                        setLogin(null);

                                    }
                                }
                            ])
                        })
                }

            })
    }

    // 수락 또는 거절 버튼을 눌렀을 때 동작하는 함수
    const onPress = (keyValue) => {
        let schedule_id = []
        console.log(Object.entries(schedules)[keyValue[1]][1])
        Object.entries(schedules)[keyValue[1]][1].map((schedule) => {
            schedule_id.push(schedule.schedule_id)
        })

        console.log(schedule_id);
        if (keyValue[0] === "accept") {
            // console.log(schedule_id)
            Alert.alert(
                "수락하시겠습니까?", "",
                [
                    {
                        text: "취소",
                        style: "cancel"
                    },
                    {
                        text: "확인", onPress: () => {
                            getToken().then((token) => {
                                acceptRequest(token, schedule_id, "accept")
                            })
                        }
                    }
                ]
            );
        } else {
            Alert.alert(
                "거절 하시겠습니까?",
                "",
                [
                    {
                        text: "취소",
                        style: "cancel"
                    },
                    {
                        text: "확인", onPress: () => {
                            console.log(schedule_id)
                            getToken().then((token) => {
                                acceptRequest(token, schedule_id, "reject")
                            })
                        }
                    }
                ]
            );
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>

            <View style={{paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 1, zIndex: 1}}>
                <CustomNavigation props={props} type="AgentTitleNavbar" title="내 일정 수락하러 가기"/>
            </View>
            <View style={{flex: 9, alignItems: "center", zIndex: 0}}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                    {isLoading ? <ActivityIndicator color="gray"/> :
                        Object.keys(schedules).length === 0 ?
                            <Text style={{fontSize: 20, color: "gray"}}>수락할 스케쥴이 없습니다</Text> :
                            Object.entries(schedules).map((item, index) => {
                                return <View key={index} style={{alignItems: "flex-start"}}>
                                    <View style={{
                                        backgroundColor: Style.color2,
                                        borderTopRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        padding: 10
                                    }}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: 16
                                        }}>{item[0]} {week[new Date(item[0]).getDay()]}요일</Text>
                                    </View>
                                    <ListContainer onPress={onPress} info={item[1]} type="buttonListContainer"
                                                   keyValue={index}/>
                                </View>
                            })

                    }
                    {/*schedules를 객체에서 배열로 만들어야 함.(map 함수 쓰기 위해서)*/}
                    {/*Object.entries(schedules)하면은 구조가 [array(2), array(2), array(2)]*/}
                    {/*array(2) 첫번째 원소는 날짜, 두번째 원소는 그 날짜의 스케쥴 배열들*/}


                </ScrollView>
            </View>
        </SafeAreaView>);
}

export default ScheduleAcceptTemplate;
