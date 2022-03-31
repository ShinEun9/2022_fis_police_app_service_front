import React from 'react';
import {View, SafeAreaView, Text, Platform, Dimensions, StyleSheet} from "react-native";
import SearchInputForm from "../organisms/SearchInputForm";
import CustomRightImageButton from "../atom/CustomRightImageButton";
import CustomNavigation from "../organisms/CustomNavigation";
import axios from "axios";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";
import {showErrorMessage} from "../showErrorMessage";


function SearchCenterTemplate(props) {
    const [currentInfo, setCurrentInfo] = React.useState({sido: '', local: '', c_name: ''});
    const [centerList, setCenterList] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false);
    const [login, setLogin] = useRecoilState(loginState);

    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }

    const searchRequest = async () => {
        let {c_name} = currentInfo;
        await axios.get(`http://3.35.135.214:8080/app/center/search?c_name=${c_name}`, {withCredentials: true})
            .then((res) => {
                console.log(res.data.data)
                setIsLoading(false)
                setCenterList(res.data.data)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
                //안해도됨
                showErrorMessage(err.response.data.message, setLogin, props)
            })
    }

    const submitFunction = async () => {
        // 시설 search api 요청
        setIsLoading(true);
        searchRequest();

    }


    const goSomePage = (keyValue) => {
        if (props.route.params === "setting") {
            props.navigation.navigate({
                name: 'SettingTemplate',
                params: {center_id: keyValue[0], c_name: keyValue[1]},
                merge: true,
            })
        } else {
            props.navigation.navigate('JoinInfoTemplate', keyValue[0])
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 0.5}}>

                <CustomNavigation props={props} type="joinSettingNavbar"
                                  title={props.route.params === "setting" ? "설정페이지" : "회원가입"}/>
            </View>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: 'center'}}>
                <SearchInputForm currentInfo={currentInfo} handleChange={handleChange}
                                 submitFunction={submitFunction} isLoading={isLoading}/>
            </View>
            <View style={{flex: 7, marginTop: 10, justifyContent: "flex-start", alignItems: "center"}}>
                {centerList.length === 0 ? <Text style={{color: "gray"}}>검색 결과가 없습니다.</Text> :
                    centerList.map((center) => {
                        return <View key={center.center_id} style={{marginBottom: 15}}>
                            <CustomRightImageButton keyValue={[center.center_id, center.c_name]} onPress={goSomePage}
                                                    name="right" size={20} color="black"
                                                    content={
                                                        <View
                                                            style={{
                                                                height: "100%",
                                                                justifyContent: 'space-between',
                                                            }}>
                                                            <Text style={styles.contentTitle}>{center.c_name}</Text>
                                                            <Text
                                                                style={styles.contentEtc}>{center.c_address.substr(0, 25)}...</Text>
                                                            <Text style={styles.contentEtc}>{center.c_ph}</Text>
                                                        </View>
                                                    }
                            />
                        </View>

                    })

                }
            </View>

        </SafeAreaView>
    );
}

export default SearchCenterTemplate;

const styles = StyleSheet.create({
    contentTitle: {
        fontSize: Dimensions.get('window').width > 400 ? 20 : 16,
    },
    contentEtc: {
        fontSize: Dimensions.get('window').width > 400 ? 16 : 12,
    }
})