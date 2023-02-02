import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';
import Auth from '../../../hoc/auth';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, sePassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        sePassword(e.currentTarget.value);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);

        let body = {
            email: email,
            password: password,
        }
        dispatch(loginUser(body))
            .then(response => {
                    if(response.payload.loginSuccess){
                        navigate('/');
                    }else{
                        alert('erroe');
                    }
                }

            )
    }

    return (
        <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            <form 
                style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={onEmailHandler}
                />
                <br/>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={onPasswordHandler}
                />
                <br/>
                <button type="submit">Login</button>

            </form>
        </div>
    )
}

export default  Auth(LoginPage, false)