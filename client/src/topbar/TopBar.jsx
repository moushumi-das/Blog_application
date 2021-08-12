import "./topbar.css"
export default function TopBar() {
    return (
        <div className="top">
            <div className="topLeft">
            <i className="topIcon fab fa-facebook-square"></i>
            <i className="topIcon fab fa-twitter-square"></i>
            <i className="topIcon fab fa-pinterest-square"></i>
            <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topList">
                <ul className="topListItem">HOME</ul>
                <ul className="topListItem">ABOUT</ul>
                <ul className="topListItem">CONTACT</ul>
                <ul className="topListItem">WRITE</ul>
                <ul className="topListItem">LOGOUT</ul>
            </div>
            <div className="topRight">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <i className=" topSearchIcon fas fa-search"></i>

            </div>
        </div>
    )
}
