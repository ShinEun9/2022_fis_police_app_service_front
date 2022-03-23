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
import MoneyCheckTemplate from "./components/template/MoneyCheckTemplate";
import OffenderAlertTemplate from "./components/template/OffenderAlertTemplate";
import StartupSupportTemplate from "./components/template/StartupSupportTemplate";
import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from "react";
import MainPage from "./components/page/MainPage";
import SettingTemplate from "./components/template/SettingTemplate";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import AgentSettingTemp from "./components/template/AgentSettingTemp";


LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
LogBox.ignoreLogs(['Remote debugger']);

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator();

function App() {
    return (
        <RecoilRoot>

            <NavigationContainer>
                <Stack.Navigator
                    // initialRouteName={auth === "" ? "LoginTemplate" : auth === "Agent" ? "AgentMainTemplate" : "CenterMainTemplate"}
                    initialRouteName="MainPage"
                    // screenOptions={{
                    //     cardStyle: {backgroundColor: '#ffffff'},
                    //     headerStyle: {
                    //         height: 110,
                    //         backgroundColor: '#FFD8CC',
                    //         borderBottomWidth: 1,
                    //         borderBottomColor: '#99154E',
                    //     },
                    //     headerTitleStyle: {color: '#000000', fontsize: 24},
                    //     headerTitleAlign: 'center',
                    //     headerTitle: ({style}) => (
                    //         <MaterialCommunityIcons name='react' style={style}/>
                    //     ), headerBackImage: ({tintColor}) => {
                    //         const style = {
                    //             marginRight: 5,
                    //             marginLeft: Platform.OS === 'ios' ? 11 : 0,
                    //         };
                    //         return (
                    //             <MaterialCommunityIcons
                    //                 name='arrow-left-circle-outline'
                    //                 size={30}
                    //                 color={tintColor}
                    //                 style={style}
                    //             />
                    //         );
                    //     },
                    //     headerBackTitleVisible: false
                    // }}
                >
                    <Stack.Screen name="MainPage" component={MainPage} options={{headerShown: false}}/>
                    <Stack.Screen name="LoginTemplate" component={LoginTemplate} options={{headerShown: false}}/>
                    <Stack.Screen name="AuthSelectTemplate" component={AuthSelectTemplate}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="SearchCenterTemplate" component={SearchCenterTemplate}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="JoinInfoTemplate" component={JoinInfoTemplate} options={{headerShown: false}}/>

                    <Stack.Screen name="SettingTemplate" component={SettingTemplate} options={{headerShown: false}}/>
                    <Stack.Screen name="CenterMainTemplate" component={CenterMainTemplate}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="ApplyCenterTemplate" component={ApplyCenterTemplate}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="CheckReservationTemplate" component={CheckReservationTemplate}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="StartupSupportTemplate" component={StartupSupportTemplate}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="OffenderAlertTemplate" component={OffenderAlertTemplate}
                                  options={{headerShown: false}}/>

                    <Stack.Screen name="AgentSettingTemp" component={AgentSettingTemp} options={{headerShown: false}}/>
                    <Stack.Screen name="AgentMainTemplate" component={AgentMainTemplate}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="ScheduleAcceptTemplate" component={ScheduleAcceptTemplate}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="ScheduleCheckTemplate" component={ScheduleCheckTemplate}

                                  options={{headerShown: false}}/>
                    <Stack.Screen name="MoneyCheckTemplate" component={MoneyCheckTemplate}
                                  options={{headerShown: false}}/>

                </Stack.Navigator>
            </NavigationContainer>
        </RecoilRoot>


    );
}

export default App;


