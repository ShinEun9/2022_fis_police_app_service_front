import React from 'react';
import {ScrollView, Text, useWindowDimensions, View} from 'react-native'
import List from "../molecule/List";
import {Style} from "../../Style";

function ListContainer({type = "normalListContainer", onPress, info}) {
    let element;

    if (type === "normalList") {
        element = <View style={{
            backgroundColor: `${Style.color3}`,
            height: "80%",
            width: "auto",
            padding: 10,
            alignItems: "center"
        }}>
            <ScrollView>
                {info.map((item) => <List onPress={onPress} info={item}/>)}
            </ScrollView>
        </View>
    }
    else{
        element = <View style={{
            backgroundColor: `${Style.color3}`,
            height: "80%",
            width: "auto",
            padding: 10,
            alignItems: "center"
        }}>
            <ScrollView>
                {info.map((item) => <List onPress={onPress} info={item}/>)}
            </ScrollView>
        </View>
    }

    return (
        element
    );
}

export default ListContainer;