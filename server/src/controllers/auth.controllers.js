import {ObjectId} from 'mongodb'
import { db } from "../DB/db.js";
import jwt from "jsonwebtoken";
export const getAllUsers = async (req,res) => {
   try {
     const allUsers = await db.collection("users").find().toArray();
     res.send(allUsers);
   } catch (error) {
       return  res.status(500).json({messeage:error});
   }
};
export const addUser = async (req,res) => {
    const {username,password,email,user_type} =req.body;
    const existed = await db.collection("users").findOne(user_type);
    if (existed){
        return res.status(409).json({message:"you can't assign 2 of the same role"})
    }
    const newUser={
         username,
         password,
         email,
         user_type,
         last_login:null
    };
   try {
     const addUser= await db.collection("users").insertOne(newUser);
     res.send(addUser);
   } catch (error) {
    console.error(error)
       return  res.status(500).json({messeage:error});
   }
};

export const editUser = async (req,res) => {
    const {id,username,password,email,user_type} = req.body
    try {
     const editUser= await db.collection("users").updateOne({_id:new ObjectId(id),$set:{username,password,email,user_type}});
     res.send(editUser);
   } catch (error) {
       return  res.status(500).json({messeage:error});
   }
};



export const deleteUser = async (req,res) => {
   try {
     const deleteUser = await db.collection("users").deleteOne({_id:new ObjectId(req.params.id)});
     res.send(deleteUser);
   } catch (error) {
       return  res.status(500).json({messeage:error});
   }
};
export const getMe = async (req,res) =>{
    res.send({user:req.user})
}
export const login = async (req,res) => {
    const {username,password} = req.body
    const valid = await db.collection("users").findOne({username,password})
    if(!valid){
        return res.status(400).json({message:"no user found"})
    }
    const token = jwt.sign({id:valid._id,user_type:valid.user_type},process.env.SECRET_KEY)
    try {
        await db.collection("users").updateOne({_id:new ObjectId(id),$set:{last_login:new Date()}});
        res.send({token,user:valid})
   } catch (error) {
       return  res.status(500).json({messeage:error});
   } 

}