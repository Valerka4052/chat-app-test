import io from "socket.io-client";
const token = JSON.parse(localStorage.getItem('persist:authorisation')).token.slice(1, -1);
console.log(token.toString());
let socket = io.connect("http://localhost:8000", { query: { token } });
 console.log('socket', socket)
export default socket;

// "https://test-chat-backend.onrender.com"
// "http://localhost:8000"