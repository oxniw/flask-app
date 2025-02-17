import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Signin from "./signin";
import Friendlist from "./friendlist";
import Friendlistreal from "./friendlistreal";
import Seefirendisreal from "./seefirendisreal"
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/friendlist" element={<Friendlist />} />
        <Route path="/friendlistreal" element={<Friendlistreal />} />
        <Route path="/seefirendisreal" element={<Seefirendisreal />} />
      </Routes>
    </Router>
  );
}

export default App;