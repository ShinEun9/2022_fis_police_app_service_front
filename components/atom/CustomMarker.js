import React, {useEffect,useState} from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, {Marker} from "react-native-maps";
import {View} from "react-native";
import CustomMap from "../molecule/CustomMap";

// function CustomMarker({c_latitude,c_longitude}) {
//
//     const [agentLoc, setAgentLoc] = useState([{
//         key:-1,
//         coords:{
//             latitude:0,
//             longitude:0
//         }
//     }])
//
//     const getToken = async () => {
//         const t = await AsyncStorage.getItem("@token");
//         return t;
//     }
//
//     useEffect(() => {
//         setInterval(function (){
//             getToken().then((token) => {
//                 getAgentLocation(token)
//             })
//         },3000)
//     }, [])
//
//     const getAgentLocation = async (token) => {
//         await axios.get(`http://54.175.8.114:8080/app/schedule/location`, {headers: {Authorization: `Bearer ${token}`}})
//             .then((res) => {
//                 console.log("현장요원 위치")
//                 console.log(res.data)
//                 const buf = []
//                 res.data.map((data, index) => {
//                     buf[index] = {
//                         key: data.agent_id,
//                         coords: {
//                             latitude: parseFloat(data.a_cur_lat),
//                             longitude: parseFloat(data.a_cur_long)
//                         }
//                     }
//                 })
//                 setAgentLoc(buf)
//                 console.log("set")
//             }).catch((err) => {
//                 console.log(err)
//             })
//     }
//     console.log(agentLoc)
//     return (
//         <View>
//             {agentLoc.map((data, index) => {
//                 return <Marker key={data.key} coordinate={data.coords} />
//             })}
//             {console.log("확인")}
//         </View>
//     );
// }
//
// export default CustomMarker;