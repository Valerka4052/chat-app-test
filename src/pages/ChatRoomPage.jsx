import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getChatroomById, getMessagesBychatroom } from "../api";
 
const ChatRoomPage = ({socket}) => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState({});

    useEffect(() => {
        if (socket) {
            socket.emit('chatRoom', { chatRoomId: id });
        }
        (async () => {
            const chatRoomInfo = await getChatroomById(id);
            setRoom(chatRoomInfo);
            const messages = await getMessagesBychatroom(id);
            setMessages(messages);
        })();
        return () => socket.emit('leaveChatRoom', { chatRoomId: id });
    }, [id, socket]);

    useEffect(() => {
        if (socket) { socket.on('allMessages', messages => setMessages(messages)) };
        return () => { if (socket) { socket.off('allMessages', messages => setMessages(messages)) } };
    }, [socket]);

    const formattedDate = useCallback((date) => {
        const inputDate = date;
        const dateObj = new Date(inputDate);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
        return formattedDate;
    }, []);

    const submit = useCallback((e) => {
        e.preventDefault();
        if (message.trim().length < 1) return alert('no message');
        const chatRoomId = id;
        socket.emit("message", chatRoomId, message);
        setMessage('');
    }, [message, id, socket]);

    if (!messages || !room) return;

    return (
        <>
            <Link to='/' >Go to main Page</Link>
            <div>
                <p> chat: --{room.name}--</p>
                <p>description: --{room.description}-- </p>
                <p>comments [{messages.length}]</p>
            </div>
            <ul>
                {messages.map(item => <li key={item._id} style={{ display: 'flex' }}><p style={{ marginRight: 20 }}><b>{item.user.name}</b></p><p>{item.message}</p><p>Date: {formattedDate(item.createdAt)}</p></li>)}
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
