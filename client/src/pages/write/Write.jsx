import "./write.css"
import {useEffect,useState,useContext} from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [categories,setCategories]=useState("")
  const [username,setUsername]=useState("")
  const [file,setFile]= useState(null)
  const { user } = useContext(Context);


  const handleSubmit=async (e)=>{
    e.preventDefault();
    const newPost={
      username:user.username,
      title,
      description,
      categories,
    };

    if(file) {
      const data=new FormData()
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/blogposts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
    return (
        <div className="writePost">
         {file && (
             <img
             className="writePostImg"
             src={URL.createObjectURL(file)}
             alt=""/>
         )}
              <form className="postForm" onSubmit={handleSubmit}>
        <div className="writePostFormGroup">
         
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" 
          style={{ display: "none" }} onChange={(e)=>{setFile(e.target.files[0])}} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div className="writePostFormGroup">
          <textarea
            className="writeInput"
            placeholder="Category"
            type="text"
            autoFocus={true}
            onChange={(e)=>setCategories(e.target.value)}
          />
        </div>
        <div className="writePostFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </div>
       
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
        </div>
    )
}
