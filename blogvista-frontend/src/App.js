import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";

import Signup from "./pages/Signup";
import UserDasboard from "./pages/UserDasboard";
import Blog from "./pages/Blog";

import Logout from "./pages/Logout";
import CreateBlog from "./pages/CreateBlog";
import PrivateRoute from "./PrivateRoute/PrivateRoute.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/addblog" element={<CreateBlog />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<UserDasboard />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
