import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const DashboardPage = ({ socket }) => {
  
  const [chatRoomName, setChatRoomName] = useState('');
  const [chats, setChats] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get('https://test-chat-backend.onrender.com/chatroom', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setChats(res.data);
    })();

  }, []);
console.log('chats', chats)
  const create = async() => {
    const room = await axios.post('https://test-chat-backend.onrender.com/chatroom', { name: chatRoomName }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
     const res = await axios.get('https://test-chat-backend.onrender.com/chatroom', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    setChats(res.data);
    setChatRoomName('');
  }
  if (!chats) return <h1>Loading...</h1>;
  return (
    <div>
      <h2> DashboardPage</h2>
      <div><label>ChatRoom Name<input type="text" name="name" value={chatRoomName } onChange={(e) => setChatRoomName(e.target.value)} /></label></div>
      <button type='button' onClick={create}>create chatroom</button>
     {chats.length>0 && <ul>
        {chats.map(({ _id, name }) =>  <li key={_id}><Link state={{ name: name }} to={`/dashboard/${_id}`}>{ name}</Link></li>)}
      </ul>}
    </div>
  )
}

export default DashboardPage
