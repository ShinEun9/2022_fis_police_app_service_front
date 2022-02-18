
// import React from "react";
// import {StatusBar} from 'expo-status-bar';
// import {StyleSheet, Text, View} from 'react-native';
// import CustomInput from "./components/atom/CustomInput";
// import CustomButton from "./components/atom/CustomButton";
// import Select from "./components/atom/Select";
// import DatePicker from "./components/atom/DatePicker";
// import Timepicker from "./components/atom/Timepicker";
// import NavigationBar from "./components/NavigationBar";
// import CustomInput3 from "./components/atom/CustomInput3";
// import CustomLeftImageButton from "./components/atom/CustomLeftImageButton";
//
//
// export default function App() {
//     return (
//         <View style={styles.container}>
//             {/*<NavigationBar />*/}
//             {/*<CustomInput3 />*/}
//
//             <CustomLeftImageButton name={"form"} size={20} color={"black"} content={"지문 등록 신청하러가기"}/>
//             <CustomLeftImageButton name={"form"} size={20} color={"black"} content={"지문 등록 신청하러가기"}/>
//             <CustomLeftImageButton name={"form"} size={20} color={"black"} content={"지문 등록 신청하러가기"}/>
//             <CustomLeftImageButton name={"form"} size={20} color={"black"} content={"지문 등록 신청하러가기"}/>
//
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });




import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SearchCenterTemplate from "./components/template/SearchCenterTemplate";
import JoinInfoTemplate from "./components/template/JoinInfoTemplate";
import LoginTemplate from "./components/template/LoginTemplate";
import AuthSelectTemplate from "./components/template/AuthSelectTemplate";
import CenterMainTemplate from "./components/template/CenterMainTemplate";
import ApplyCenterTemplate from "./components/template/ApplyCenterTemplate";
import CheckReservationTemplate from "./components/template/CheckReservationTemplate";
import AgentMainTemplate from "./components/template/AgentMainTemplate";
import ScheduleAcceptTemplate from "./components/template/ScheduleAcceptTemplate";
import ScheduleCheckTemplate from "./components/template/ScheduleCheckTemplate";

const Stack = createStackNavigator();

function App() {

    let auth = "";

    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={auth === "" ? "LoginTemplate" : auth === "Agent" ? "AgentMainTemplate" : "CenterMainTemplate"}
            >
                <Stack.Screen name="LoginTemplate" component={LoginTemplate} options={{headerShown: false}}/>
                <Stack.Screen name="AuthSelectTemplate" component={AuthSelectTemplate} options={{headerShown: false}}/>
                <Stack.Screen name="SearchCenterTemplate" component={SearchCenterTemplate}
                              options={{headerShown: false}}/>
                <Stack.Screen name="JoinInfoTemplate" component={JoinInfoTemplate}
                              options={{headerShown: false}}/>
                <Stack.Screen name="CenterMainTemplate" component={CenterMainTemplate} options={{headerShown: false}}/>
                <Stack.Screen name="ApplyCenterTemplate" component={ApplyCenterTemplate}
                              options={{headerShown: false}}/>
                <Stack.Screen name="CheckReservationTemplate" component={CheckReservationTemplate}
                              options={{headerShown: false}}/>
                <Stack.Screen name="AgentMainTemplate" component={AgentMainTemplate} options={{headerShown: false}}/>
                <Stack.Screen name="ScheduleAcceptTemplate" component={ScheduleAcceptTemplate}
                              options={{headerShown: false}}/>
                <Stack.Screen name="ScheduleCheckTemplate" component={ScheduleCheckTemplate}
                              options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export default App;


