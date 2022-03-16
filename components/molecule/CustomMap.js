import * as React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from "react-native-maps";
import {StyleSheet, Text, View, Dimensions, ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';
import {useEffect, useState} from "react";
import async from "async";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";



const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;

let LATITUDE_DELTA = 0.004;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default function CustomMap({c_latitude, c_longitude}) {
    // const [location, setLocation] = useState({
    //     latitude:0,
    //     longitude:0,
    //     latitudeDelta:0,
    //     longitudeDelta:0
    // });
    // const [ok,setOk]=useState(true);
    // const ask = async ()=>{
    //     const {granted} = await Location.requestForegroundPermissionsAsync();
    //     if(!granted){
    //         setOk(false);
    //     }
    //     const {coords:{latitude,longitude}}= await Location.getCurrentPositionAsync({distanceInterval:2})
    //     newLocation={
    //         latitude:latitude,
    //         longitude:longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA,
    //     }
    //     setLocation(newLocation)
    // }
    const location = {
        latitude:c_latitude,
        longitude: c_longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }
    const [agentLoc, setAgentLoc] = useState([])

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }

    useEffect(() => {
        setInterval(function (){
            getToken().then((token) => {
                getAgentLocation(token)
            })
        },60000)
    }, [])


    const getAgentLocation = async (token) => {
        await axios.get(`http://localhost:8080/app/schedule/location`, {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                console.log("현장요원 위치")
                console.log(res.data)
                const buf = []
                res.data.map((data, index) => {
                    buf[index] = {
                        key: data.agent_id,
                        coords: {
                            latitude: parseInt(data.a_cur_lat),
                            longitude: parseInt(data.a_cur_long)
                        }
                    }
                })
                setAgentLoc(buf)
                console.log("set")
            }).catch((err) => {
                console.log("getError")
                console.log(err)
            })
    }
    return (
        // isLoading ? <View
        //     style={{flex: 9, justifyContent: "center", alignItems: "center"}}><ActivityIndicator/></View> : <MapView style={styles.map} region={location} loadingEnabled>
        //     <Marker coordinate={location}/>
        // </MapView>
        <MapView style={styles.map} region={location} loadingEnabled provider={PROVIDER_GOOGLE}>
            <Marker coordinate={location}/>
            {agentLoc.map((data, index) => {
                console.log("움직인다")
                return <Marker cordinate={data.coords}/>
            })}
            {/*{example.map((data)=>{*/}
            {/*    return <Marker key={data.key} coordinate={data.coords}/>*/}
            {/*})}*/}

        </MapView>


    );
}


const styles = StyleSheet.create({
    map: {
        marginBottom: 300,
        width: (screen.width),
        height: (screen.height) / 3,
    },
});