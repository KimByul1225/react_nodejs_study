import React, { useEffect } from 'react';
// import axios from 'axios';

import {useDispatch} from 'react-redux';

import {auth} from '../_actions/user_action';

export default function (SpecifiComponent, option, adminRoute = null) {
    
 function AuthenticationCheck(props){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth()).then(response => {

            console.log(response)

        })

    }, [])
 }
 return AuthenticationCheck
}
