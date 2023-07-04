import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const initialValues = {
  name:'',
  email: '',
  password:''
}


const RegisterPage = () => {
  const [register, setRegister] = useState(initialValues);
  const navigate = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    try {
      const lo = await axios.post('https://test-chat-backend.onrender.com/user/register', register);
       if(typeof lo.data==='string')return alert(lo.data)
      setRegister(initialValues);
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      <h2>Register Page</h2>
      <Link to='/login' >Have acount?</Link>
      <form onSubmit={submit}>
        <label >name<input type='text' value={register.name} name='name' onChange={(e) => setRegister(prev => ({ ...prev, name: e.target.value }))} /></label>
        <label >email<input type='email' value={register.email} name='email' onChange={(e) => setRegister(prev => ({ ...prev, email: e.target.value }))} /></label>
        <label >password<input type='password' value={register.password} name='password' onChange={(e) => setRegister(prev => ({ ...prev, password: e.target.value }))} /></label>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}
export default RegisterPage
