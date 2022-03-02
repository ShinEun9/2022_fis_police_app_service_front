import React, {useEffect} from 'react';
import {View, SafeAreaView, Text} from "react-native";
import SearchInputForm from "../organisms/SearchInputForm";
import CustomRightImageButton from "../atom/CustomRightImageButton";
import CustomNavigation from "../CustomNavigation";
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
        let c_address, c_ph;
        await axios.get(`http://localhost:8080/center/search?c_name=${c_name}&c_address=${c_address}&c_ph=${c_ph}`, {withCredentials: true})
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
                console.log("hi")
            })
    }
    const submitFunction = async (token) => {
        // 시설 search api 요청
        getToken().then((res)=>{
            searchRequest();
        })
        // setCenterList();


    }
    const goSomePage = () => {
        // 선택한 시설의 정보를 어떻게 저장하지...? 리코일?
        props.navigation.navigate('JoinInfoTemplate', props)
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 0.5}}>
                <CustomNavigation navigation={props.navigation} type="noGearTitleNavbar" title={"회원가입"}/>
            </View>
            <View style={{flex: 2, flexDirection: "row", justifyContent: "center", alignItems: 'center'}}>
                <SearchInputForm currentInfo={currentInfo} handleChange={handleChange}
                                 submitFunction={submitFunction}/>
            </View>
            <View style={{flex: 7, marginTop: 10, justifyContent: "flex-start", alignItems: "center"}}>
                {centerList === null ? null :
                    centerList.map((center) => {
                        return <View style={{marginBottom: 10}}>
                            <CustomRightImageButton onPress={goSomePage} name="right" size={20} color="black"
                                                    content={<View style={{justifyContent: 'space-between'}}>
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