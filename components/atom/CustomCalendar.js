import React, {useEffect, useState} from 'react'
import {ActivityIndicator,Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {FontAwesome} from "@expo/vector-icons";
import {Style} from "../../Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import {showErrorMessage} from "../showErrorMessage";

function CustomCalendar({props}) {
    const [markedDates, setMarkedDates] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [login, setLogin] = useRecoilState(loginState);

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token");
        return t;
    }

    // 근무일과 근무예정일을 api 요청함.
    const getData = async (token) => {
        await axios.get(`http://3.35.135.214:8080/app/confirm/calendar`,
            {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setIsLoading(false);
                const {visited_date, will_go_date} = res.data
                let obj1 = will_go_date.reduce(
                    (c, v) =>
                        Object.assign(c, {
                            [v]: {selected: true, selectedColor: Style.color2},
                        }),
                    {},
                );

                let obj2 = visited_date.reduce(
                    (c, v) =>
                        Object.assign(c, {
                            [v]: {selected: true, selectedColor: Style.color6},
                        }),
                    {},
                );

                // markedDates =
                // {
                //     '2017-10-25': {selected: true, selectedColor: 'red'},
                //     '2017-10-26': {selected: true, selectedColor: 'red'}
                //   }
                setMarkedDates({...obj1, ...obj2})
            })
            .catch((err) => {
                    setIsLoading(false)
                    showErrorMessage(err.response.data.message, setLogin, props, getData,"main")
                }
            )

    }


    useEffect(() => {
        getToken().then((token) => {
            getData(token)
        })
    }, [])


    return (
            <View style={{width: 300, height: 420, justifyContent: isLoading?"center":"space-between"}}>
                {isLoading ? <ActivityIndicator color="gray"/> :
                    <>
                        <Calendar
                            // Initially visible month. Default = Date()
                            current={new Date().toString()}
                            monthFormat={'yyyy MM'}
                            hideArrows={false}
                            renderArrow={(direction) => {
                                return direction === "right" ?
                                    <FontAwesome name="angle-right" size={24} color="black"/> :
                                    <FontAwesome name="angle-left" size={24} color="black"/>
                            }}

                            hideExtraDays={false}
                            disableMonthChange={true}
                            firstDay={1}
                            onPressArrowLeft={substractMonth => substractMonth()}
                            onPressArrowRight={addMonth => addMonth()}
                            disableAllTouchEventsForDisabledDays={true}
                            markedDates={markedDates}
                        />

                        <View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                marginTop: 10,
                                marginBottom: 5
                            }}>
                                <FontAwesome name="square" size={20} color={Style.color6}/>
                                <Text style={{marginLeft: 10, color: Style.color5}}>근무일</Text>
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}}>

                                <FontAwesome name="square" size={20} color={Style.color2}/>
                                <Text style={{marginLeft: 10, color: Style.color5}}>근무 예정일</Text>
                            </View>

                        </View>
                    </>
                }
        </View>
    )
}

export default CustomCalendar;