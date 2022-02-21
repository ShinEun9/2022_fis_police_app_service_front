import React, {useEffect} from 'react';
import {View, SafeAreaView, Text} from "react-native";
import SearchInputForm from "../organisms/SearchInputForm";
import CustomRightImageButton from "../atom/CustomRightImageButton";
import CustomNavigation from "../CustomNavigation";


function SearchCenterTemplate(props) {
    const [currentInfo, setCurrentInfo] = React.useState({sido: '', local: '', center_name: ''});
    const [centerList, setCenterList] = React.useState([{
        c_name: '타요타요 유치원',
        c_address: '서울 특별시 용산구 이촌로 100-8 동아 그린 아파트',
        c_ph: "02-711-1105"
    },
        {
            c_name: '타요타요 유치원',
            c_address: '서울 특별시 용산구 이촌로 100-8 동아 그린 아파트',
            c_ph: "02-711-1105"
        }
        , {
            c_name: '타요타요 유치원',
            c_address: '서울 특별시 용산구 이촌로 100-8 동아 그린 아파트',
            c_ph: "02-711-1105"
        }])

    const handleChange = (name, value) => {
        setCurrentInfo({
            ...currentInfo,
            [name]: value
        })
    }

    const submitFunction = () => {
        // 시설 search api 요청
        // setCenterList();
    }
    const goSomePage = () => {
        // 선택한 시설의 정보를 어떻게 저장하지...? 리코일?
        props.navigation.navigate('JoinInfoTemplate', props)
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex:0.5}}>
                <CustomNavigation navigation={props.navigation}/>
            </View>
            <View style={{flex: 2, justifyContent: "center", alignItems: 'center'}}>
                <SearchInputForm currentInfo={currentInfo} handleChange={handleChange} submitFunction={submitFunction}/>
            </View>
            <View style={{flex: 7, marginTop: 10, justifyContent: "flex-start", alignItems: "center"}}>
                {centerList === null ? null :
                    centerList.map((center) => {
                        return <View style={{marginBottom: 10}}>
                            <CustomRightImageButton onPress={goSomePage} name="right" size={20} color="black"
                                                    content={<View style={{justifyContent: 'space-between'}}>
                                                                <Text style={{fontSize: 20}}>{center.c_name}</Text>
                                                                <Text>{center.c_address.substr(0,25)}...</Text>
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