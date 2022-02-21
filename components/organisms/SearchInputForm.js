import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native'
import Select from "../atom/Select";
import SearchInput from "../atom/SearchInput";
import CustomInput from "../atom/CustomInput";

function SearchInputForm({handleChange, currentInfo, submitFunction}) {

    return (
        <>
            <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 10}}>
                <Select label="시/도 선택" id="sido" width={useWindowDimensions().width*0.4} height="50"
                        items={[{label: 'Football', value: 'football'}, {
                            label: 'Baseball',
                            value: 'baseball'
                        }, {label: 'Hockey', value: 'hockey'}]}
                        handleChange={handleChange} currentInfo={currentInfo}/>
                <Select label="지역 선택" id="local"
                        items={[{label: 'Football', value: 'football'}, {
                            label: 'Baseball',
                            value: 'baseball'
                        }, {label: 'Hockey', value: 'hockey'}]}
                        handleChange={handleChange} currentInfo={currentInfo}/>
            </View>
                <SearchInput id="center_name" submitFunction={submitFunction} handleChange={handleChange}
                             currentInfo={currentInfo}
                             placeholder="시설 이름으로 검색"/>
        </>
    );
}

export default SearchInputForm;