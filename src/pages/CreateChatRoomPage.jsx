import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createChatroom } from "../api";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateChatRoomPage = () => {
    const { id } = useSelector(state => state.authorisation.user);
    const navigate = useNavigate();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [chatRoomName, setChatRoomName] = useState('');
    const [chatRoomDescription, setChatRoomDescription] = useState('');

    useEffect(() => {
        if (!selectedPhoto) return setPreview(undefined);
        const objectUrl = URL.createObjectURL(selectedPhoto);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedPhoto]);

    const removeImage = useCallback(() => { setSelectedPhoto(null) }, []);
    const handlePhotoChange = useCallback((event) => { setSelectedPhoto(event.target.files[0]) }, []);

    const createRoom = useCallback(
        async () => {
            if (!chatRoomName || !chatRoomDescription) return alert('check all fields');
            if (!selectedPhoto) {
                const data = { name: chatRoomName, description: chatRoomDescription, user: id };
                const room = await createChatroom(data);
                setChatRoomName('');
                setChatRoomDescription('');
                navigate(`/dashboard/${room._id}`);
                return;
            }
            const formData = new FormData();
            formData.append('file', selectedPhoto);
            formData.append('upload_preset', 'zikxnemz');
            formData.append('cloud_name', 'dcoapyu3y');
            const res = await axios.post('https://api.cloudinary.com/v1_1/dcoapyu3y/image/upload', formData);
            const data = { name: chatRoomName, description: chatRoomDescription, user: id, imageURL: res.data.url };
            const room = await createChatroom(data);
            setChatRoomName('');
            setChatRoomDescription('');
            navigate(`/dashboard/${room._id}`);
        },
        [chatRoomDescription, chatRoomName, id, navigate, selectedPhoto],
    );

    return (
        <div>
            <Link to='/' >Go to main Page</Link>
            <div><label>ChatRoom Name<input placeholder='enter chatroom name' type="text" name="name" value={chatRoomName} onChange={(e) => setChatRoomName(e.target.value)} /></label></div>
            <div><textarea onChange={(e) => setChatRoomDescription(e.target.value)} name="enter descripition" placeholder='descripition' rows="4" cols="50" /></div>
            <div>
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                <button disabled={!selectedPhoto} onClick={removeImage} >delete image</button>
                {selectedPhoto && (
                    <div>
                        <h2>photo prewiew:</h2>
                        <img src={preview} width={300} height={300} />
                    </div>)}
            </div>
            <button type='button' onClick={createRoom}>create chatroom</button>
        </div>
    );
};

export default CreateChatRoomPage
