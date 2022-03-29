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


export default function CustomMap({c_latitude, c_longitude, c_name, props}) {
    const [login, setLogin] = useRecoilState(loginState);

    const location = {
        latitude: c_latitude,
        longitude: c_longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }
    const [agentLoc, setAgentLoc] = useState([{
        key: -1,
        coords: {
            latitude: 0,
            longitude: 0
        }
    }])
    const [isLoading, setIsLoading] = useState(true)


    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }

    useEffect(()=>{
        let timer = setInterval(async ()=>{
            await getToken().then((token)=>{
                getAgentLocation(token);
            })
        },3000);
        props.navigation.addListener('beforeRemove',()=>{
            clearInterval(timer);
        });
    },[]);

    const getAgentLocation = async (token) => {
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
            // loadingEnabled
                 provider={PROVIDER_GOOGLE}>
            <Marker coordinate={location} title={c_name}/>
            {agentLoc.map((data, index) => {
                return <Marker key={data.key} coordinate={data.coords} image={{uri: `https://ifh.cc/g/OyMDXA.png`}}/>
            })}
        </MapView>


    );
}


const styles = StyleSheet.create({
    map: {
        // marginBottom: 300,
        width: (screen.width) * 0.9,
        height: 300
    },
});