import "./sidebar.css"
import axios from "axios";
import {useEffect,useState} from "react";

export default function SideBar() {
  const [categories,setCategories] =useState([]);
  useEffect(()=>{
    const getCategories= async()=>{
      const res= await axios.get("category")
      setCategories(res.data);
    };
    getCategories()

  },[])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                 <span className="sidebarTitle">ABOUT ME</span>
                 <img
                   src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
                   alt=""
                 />
                 <p>
                  Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                  amet ex esse.Sunt eu ut nostrud id quis proident.
                 </p>
              </div>
              <div className="sidebarItem">
                 <span className="sidebarTitle">CATEGORIES</span>
                 <ul className="sidebarList">
                   {categories.map((category)=>( 
                      <li key={category._id} className="sidebarListItem">{category.name}</li>))}
  
                  </ul>
              </div>
              <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                  <i className="sidebarIcon fab fa-facebook-square"></i>
                  <i className="sidebarIcon fab fa-instagram-square"></i>
                  <i className="sidebarIcon fab fa-pinterest-square"></i>
                  <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
             </div> 
        </div>
    )
}
