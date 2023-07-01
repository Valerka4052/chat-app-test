import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const initialValues = {
  email: '',
  password:''
}

const LoginPage = () => {
  const [login, setLogin] = useState(initialValues);
  const navigate = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://test-chat-backend.onrender.com/user/login', login);
      console.log(res);
      if(typeof res.data === 'string') return alert('lo.dada')
      localStorage.setItem('token', res.data.token);
      setLogin(initialValues);
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  };
// console.log('login', login)
  return (
    <div>
      <h2>Login Page</h2>
      <Link to='/register' >Dont have acount?</Link>
      <form onSubmit={submit}>
        <label >email<input type='email' value={login.email} name='email' onChange={(e)=>setLogin(prev=>({...prev,email:e.target.value})) } /></label>
        <label >password<input type='password' value={login.password} name='password' onChange={(e)=>setLogin(prev=>({...prev,password:e.target.value})) } /></label>
        <button type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default LoginPage
