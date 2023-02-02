import React, { useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {useDispatch} from 'react-redux';

import {auth} from '../_actions/user_action';

export default function (SpecifiComponent, option, adminRoute = null) {
    //null 아무나 출입가능
    //true 로그인 유저만 출입가능
    //false 로그인한 유저는 출입 불가능
    
 function AuthenticationCheck(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth()).then(response => {

            console.log("response",response)
            //로그인하지 않은 상태
            if(!response.payload.isAuth){
                if(option){
                    navigate('/login');
                }
            }else{
                //로그인 상태
                if(adminRoute && !response.payload.isAdmin){
                    navigate('/');

                }else{
                    if(option === false)
                    navigate('/');
                }
            }


        })

    }, [])
    return(
        <SpecifiComponent/>
    )

 }
 return AuthenticationCheck
}
