import axios from "axios";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateChatRoomPage = () => {
    const navigate = useNavigate()
  const [chatRoomName, setChatRoomName] = useState('');

    const create = useCallback(
        async () => {
            const room = await axios.post('https://test-chat-backend.onrender.com/chatroom', { name: chatRoomName }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setChatRoomName('');
            navigate(`/dashboard/${room.data._id}`);
        },
        [chatRoomName, navigate],
    );
    //   const create =  async () => {
    //       const room = await axios.post('https://test-chat-backend.onrender.com/chatroom', { name: chatRoomName }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    //       setChatRoomName('');
    //             navigate(`/dashboard/${room.data._id}`);
    //        };
  return (
      <div>
          <Link to='/dashboard' >Go to main Page</Link>
      <div><label>ChatRoom Name<input type="text" name="name" value={chatRoomName} onChange={(e) => setChatRoomName(e.target.value)} /></label></div>
      <button type='button' onClick={create}>create chatroom</button>
    </div>
  )
}

export default CreateChatRoomPage
