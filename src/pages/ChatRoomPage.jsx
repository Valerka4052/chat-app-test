import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import socket from "../socket";
const ChatRoomPage = () => {
    console.log(socket);
    const location = useLocation()
  const { name } = location.state
     let params = useParams();
    const [message, setMessage] = useState('');
     const [messages, setMessages] = useState([]);
    useEffect(() => {
        socket.emit('chatRoom', { chatRoomId: params.id });
        // socket.on('newMessage',{message,})
    
     return ()=> socket.emit('leaveChatRoom', { chatRoomId: params.id });
    }, [params.id])
    
    socket.on('allMessages', (data) => {
        console.log('data', data)
        setMessages(data)
    });
    // console.log(params.id);
    const submit = (e) => {
        e.preventDefault();
        if (message.trim().length < 1) return alert('no message');
        const newMessage = { chatroom: params.id, message }
        socket.emit("message", newMessage);
        console.log(message);
        setMessage('');
    }
    if (!messages) return;
  return (
  <>  <div>
          chat: {name}
      </div>
          
          <Link to='/dashboard' >Go to main Page</Link>
          <ul>
              {messages.map(item => <li key={item._id} style={{display:'flex'}}><p style={{marginRight:20}}><b>{item.user.name}</b></p><p>{ item.message}</p></li>)}
          </ul>
          <div>
              <form onSubmit={(e)=>submit(e)}>
                  <input type="text" name="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Say something" />
                  <button type="submit">Send!</button>
              </form>
          </div>
          </>
  )
}

export default ChatRoomPage
