import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Button, useWindowDimensions} from 'react-native'
import {FontAwesome} from "@expo/vector-icons";

function CustomNavigation({navigation, type = "a"}) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen((prev) => !prev);
    }
    let element;

    if (type === "a") {
        element = <View style={{
            width: useWindowDimensions().width,
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20
        }}>
            <TouchableOpacity activeOpacity={0.6} onPress={()=>navigation.goBack()} style={{flex: 1}}>
                <FontAwesome name="angle-left" size={30} color="black" style={{fontWeight: "600"}} />
            </TouchableOpacity>
            <Text style={{fontSize: 23, fontWeight: "600",  flex: 1, textAlign: "center"}}>회원가입</Text>
            <View  style={{ flex: 1 }}></View>
      </View>
    }

    return (
        // <View>
        //     <TouchableOpacity onPress={handleOpen} style={{flexDirection: "row", alignItems: "center"}}>
        //         <Text>열기</Text>
        //         {open ? <FontAwesome name="angle-down" size={24} color="black"/> :
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
