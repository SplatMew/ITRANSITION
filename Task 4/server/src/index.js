const express = require('express');
const cors = require ('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  pool = require("./database.js");

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

//Middleware to autheticate and check wether the user is active or blocked.
async function authMiddleWare(req, res, next){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({error: "Missing token."});
    let payload;
    try{
        payload = jwt.verify(token, SECRET);
    }catch{
        return res.status(401).json({error: "Invalid or expired token."});
    }

    const { rows } = await pool.query("SELECT user_id, status FROM accounts WHERE user_is=$1", [payload.id]);
    if(!rows.length || rows[0].status !== 'active')
        return res.status(403).json({error:'Account blocked or deleted.'});
    req.user = rows[0];
    next();
}

//Registration endpoint.

//Log in endpoint.

//Block users endpoint

//Get users list, sorted by las login

// Unblock users.

//Delete users.

// testing ping.

app.listen(PORT, ()=> {console.log("server on PORT", PORT)});
