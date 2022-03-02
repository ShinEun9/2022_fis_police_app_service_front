import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native'
import Select from "../atom/Select";
import SearchInput from "../atom/SearchInput";
import CustomInput from "../atom/CustomInput";
import CustomButton from "../atom/CustomButton";
import {Style} from "../../Style";

function SearchInputForm({handleChange, currentInfo, submitFunction}) {

    return (
        <>
            {/*<View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>*/}
            {/*    <Select label="시/도 선택" id="sido" width={useWindowDimensions().width*0.35}*/}
            {/*            items={[{label: 'Football', value: 'football'}, {*/}
            {/*                label: 'Baseball',*/}
            {/*                value: 'baseball'*/}
            {/*            }, {label: 'Hockey', value: 'hockey'}]}*/}
            {/*            handleChange={handleChange} currentInfo={currentInfo}/>*/}
            {/*    <Select label="지역 선택" id="local" width={useWindowDimensions().width*0.35}*/}
            {/*            items={[{label: 'Football', value: 'football'}, {*/}
            {/*                label: 'Baseball',*/}
            {/*                value: 'baseball'*/}
            {/*            }, {label: 'Hockey', value: 'hockey'}]}*/}
            {/*            handleChange={handleChange} currentInfo={currentInfo}/>*/}
            {/*</View>*/}
            <View style={{marginRight: 10}}>
                <SearchInput id="c_name" width={250} submitFunction={submitFunction} handleChange={handleChange}
                             currentInfo={currentInfo}
                             placeholder="시설 이름으로 검색"/>
            </View>
            <CustomButton width="70" height="50" backgroundColor={Style.color2} onPress={submitFunction} content={"검색"}/>
        </>
    );
}

export default SearchInputForm;