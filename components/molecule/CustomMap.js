import * as React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from "react-native-maps";
import {StyleSheet, Dimensions} from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {showErrorMessage} from "../showErrorMessage";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";


const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;

let LATITUDE_DELTA = 0.004;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default function CustomMap({c_latitude, c_longitude, c_name, props}) { // 지도를 띄우는 컴포넌트
    const [login, setLogin] = useRecoilState(loginState);

    const location = {
        latitude: c_latitude,
        longitude:c_longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    } // 지도의 센터, 마커를 띄우는 위치 를 표현하기 위해 만든 변수

    const [agentLoc, setAgentLoc] = useState([{
        key: -1, //agent_id가 들어감
        coords: { //agent의 위치가 들어감
            latitude: 0,
            longitude: 0
        }
    }]) // 현장요원 위치를 띄우기 위해 만든 변수

    const [isLoading, setIsLoading] = useState(true) //loading 구현을 위함


    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }

    useEffect(()=>{
        let timer = setInterval(async ()=>{ //setInterval 함수를 이용해 3초에 한번씩 현장요원의 위치를 받아옴
            await getToken().then((token)=>{
                getAgentLocation(token);
            })
        },3000);
        props.navigation.addListener('beforeRemove',()=>{
            clearInterval(timer);
        });
    },[]);

    const getAgentLocation = async (token) => { //현장요원의 위치를 받아오기 위해 서버와 소통하는 부분
        await axios.get(`http://3.35.135.214:8080/app/schedule/location`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                const buf = []
                res.data.map((data, index) => {
                    buf[index] = {
                        key: data.agent_id,
                        coords: {
                            latitude: parseFloat(data.a_cur_lat),
                            longitude: parseFloat(data.a_cur_long)
                        }
                    }
                })
                setAgentLoc(buf)
                setIsLoading(false)
                console.log("set")
            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
                console.log(err.response.data.message)
                showErrorMessage(err.response.data.message, setLogin, props, getAgentLocation)
            })
    }

    return (
        <MapView style={styles.map} initialRegion={location}
                 provider={PROVIDER_GOOGLE}>
            <Marker coordinate={location} title={c_name}/>
            {agentLoc.map((data, index) => { // 현장요원의 위치를 띄움( 두 명 이상일 경우를 대비해 map 함수를 이용 )
                return <Marker key={data.key} coordinate={data.coords} image={{uri: `https://ifh.cc/g/tFpyLB.png`}}/>
            })}
        </MapView>


    );
}


const styles = StyleSheet.create({
    map: {
        width: (screen.width) * 0.9,
        height: 300
    },
});