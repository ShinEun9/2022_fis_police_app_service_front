import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Button, useWindowDimensions} from 'react-native'
import {FontAwesome} from "@expo/vector-icons";
import CustomImageButton from "./atom/CustomImageButton";

function CustomNavigation({navigation, type, title}) {
    // const [open, setOpen] = useState(false)
    // const handleOpen = () => {
    //     setOpen((prev) => !prev);
    // }

    // onPressCalendar와 onPressSetting 함수를 어디서 정의 하는 것이 맞을까?
    // props로 받는 게 맞을까 아니면,,, 여기서 정의하는 게 맞을까? 흠...
    const onPressCalendar = () => {
        console.log("press Calendar")
    }

    const onPressSetting = ()=>{
        let page = "setting"
        navigation.navigate("JoinInfoTemplate", page )
    }

    let element;

    if (type === "join" || type === "titleNavbar") {
        element = <View style={{
            width: useWindowDimensions().width,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20
        }}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()} style={{flex: 1}}>
                <FontAwesome name="angle-left" size={30} color="black" style={{fontWeight: "600"}}/>
            </TouchableOpacity>
            <Text style={{fontSize: 20, fontWeight: "600", flex: 2.8, textAlign: "center"}}>{title}</Text>
            <View style={{flex: 1, alignItems: "flex-end"}}>
                {type === "titleNavbar" ?
                    <CustomImageButton onPress={onPressSetting} name={"gear"} color={"black"} size={30}/>
                    : null}
            </View>
        </View>
    } else if (type === "agentMain" || type === "centerMain") {
        element = <View style={{
            width: useWindowDimensions().width,
            height: 50,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingHorizontal: 20
        }}>

            {type==="agentMain" ? <View style={{marginRight: 15}}>
                <CustomImageButton onPress={onPressCalendar} name={"calendar-o"} color="black" size={30}/>
            </View> : null}
            <CustomImageButton onPress={onPressSetting} name={"gear"} color={"black"} size={30}/>

        </View>
    }


    return (
        // <View>
        // <TouchableOpacity onPress={handleOpen} style={{flexDirection: "row", alignItems: "center"}}>
        // <Text>열기</Text>
        // {open ? <FontAwesome name="angle-down" size={24} color="black"/> :
        //             <FontAwesome name="angle-up" size={24} color="black"/>}
        //     </TouchableOpacity>
        //     <View style={open ? {display: "block"} : {display: "none"}}>
        //         <Button title="Go back" onPress={() => navigation.goBack()}/>
        //
        //     </View>
        //
        // </View>

        element
    );
}

export default CustomNavigation;
