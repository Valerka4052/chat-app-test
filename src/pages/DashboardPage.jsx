import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllChatrooms } from "../api";

const DashboardPage = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => { (async () => { const res = await getAllChatrooms(); setChats(res); })(); }, []);
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
  
  if (!chats) return;
  return (
    <div>
      <h2> DashboardPage</h2>
      <Link to='/user-page'>go to User Page</Link>
     <div> <Link to='/create-chatroom'>create chat</Link></div>
      {chats.length > 0 && <ul>
        {chats.map(({ _id, name, user, commentsCount, updatedAt,imageURL }) => <li key={_id} style={{display:'flex'}} ><div><img src={imageURL?imageURL:'https://www.biiainsurance.com/wp-content/uploads/2015/05/no-image.jpg'} width={300} height={300} /></div><Link to={`/dashboard/${_id}`}>{name} (by {user.name})  comments:{commentsCount} last comment was{formattedDate(updatedAt) }</Link></li>)}
      </ul>}
    </div>
  );
};

export default DashboardPage
