import React from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {Style} from "../../Style";

function NavBarItem({name, title1,title2}) {
    return (
        <View style={styles.navBarItem}>
            <FontAwesome name={name} size={30}
                         color={title1 === title2 ? Style.color2 : "black"}/>
            <Text style={{
                marginLeft: 20,
                fontSize: Dimensions.get("window").width>360?20:16,
                color: title1 === title2 ? Style.color2 : "black",
                fontWeight: title1 === title2 ? "600" : "normal",
            }}
            >{title2}</Text>
        </View>    );
}

export default NavBarItem;

const styles = StyleSheet.create({
    navBarItem: {
        flexDirection: "row",
        alignItems: "center",
        width: "auto",
    }
})