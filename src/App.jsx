import { Route, Routes } from "react-router-dom";
// import socket from "./socket";
import io from "socket.io-client";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import { useEffect, useState } from "react";
import CreateChatRoomPage from "./pages/CreateChatRoomPage";
import UserPage from "./pages/UserPage";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/authOperations";

function App() {
  const { isRefresh,token} = useSelector(state => state.authorisation);
    const [socket, setSocket] = useState(null)
  useEffect(() => { setSocket(io.connect("https://test-chat-backend.onrender.com", { query: { token } })) }, [token]);
   const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return (
    !isRefresh &&
    <Routes>
      <Route path='/' index element={<PrivateRoute component={DashboardPage} redirectTo={'/login'} />} />
      <Route path='/login' element={<PublicRoute component={LoginPage} redirectTo={'/'} />} />
      <Route path='/register' element={<PublicRoute component={RegisterPage} redirectTo={'/'} />} />
      <Route path="/dashboard/:id" element={<PrivateRoute component={ChatRoomPage} redirectTo={'/login'} socket={socket} />} />
      <Route path="/create-chatroom" element={<PrivateRoute component={CreateChatRoomPage} redirectTo={'/login'} />} />
      <Route path="/user-page" element={<PrivateRoute component={UserPage} redirectTo={'/login'} />} />
    </Routes>
  );
}

export default App;

    //  <Route path="/login" component={LoginPage} />
    //   <PublicRoute path="/register" component={RegisterPage} />
    //   <PrivateRoute path="/dashboard" component={DashboardPage} isAuthenticated={isAuth} />
    //   <PrivateRoute path="/dashboard/:id" component={ChatRoomPage} isAuthenticated={isAuth} />
    //   <PrivateRoute path="/create-chatroom" component={CreateChatRoomPage} isAuthenticated={isAuth} />
    //   <PrivateRoute path="/user-page"  component={UserPage} isAuthenticated={isAuth} />

      // <Route path="/login" component={LoginPage} />
      // <Route path='/login' element={<LoginPage />} />
      // <Route path='/register' element={<RegisterPage />} />
      // <Route path='/dashboard' element={<DashboardPage />} />
      // <Route path='/dashboard/:id' element={<ChatRoomPage />} />
      // <Route path='/create-chatroom' element={<CreateChatRoomPage />} />
      // <Route path='/user-page' element={<UserPage />} />
