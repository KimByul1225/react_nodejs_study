import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Auth from '../../../hoc/auth';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response))

  }, [])

  const onClickHandler = () => {
    axios.get('/api/user/logout')
    .then(response => {
      // console.log(response.data);
      if(response.data.success){
        navigate('/login');

      }else{
        alert('로그아웃에 실패했습니다.')
      }
    })
    
  }

  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '100%', height: '100vh'}}>
      LandingPage

      <button
        onClick={onClickHandler}
      > 
        로그아웃
      </button>
    </div>
  )
}

export default  Auth(LandingPage, null);

