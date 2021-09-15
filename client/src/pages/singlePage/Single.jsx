import "./single.css"
import Sidebar from "../../components/sidebar/SideBar"
import SinglePost from "../../components/SinglePost/SinglePost"
export default function Single() {
    console.log("single called");
    return (
        <div className="single">
            <SinglePost/>
            <Sidebar/>
        </div>
    )
}
