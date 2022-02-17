import React, {Component} from 'react';
import {SafeAreaView, View, Text, Button} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

function MainScreen(props) {
    console.log(props);
    const goMainScreen = () => {
        props.navigation.navigate('DETAIL');
    }

    return (
        <SafeAreaView>
            <Text style={{fontSize: 30}}>Main Screen</Text>
            <Button onPress={() => goMainScreen()} title='Go Detail Screen'/>
        </SafeAreaView>);
}

export default MainScreen;

