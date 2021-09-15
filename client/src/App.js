import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/singlePage/Single";
import Write from "./pages/write/Write";
import ProfileSetting from "./pages/profileSetting/profileSetting";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import {useContext} from "react";
import {Context} from "./context/Context"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const {user} =  useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/blogposts">
          <Home />
        </Route>
        <Route path="/register">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/blogpost/:id">
          <Single />
        </Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>
        <Route path="/settings">
          {user ? <ProfileSetting /> : <Login />}
        </Route>
      </Switch>
    </Router>
  )
}
export default App;
