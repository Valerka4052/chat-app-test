import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const DashboardPage = () => {

  const [chats, setChats] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get('https://test-chat-backend.onrender.com/chatroom', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setChats(res.data);
    })();
  }, []);

  if (!chats) return
  return (
    <div>
      <h2> DashboardPage</h2>
      <Link to='/user-page'>my page</Link>
     <div> <Link to='/create-chatroom'>create chat</Link></div>
      {chats.length > 0 && <ul>
        {chats.map(({ _id, name }) => <li key={_id}><Link  to={`/dashboard/${_id}`}>{name}</Link></li>)}
      </ul>}
    </div>
  );
};

export default DashboardPage
