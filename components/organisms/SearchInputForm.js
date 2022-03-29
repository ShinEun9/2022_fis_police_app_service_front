import React from 'react';
import {View, ActivityIndicator} from 'react-native'
import SearchInput from "../atom/SearchInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";

function SearchInputForm({handleChange, currentInfo, submitFunction, isLoading}) {

    return (
        <>
            <View style={{marginRight: 10}}>
                <SearchInput id="c_name" width={250} submitFunction={submitFunction} handleChange={handleChange}
                             currentInfo={currentInfo}
                             placeholder="시설 이름으로 검색"/>
            </View>
            <CustomButton width="70" height="50" backgroundColor={Style.color2} onPress={submitFunction} content={isLoading?<ActivityIndicator color="gray" />:"검색"}/>
        </>
    );
}

export default SearchInputForm;