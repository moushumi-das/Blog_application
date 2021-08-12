import "./home.css"
import Header from "../../header/Header"
import SideBar from "../../sidebar/SideBar"
import Posts from "../../posts/Posts"
export default function Home() {
    return (
        <>
          <Header/>
          <div className="home">homepage
           <Posts/>
           <SideBar/>
          </div>
        </>
    );
}
