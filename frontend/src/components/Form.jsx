import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {

  const[name, setName] = useState("");
  const[url, setUrl] = useState("");
  const[message, setMessage] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const data = {name, url};
    try {
      const response = await axios.post("http://localhost:3000/api/users/1/channels", data);
      setMessage(response.data.message)
    } catch (error) {
      console.error(error.message);
      setMessage(error.message);
    } 
    setName(" ");
    setUrl(" ");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" value={name} onChange={(e)=> setName(e.target.value)} required/>
        <label htmlFor="url">Url:</label>
        <input type="text" name="url" id="url" value={url} onChange={(e)=> setUrl(e.target.value)} required/>
        <button type="submit">Add</button>
      </form>
      {message && <p>{message} </p>}
    </div>
  )
}

export default Form;
