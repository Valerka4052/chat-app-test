// import axios from 'axios';
import { useState } from 'react';
import { Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { LogIn } from '../redux/auth/authOperations';

const initialValues = {
  email: '',
  password:''
}

const LoginPage = () => {
   const dispatch = useDispatch()
  const [login, setLogin] = useState(initialValues);
  // const navigate = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    try {
      dispatch(LogIn(login))
      // const res = await axios.post('https://test-chat-backend.onrender.com/user/login', login);
      // const res = await loginAction(login)
      // if (typeof res.data === 'string') return alert('lo.dada')
      // localStorage.setItem('token', res.data.token);
      setLogin(initialValues);
      // navigate('/')
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
