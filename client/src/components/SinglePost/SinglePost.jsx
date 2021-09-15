import "./SinglePost.css"
import { useLocation } from "react-router";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Context } from "../../context/Context";

axios.defaults.baseURL = '/api/'


export default function SinglePost() {
  const location = useLocation()
  const path = (location.pathname.split("/")[2]);

  const [blogPost, setBlogPost] = useState({})
  const PF = "http://localhost:3000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getBlogPost = async () => {
      const response = await axios.get('blogposts/' + path)
      console.log(response)
      setBlogPost(response.data)
      setTitle(response.data.title)
      setDescription(response.data.description)
    }
    getBlogPost()
  }, [path])

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/blogposts/${blogPost._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/")
    } catch (error) {

    }
  };
  const handleUpdatePost = async () => {
    try {
      await axios.put(`/blogposts/${blogPost._id}`, {
        
          username: user.username,
          title,
          description,

        
      });
      setUpdateMode(false)

    } catch (error) {

    }
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {blogPost.photo && (<img
          className="singlePostImg"
          src={PF + blogPost.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {blogPost.username === user?.username && (<div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
              <i className="singlePostIcon far fa-trash-alt" onClick={handleDeletePost}></i>
            </div>)}

          </h1>)}
        <div className="singlePostInfo">
          <span>
            Author:
              <Link to={`/?user=${blogPost.username}`} className="link">
              <b className="singlePostAuthor">
                {blogPost.username}
              </b>
            </Link>
          </span>
          <span>
            Category:
              <Link to={`/?category=${blogPost.categories}`} className="link">
              <b className="singlePostAuthor">
                {blogPost.categories}
              </b>
            </Link>
          </span>
          <span>   {new Date(blogPost.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{description}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdatePost}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
