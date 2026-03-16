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
export const db = client.db("IDF_TEST");