import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import socket from "../socket";
import axios from "axios";

const ChatRoomPage = () => {
    // const location = useLocation();
    // const { name } = location.state;
    const params = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (socket) {
            socket.emit('chatRoom', { chatRoomId: params.id });
        }
        (async () => {
            const messages = await axios.post('https://test-chat-backend.onrender.com/messages/chat', { id: params.id }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            console.log(messages);
            setMessages(messages.data);
        })();
        return () => socket.emit('leaveChatRoom', { chatRoomId: params.id });
    }, [params.id]);

    socket.on('allMessages', (data) => {
        console.log('data', data);
        setMessages(data);
    });
    // console.log(messages);
    const submit = useCallback((e) => {
        e.preventDefault();
        if (message.trim().length < 1) return alert('no message');
        const chatRoomId = params.id;
        socket.emit("message", chatRoomId, message);
        setMessage('');
    }, [message, params.id]);
    //     const submit = (e) => {
    //     e.preventDefault();
    //     if (message.trim().length < 1) return alert('no message');
    //     const chatRoomId = params.id;
    //     socket.emit("message", chatRoomId, message);
    //     setMessage('');
    // };

    if (!messages) return;

    return (
        <>  <div>
            chat: {params.id}
        </div>
            <Link to='/dashboard' >Go to main Page</Link>
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
