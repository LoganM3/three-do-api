import jwt from 'jsonwebtoken'
import dbConnect from "./src/dbConnect.js";
import { secretKey } from "./credentials.js";

export async function createUser(req,res){
    const {email, password} = req.body;
    const db = dbConnect()
    const user = db.collection('users').add({email,password})
    .catch(err => res.status(500).send(err))
    //now we create a token
    const token = jwt.sign({email, id: user.id},secretKey)
    res.send({token})
}