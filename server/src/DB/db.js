import {MongoClient} from "mongodb";

const client = new MongoClient(process.env.MONGO);
client.connect();
export const db = client.db("launchers data");