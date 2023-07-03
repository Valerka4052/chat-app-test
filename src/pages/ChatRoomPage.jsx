import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import socket from "../socket";
import axios from "axios";

const ChatRoomPage = () => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState({});

    useEffect(() => {
        if (socket) {
            socket.emit('chatRoom', { chatRoomId: id });
        }
        (async () => {
            const chatRoomInfo = await axios.get(`https://test-chat-backend.onrender.com/chatroom/${id}`);
            setRoom(chatRoomInfo.data);
            const messages = await axios.post('https://test-chat-backend.onrender.com/messages/chat', { id }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(messages);
            setMessages(messages.data);
        })();
        return () => socket.emit('leaveChatRoom', { chatRoomId: id });
    }, [id]);

    socket.on('allMessages', data => setMessages(data));

    const submit = useCallback((e) => {
        e.preventDefault();
        if (message.trim().length < 1) return alert('no message');
        const chatRoomId = id;
        socket.emit("message", chatRoomId, message);
        setMessage('');
    }, [message, id]);

    if (!messages) return;

    return (
        <>
             <Link to='/dashboard' >Go to main Page</Link>
            <div>
                <p> chat: {room.name}</p>
                <p>description:{room.description} </p>
            </div>
           
            <ul>
                {messages.map(item => <li key={item._id} style={{ display: 'flex' }}><p style={{ marginRight: 20 }}><b>{item.user.name}</b></p><p>{item.message}</p></li>)}
            </ul>
            <div>
                <form onSubmit={(e) => submit(e)}>
                    <input type="text" name="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say something" />
                    <button type="submit">Send!</button>
                </form>
            </div>
        </>
    );
};

export default ChatRoomPage;
