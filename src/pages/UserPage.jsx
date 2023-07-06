import { Link } from "react-router-dom"
import { useCallback, useEffect, useState } from "react";
import { LogOut, updateUser } from "../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const UserPage = () => {
  const { id, name, email, imageURL } = useSelector(state => state.authorisation.user);
  const dispatch = useDispatch()
  const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
      useEffect(() => {
        if (!selectedPhoto) return setPreview(undefined);
        const objectUrl = URL.createObjectURL(selectedPhoto);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedPhoto]);
  // const logout = useCallback(() => { dispatch(LogOut()) }, [dispatch]);
  const removeImage = useCallback(() => { setSelectedPhoto(null) }, []);
  const handlePhotoChange = useCallback((event) => { setSelectedPhoto(event.target.files[0]) }, []);
  const updateUserImage = useCallback(async () => {
    const formData = new FormData();
    formData.append('file', selectedPhoto);
    formData.append('upload_preset', 'zikxnemz');
    formData.append('cloud_name', 'dcoapyu3y');
    const res = await axios.post('https://api.cloudinary.com/v1_1/dcoapyu3y/image/upload', formData);
    const imageURL = res.data.url;
    const data = { id, imageURL };
    dispatch(updateUser(data));
    setPreview(null);
    setSelectedPhoto(null);

  }, [dispatch, id, selectedPhoto]);
  return (
    <div>
        <h2>user page</h2>
      <Link to='/' >go to main page</Link>
      <button onClick={() => dispatch(LogOut())}>logout</button>
      <div>
      <div>
        <p>user info:</p>
        <p>name {name}</p>
        <p>email {email}</p>
       {imageURL && <div><img src={imageURL} width={200} height={200} /></div>}

      </div>
    
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
        <button disabled={!selectedPhoto} onClick={removeImage} >delete image</button>
        {selectedPhoto && (<div><h2>photo prewiew:</h2><img src={preview} width={200} height={200}/></div>)}
      </div>
      <button onClick={updateUserImage} >apply photo</button>
    </div>
  );
}

export default UserPage
