import "./profileSetting.css"
import Sidebar from "../../components/sidebar/SideBar"
import { userInfo } from "os"
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Context } from "../../context/Context";

export default function ProfileSetting() {

    const [file, setFile] = useState(null);
    const { user, dispatch } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [update, setUpdate] = useState(false);
    const PF = "http://localhost:3000/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "PROFILE_UPDATE_START" });

        const updatedUser = {
          userId: user._id,
          username,
          email,
          password,
        };
        if (file) {
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          updatedUser.profilePic = filename;
          try {
            await axios.post("/upload", data);
          } catch (err) {}
        }
        try {
          const res = await axios.put("/user/" + user._id, updatedUser);
          setUpdate(true);
          dispatch({ type: "PROFILE_UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
          dispatch({ type: "PROFILE_UPDATE_FAILURE" });
        }
      };
    return (
        <div className="profileSetting">
            <div className="profileSettingWrapper">
                <div className="profileTitle">
                    <span className="TitleUpdate">Update</span>
                    <span className="TitleDelete">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file) : PF +  user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}

                            className="settingsPPInput"
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} name="username" onChange={(e) => setUsername(e.target.value)}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email} name="email" onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password"  onChange={(e) => setPassword(e.target.value)} />
                    <button className="settingsSubmitButton" type="submit">
                        Update
                    </button>
                    {update && (
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                             Profile has been updated successfully ...
                        </span>
                     )}
                </form>
            </div>

            <Sidebar />
        </div>
    )
}
