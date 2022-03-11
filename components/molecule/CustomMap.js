import * as React from 'react';
import MapView from 'react-native-maps';
import {Marker} from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import {useEffect, useState} from "react";
import async from "async";


const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;

let LATITUDE_DELTA = 0.004;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;





const customRegion ={
    latitude: 37.785834,
    longitude:   -122.406417,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}
const customLocation ={
    latitude: 33.8220918,
    longitude: -117.9199742,
}
let newLocation={}
export default function CustomMap() {
    const [location, setLocation] = useState({
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0
    });
    const [ok,setOk]=useState(true);
    const ask = async ()=>{
        const {granted} = await Location.requestForegroundPermissionsAsync();
        if(!granted){
            setOk(false);
        }
        const {coords:{latitude,longitude}}= await Location.getCurrentPositionAsync({distanceInterval:2})
        newLocation={
            latitude:latitude,
            longitude:longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }
        setLocation(newLocation)
    }
    // const getPosition=async()=>{
    //     const {coords:{latitude,longitude}}= await Location.getCurrentPositionAsync({distanceInterval:2})
    //     newLocation={
    //         latitude:latitude,
    //         longitude:longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA,
    //     }
    //     setLocation(newLocation)
    // }
    useEffect(() => {
        ask();
    }, []);
    // useEffect(()=>{
    //     getPosition();
    // },[])
    console.log(location)
    return (

        <MapView style={styles.map} region={location}>
            <Marker coordinate={location}/>
        </MapView>

    );
}


const styles = StyleSheet.create({
    map: {
        marginBottom:300,
        width: (screen.width),
        height: (screen.height)/3,
    },
});