import { Link } from "react-router-dom"
import { useCallback } from "react";
import { LogOut } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const UserPage = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate();
  const logout = useCallback(() => {
    dispatch(LogOut());
    // localStorage.removeItem('token');
    // navigate('/');
  }, [dispatch]);

  return (
    <div>
          <h2>user page</h2>
          <Link to='/' >go to main page</Link>
          <button onClick={logout}>logout</button>
    </div>
  )
}

export default UserPage
