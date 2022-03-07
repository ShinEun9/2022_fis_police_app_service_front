import React, {useEffect} from 'react';
import {View, SafeAreaView, Text} from "react-native";
import SearchInputForm from "../organisms/SearchInputForm";
import CustomRightImageButton from "../atom/CustomRightImageButton";
import CustomNavigation from "../organisms/CustomNavigation";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


function SearchCenterTemplate(props) {
    const [currentInfo, setCurrentInfo] = React.useState({sido: '', local: '', c_name: ''});
    const [centerList, setCenterList] = React.useState([])

    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }

    const getToken = async () => {
        const t = await AsyncStorage.getItem("@token")
        return t
    }

    const searchRequest = async (token) => {
        let {c_name} = currentInfo;
        console.log(c_name)
        let c_address, c_ph;
        await axios.get(`http://localhost:8080/app/center/search?c_name=${c_name}`, {withCredentials: true})
            .then((res) => {
                setCenterList(res.data.data)
            })
            .catch((err) => {
                console.log(err)
                console.log("hi")
            })
    }

    const submitFunction = async (token) => {
        // 시설 search api 요청
        getToken().then((token)=>{
            searchRequest(token);
        })

    }

    const goSomePage = (keyValue) => {
        if(props.route.params==="setting"){
            props.navigation.navigate({
                name: 'SettingTemplate',
                params: {center_id: keyValue[0], c_name: keyValue[1]},
                merge: true,
            })
        }else{
            props.navigation.navigate('JoinInfoTemplate', keyValue[0])
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 0.5}}>
                <CustomNavigation navigation={props.navigation} type="noGearTitleNavbar" title={props.route.params==="setting"?"설정페이지":"회원가입"}/>
            </View>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: 'center'}}>
                <SearchInputForm currentInfo={currentInfo} handleChange={handleChange}
                                 submitFunction={submitFunction}/>
            </View>
            <View style={{flex: 7, marginTop: 10, justifyContent: "flex-start", alignItems: "center"}}>
                {centerList === null ? null :
                    centerList.map((center) => {
                        return <View key={center.center_id}style={{marginBottom: 15}}>
                            <CustomRightImageButton keyValue={[center.center_id, center.c_name]} onPress={goSomePage} name="right" size={20} color="black"
                                                    content={<View style={{height: "100%", justifyContent: 'space-between'}}>
                                                        <Text style={{fontSize: 20}}>{center.c_name}</Text>
                                                        <Text>{center.c_address.substr(0, 25)}...</Text>
                                                        <Text>{center.c_ph}</Text>
                                                    </View>}
                            />
                        </View>

                    })

                }
            </View>

        </SafeAreaView>
    );
}

export default SearchCenterTemplate;