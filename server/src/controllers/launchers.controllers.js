import {ObjectId} from 'mongodb'
import { db } from "../DB/db.js";

export const getAllLaunchers = async (req,res) => {
   try {
     const allLaunchers = await db.collection("launchers").find().toArray();
     res.send(allLaunchers);
   } catch (error) {
       return  res.status(500).json({messeage:error});
   }
};

export const getALauncher = async (req,res) => {
   try {
     const Launcher = await db.collection("launchers").findOne({_id:new ObjectId(req.path)}).toArray();
     res.send(Launcher);
   } catch (error) {
       return  res.status(500).json({messeage:error});
   }
};

export const addALauncher = async (req,res) => {
    const {city,rocketType,latitude,longitude,name} =req.body;
    if (!latitude.isInteger() || !longitude.isInteger()){
        res.status(400).json({msg:"the coordinates must be a number"});
    }
    const launcher ={
         city,
         rocketType,
         latitude:Number(latitude),
         longitude:Number(longitude),
         name
    };
   try {
     const addLauncherToDB = await db.collection("launchers").insertOne(launcher);
     res.send(addLauncherToDB);
   } catch (error) {
       return  res.status(500).json({messeage:error});
   }
};

export const deleteALauncher = async (req,res) => {
   try {
     const deleteLauncher = await db.collection("launchers").deleteOne({_id:new ObjectId(req.params)});
     res.send(deleteLauncher);
   } catch (error) {
       return  res.status(500).json({messeage:error});
   }
};



