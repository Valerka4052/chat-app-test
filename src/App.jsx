import { Route, Routes } from "react-router-dom";
import socket from "./socket";


import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import IndexPage from "./pages/IndexPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import { useEffect } from "react";
import CreateChatRoomPage from "./pages/CreateChatRoomPage";
import UserPage from "./pages/UserPage";

function App() {
  useEffect(() => { socket.on('connect', () => console.log('CONNECTED')) }, []);
 
  return (
    <Routes>
      <Route path='/' element={<IndexPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/dashboard/:id' element={<ChatRoomPage />} />
      <Route path='/create-chatroom' element={<CreateChatRoomPage />} />
      <Route path='/user-page' element={<UserPage />} />
    </Routes>
  );
}

export default App;
