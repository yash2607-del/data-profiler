import express from "express";

import { create, Deleteuser, getAllUsers, update, userbyID } from "../controllers/userController.js";


const route = express.Router();
route.post("/user",create);
route.get("/users",getAllUsers);
route.get("/user/:id",userbyID);
route.put("/update/user/:id",update);
route.delete("/delete/user/:id",Deleteuser);




export default route;