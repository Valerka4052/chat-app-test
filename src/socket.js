import io from "socket.io-client";
const socket = io.connect("https://test-chat-backend.onrender.com", { query: { token: localStorage.getItem('token') } });
export default socket