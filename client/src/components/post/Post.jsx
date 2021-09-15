import "./post.css"
import { Link } from "react-router-dom";

export default function Post({post}) {
  const PF = "http://localhost:3000/images/";
  return (
    <div className="post">
      { post.photo && (
              <img 
              className="postImg" 
              src={PF+post.photo}
               alt="" 
               />

      )}

      <div className="postDetails">
        <div className="postCategories">
          {post.categories.map((category, index)=>(
          <span key={index} className="postCategory">
              {category}</span>

          ))}
           
          
        </div>
       
          <Link to={`blogpost/${post._id}`} className="link">
          <span className="postTitle"> {post.title}</span>

          </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDescription">
       {post.description}
      </p>
    </div>
  )
}
