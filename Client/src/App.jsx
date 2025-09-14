import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup.jsx";
import Login from "./pages/auth/login/Login.jsx"
import Landing from "./pages/landing/Landing.jsx";
 import User from "./pages/getUser/User";
import AddUser from "./pages/addUser/AddUser";
import Home from "./pages/home/Home.jsx";
import UpdateUser from "./pages/UpdateUser/Update";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Connection from "./pages/connection/Connection.jsx";
import CreateConnection from "./pages/createConnection/CreateConnection.jsx";
import SfSuccess from "./pages/SfSucess/SfSuccess.jsx";
import SalesforceObjects from "./pages/objects/SalesforceObjects.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/workspace" element={<User />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddUser />} /> */
        <Route path="/update/:id" element={<UpdateUser />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/objects" element={<SalesforceObjects />} />
  
  <Route path="/connection" element={<Connection />} />
  <Route path="/add-connection" element={<CreateConnection />} />
  <Route path="/sf-success" element={<SfSuccess />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
