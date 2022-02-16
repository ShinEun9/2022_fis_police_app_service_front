import * as React from 'react';
import MapView from 'react-native-maps';
import {Marker} from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;

var LATITUDE_DELTA = 0.03;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;




const customRegion ={
    latitude: 33.8220918,
    longitude: -117.9199742,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}
const location ={
    latitude: 33.8220918,
    longitude: -117.9199742,
}

export default function CustomMap() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={customRegion}>
                <Marker coordinate={location}/>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    map: {
        flex:0.3,

        width: (screen.width),
        height: (screen.height)/3,
    },
});