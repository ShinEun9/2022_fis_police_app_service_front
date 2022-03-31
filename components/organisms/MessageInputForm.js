import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    useWindowDimensions,
    Alert,
    TouchableOpacity,
    Keyboard, ActivityIndicator
} from 'react-native'
import {Style} from "../../Style";
import Checkbox from 'expo-checkbox';
import CustomButton from "../atom/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {showErrorMessage} from "../showErrorMessage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";

function MessageInputForm({setModalVisible, selectedScheduleId, props}) {
    const [isChecked, setChecked] = useState({lateCenter: false, trafficJam: false, etc: false});
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useRecoilState(loginState);

    const [refreshToken, getReFreshToken] = useState(async () => {
        let t = AsyncStorage.getItem("@refresh_token");
        return t;
    })

    const handleChange = (key, value) => {
        setInputValue("");
        setChecked({
            lateCenter: false,
            trafficJam: false,
            etc: false,
            [key]: value
        })
    }

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token")
        return t
    }

    const sendMessageRequest = async (token, message) => {
        await axios.post(`http://3.35.135.214:8080/app/schedule/late`,
            {schedule_id: selectedScheduleId, late_comment: message},
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setLoading(false)

                Alert.alert("메세지 전송에 성공하였습니다", "", [{
                    text: "확인", onPress: () => {
                        setModalVisible(false)
                    }
                }])

            })
            .catch(async (err) => {
                setLoading(false)

                // token을 null로 보내도 성공해서 확인할 수 있는 방법이 없음
                if (err.response.data.message !== "ExpiredToken") {
                    showErrorMessage(err.response.data.message, setLogin, props);
                } else {
                    await axios.get(`http://3.35.135.214:8080/app/refreshToken`, {headers: {RefreshToken: `Bearer ${refreshToken}`}})
                        .then(async (res) => {
                            await AsyncStorage.setItem("@token", res.data.accessToken, () => {
                                AsyncStorage.setItem("@refresh_token", res.data.refreshToken, () => {
                                    getToken.then((token) => {
                                        sendMessageRequest(token, message)
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
                                        setLogin(null);
                                    }
                                }, {
                                    text: "취소"
                                }
                            ])
                        })
                }
            })
    }


    // 제출 버튼을 누르면 동작하는 함수
    const onPress = () => {
        const {lateCenter, trafficJam, etc} = isChecked
        let message;
        if (lateCenter === false && trafficJam === false && etc === false) {
            console.log("hi")
            Alert.alert("메세지를 입력해주세요", "", [{
                text: "확인"
            }])
            return;
        } else if (lateCenter === true) {
            message = "이전 시설의 지문등록이 늦어지고 있어요!"
        } else if (trafficJam === true) {
            message = "교통체증으로 인해 늦어지고 있어요!"
        } else if (etc === true) {
            message = inputValue;
        }

        setLoading(true)

        // 토큰받아서 api 요청하는 동작
        getToken().then((token) => {
            sendMessageRequest(token, message)
        })
    }


    return (
        <View style={{alignItems: "center", width: useWindowDimensions().width * 0.8}}>
            <View style={{marginBottom: 40}}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    handleChange("lateCenter", true)
                }} style={styles.container}>
                    <Text style={styles.text}>이전 시설의 지문 등록이 늦어지고 있어요!</Text>
                    <Checkbox style={styles.checkbox} value={isChecked.lateCenter} onValueChange={(value) => {
                        Keyboard.dismiss();
                        handleChange("lateCenter", value)
                    }}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    Keyboard.dismiss();
                    handleChange("trafficJam", true)
                }} style={styles.container}>
                    <Text style={styles.text}>교통 체증으로 인해 늦어지고 있어요!</Text>
                    <Checkbox style={styles.checkbox} value={isChecked.trafficJam} onValueChange={(value) => {
                        handleChange("trafficJam", value)
                    }}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    handleChange("etc", true)
                }} style={styles.container}>
                    <TextInput style={styles.text} placeholder="직접 입력" value={inputValue}
                               onChangeText={(value) => {
                                   setChecked({
                                       lateCenter: false,
                                       trafficJam: false,
                                       etc: true
                                   })
                                   setInputValue(value);
                               }} onFocus={() => {
                        setChecked({
                            lateCenter: false,
                            trafficJam: false,
                            etc: true
                        })
                    }}/>
                    <Checkbox style={styles.checkbox} value={isChecked.etc} onValueChange={(value) => {
                        handleChange("etc", value)
                    }}/>
                </TouchableOpacity>


            </View>
            <CustomButton width="100" height="50" onPress={onPress}
                          content={loading ? <ActivityIndicator color="gray"/> : "전송"} backgroundColor={Style.color2}/>
        </View>
    );
}


export default MessageInputForm;
const styles = StyleSheet.create({
        container: {
            backgroundColor: Style.color5,
            width: "100%",
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginBottom: 10
        },
        text: {
            flex: 1,
            fontSize: 16,
            textAlign: "center"
        }
    }
);
