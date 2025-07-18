import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./auth/signup/Signup";
import Login from "./auth/login/Login";
import Landing from "./pages/landing/Landing";
import User from "./pages/getUser/User";
import AddUser from "./pages/addUser/AddUser";
import UpdateUser from "./pages/UpdateUser/Update";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing/>} />
        <Route path="/workspace" element={<User/>}/>
        <Route path="/add" element={<AddUser/>}/>
        <Route path="/update/:id" element={<UpdateUser/>}/>


        

      </Routes>
    </BrowserRouter>
  );
}

export default App;