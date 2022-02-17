import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, useWindowDimensions, Button} from "react-native";
import { AntDesign } from '@expo/vector-icons';

function DetailScreen(props) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        console.log(isOpen);
    },[isOpen])

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    }
    const goMainScreen = () => {
        props.navigation.navigate('AGENT');
    }

    return (
        <SafeAreaView>
            <View style={{
                display: "flex",
                flexDirection: "row",
                width: useWindowDimensions().width,
                alignItems: "center",
                justifyContent: 'space-between',
                padding: 10
            }}>
                <Text>hi</Text>
                <TouchableOpacity onPress={handleOpen}>
                    {isOpen ? <AntDesign name="caretdown" size={20} color="black" /> :  <AntDesign name="caretup" size={20} color="black" />}
                </TouchableOpacity>
            </View>
            <View style={{display: `${isOpen ? "block" : "none"}`,}}>
                <Text style={{fontSize: 30}}>Detail Screen</Text>
                <Button onPress={() => goMainScreen()} title='Go Detail Screen'/>
            </View>
            <View>
                <Text>hihi</Text>
            </View>

            <Text>detail</Text>
        </SafeAreaView>);

}

export default DetailScreen;