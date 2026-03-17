import {MongoClient} from "mongodb";
import {config} from 'dotenv'
config()
const client = new MongoClient(process.env.MONGO);
try {
    await client.connect();
    console.log("DB connect")
} catch (err) {
    console.error(err)
}
Dbinit = async ()=>{
    const admin = await client.db("IDF_TEST").collection("users").findOne({user_type:"admin"})
    if(!admin){
        const newAdmin = {
            username:"Avraham",
            password:"123!qwr",
            email:"abcd@gmail.com",
            user_type:"admin",
            last_login:null
        }
        const initAdmin = await client.db("IDF_TEST").collection("users").insertOne(newAdmin)
        if(initAdmin){
            console.log("admin created sucssefully");
        }
    }
}
export const db = client.db("IDF_TEST");