// import axios from "axios";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createChatroom } from "../api";
import { useSelector } from "react-redux";

const CreateChatRoomPage = () => {
    const { id } = useSelector(state => state.authorisation.user);

    const navigate = useNavigate();
    const [chatRoomName, setChatRoomName] = useState('');
    const [chatRoomDescription, setChatRoomDescription] = useState('');

    const create = useCallback(
           async () => {
            if (!chatRoomName || !chatRoomDescription) return alert('check all fields');
            const data = { name: chatRoomName, description: chatRoomDescription,id };
            // const room = await axios.post('https://test-chat-backend.onrender.com/chatroom',data , { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            const room = await createChatroom(data);
            setChatRoomName('');
            setChatRoomDescription('');
            navigate(`/dashboard/${room._id}`);
        },
        [chatRoomDescription, chatRoomName, id, navigate],
    );

    return (
        <div>
            <Link to='/dashboard' >Go to main Page</Link>
            <div><label>ChatRoom Name<input placeholder='enter chatroom name' type="text" name="name" value={chatRoomName} onChange={(e) => setChatRoomName(e.target.value)} /></label></div>
            <div><textarea onChange={(e) => setChatRoomDescription(e.target.value)} name="enter descripition" placeholder='descripition' rows="4" cols="50" /></div>
            <button type='button' onClick={create}>create chatroom</button>
        </div>
    );
};

export default CreateChatRoomPage
