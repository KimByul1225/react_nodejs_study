import React, { useState } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';

function LoginPage() {
    const dispatch = useDispatch();
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
        //dispatch(loginUser(body))
        // Axios.post('/api/user/login', body)
        // .then(response => {

        // })
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

export default LoginPage