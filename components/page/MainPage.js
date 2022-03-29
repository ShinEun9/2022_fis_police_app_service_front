import React, {useEffect} from 'react';
import LoginTemplate from "../template/LoginTemplate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AgentMainTemplate from "../template/AgentMainTemplate";
import CenterMainTemplate from "../template/CenterMainTemplate";
import {useRecoilState} from "recoil";
import {loginState} from "../../store/login";

function MainPage(props) {
    const [login, setLogin] = useRecoilState(loginState);
    const STORAGE_KEY = "@u_auth";
    const loadLoginState = async()=>{
        const s= await AsyncStorage.getItem(STORAGE_KEY);
        setLogin(s);
    }

    useEffect(() => {
        loadLoginState()
    }, [])

    return (<>
            {login === null ? <LoginTemplate setLogin={setLogin} props={props} /> : login === "AGENT" ? <AgentMainTemplate setLogin={setLogin} props={props}/> : <CenterMainTemplate setLogin={setLogin} props={props}/>}
        </>

    )
        ;
}

export default MainPage;