import {Alert} from "react-native";
import {useRecoilState} from "recoil";
import {loginState} from "../store/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StackActions} from "react-navigation";
import axios from "axios";

export async function showErrorMessage(message, setLogin, props, doFunction = () => {
    console.log("안됨")
}, page = "notMain") {

    const onPress = async () => {
        await AsyncStorage.removeItem("@u_auth")
        await AsyncStorage.removeItem("@token")
        await AsyncStorage.removeItem("@refresh_token")
        setLogin(null);
        if (page != "main") {
            props.navigation.popToTop();
        }
    }

    const getRefreshToken = async () => {
        let t = await AsyncStorage.getItem("@refresh_token");
        return t;
    }

    const apiRequest = async (rT) => {
        await axios.get(`http://3.35.135.214:8080/app/refreshToken`, {headers: {RefreshToken: `Bearer ${rT}`}})
            .then(async (res) => {
                let a = res.data.accessToken;
                let b = res.data.refreshToken;
                AsyncStorage.setItem("@token", a, () => {
                    console.log("setToken")
                    AsyncStorage.setItem("@refresh_token", b, () => {
                        console.log("setRefreshToken")
                        doFunction(a)
                    })
                })
            }).catch((err) => {
                Alert.alert("로그인 시간이 만료되었습니다.", "다시 로그인해주세요", [
                    {
                        text: "확인",
                        onPress: () => {
                            onPress()
                        }
                    }, {
                        text: "취소"
                    }
                ])
            })
    }
    const expiredTokenRequest = async () => {
        await getRefreshToken().then((token) => {
            apiRequest(token)
        })
    }
    if (message === "ExpiredToken") {
        expiredTokenRequest();
    } else if (message === "NoToken") {
        Alert.alert("로그인 시간이 만료되었습니다.", "다시 로그인해주세요", [
            {
                text: "확인",
                // onPress: ()=>{onPress()}
            }
        ])
    } else if (message === "ServerError") {
        Alert.alert("서버 오류 입니다.", "잠시 후 재시도 해주세요", [
            {
                text: "확인",
                // onPress: ()=>{onPress()}
            }
        ])
    } else if (message === "NoAgent") {
        Alert.alert("존재하지 않는 이용자입니다.", "다시 로그인 해주세요", [{
            text: "확인",
            // onPress:()=>{onPress()}
        }])

    } else if (message === "NoOfficial") {
        Alert.alert("존재하지 않는 이용자입니다.", "다시 로그인 해주세요", [{
            text: "확인",
            // onPress:()=>{onPress()}
        }])

    } else if (message === "NoVisited") {


    } else if (message === "NoSchedule") {

    } else if (message === "NoConfirm") {

    } else if (message === "AlreadyCompleted") {

    } else if (message === "ID Fail") {
        Alert.alert("아이디 또는 비밀번호가 틀렸습니다.", "다시 로그인 해주세요", [{
            text: "확인"
        }])
    } else if (message === "Password Fail") {
        Alert.alert("아이디 또는 비밀번호가 틀렸습니다.", "다시 로그인 해주세요", [{
            text: "확인"
        }])
    }

}