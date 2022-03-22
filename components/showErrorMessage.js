import {Alert} from "react-native";
import {useRecoilState} from "recoil";
import {loginState} from "../store/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StackActions} from "react-navigation";
import axios from "axios";

export async function showErrorMessage(message, setLogin, props, page = "notMain") {

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
            .then((res) => {
                console.log("만료됐으니깐 다시 토큰 불러옴 성공")
                AsyncStorage.setItem("@token", res.data.accessToken);
                AsyncStorage.setItem("@refresh_token", res.data.refreshToken);
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
    const expiredTokenRequest = () => {
        getRefreshToken().then((token) => {
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

    }


}