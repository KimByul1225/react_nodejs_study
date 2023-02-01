import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';


function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, sePassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }
    const onNamelHandler = (e) => {
        setName(e.currentTarget.value);
    }
    const onPasswordHandler = (e) => {
        sePassword(e.currentTarget.value);
    }
    const onConfirmPasswordHandler = (e) => {
        setConfirmpassword(e.currentTarget.value);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);

        if(password !== confirmpassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: email,
            name: name,
            password: password,
        }
        dispatch(registerUser(body))
            .then(response => {
                    if(response.payload.success){
                        navigate('/login');
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
            <label>Name</label>
            <input
                type="text"
                value={name}
                onChange={onNamelHandler}
            />
            <br/>

            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={onPasswordHandler}
            />
            <br/>
            <label>Confirm Password</label>
            <input
                type="password"
                value={confirmpassword}
                onChange={onConfirmPasswordHandler}
            />
            <br/>
            <button type="submit">Login</button>

        </form>
    </div>
  )
}

export default RegisterPage