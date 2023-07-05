import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createChatroom } from "../api";
import { useSelector } from "react-redux";

const CreateChatRoomPage = () => {
    const { id } = useSelector(state => state.authorisation.user);
    const navigate = useNavigate();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [chatRoomName, setChatRoomName] = useState('');
    const [chatRoomDescription, setChatRoomDescription] = useState('');

    useEffect(() => {
        if (!selectedPhoto) return setPreview(undefined);
        const objectUrl = URL.createObjectURL(selectedPhoto);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedPhoto]);

    const removeImage = useCallback(() => {
        setSelectedPhoto(null);
        setImageURL('');
    },[])

    const handlePhotoChange = useCallback((event) => {
        setSelectedPhoto(event.target.files[0]);
    }, []);

    const handleUpload = useCallback(() => {
        const formData = new FormData();
        formData.append('file', selectedPhoto);
        formData.append('upload_preset', 'zikxnemz');
        formData.append('cloud_name', 'dcoapyu3y');
        // formData.append('transformation', 'width=300,height=300,crop=limit');
        fetch('https://api.cloudinary.com/v1_1/dcoapyu3y/image/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Обработка ответа от Cloudinary
                setImageURL(data.url);
              
            })
            .catch((error) => {
                console.error('Ошибка загрузки фото:', error);
            });
    }, [selectedPhoto]);


    const create = useCallback(
        async () => {
            if (!chatRoomName || !chatRoomDescription || !imageURL) return alert('check all fields');
            const data = { name: chatRoomName, description: chatRoomDescription, user:id, imageURL };
            const room = await createChatroom(data);
            setChatRoomName('');
            setChatRoomDescription('');
            setImageURL('')
            navigate(`/dashboard/${room._id}`);
        },
        [chatRoomDescription, chatRoomName, id, imageURL, navigate],
    );

    return (
        <div>
            <Link to='/' >Go to main Page</Link>
            <div><label>ChatRoom Name<input placeholder='enter chatroom name' type="text" name="name" value={chatRoomName} onChange={(e) => setChatRoomName(e.target.value)} /></label></div>
            <div><textarea onChange={(e) => setChatRoomDescription(e.target.value)} name="enter descripition" placeholder='descripition' rows="4" cols="50" /></div>
            <div>
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                <button disabled={imageURL} onClick={handleUpload}>add photo to chat</button>
                <button disabled={!selectedPhoto} onClick={removeImage} >delete image</button>
                {selectedPhoto && (
                    <div>
                        <h2>photo prewiew:</h2>
                        <img src={preview} width={300} height={300}
                        />
                    </div>)} </div>
            <button type='button' onClick={create}>create chatroom</button>
        </div>
    );
};

export default CreateChatRoomPage
