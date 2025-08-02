import { HOST_PORT, SECRET_KEY} from './config.js';
const express = require('express');
const cors = require ('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  pool = require("./database.js");


const PORT = HOST_PORT;

const SECRET = SECRET_KEY;

const app = express();
app.use(express.json());
app.use(cors());

//Middleware to autheticate and check wether the user is active or blocked.
async function authMiddleWare(req, res, next){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({error: "Missing token."});
    let payload;
    try{
        payload = jwt.verify(token, SECRET_KEY);
    }catch{
        return res.status(401).json({error: "Invalid or expired token."});
    }

    const { rows } = await pool.query("SELECT user_id, status FROM accounts WHERE user_id=$1", [payload.id]);
    if(!rows.length || rows[0].status !== 'active')
        return res.status(403).json({error:'Account blocked or deleted.'});
    req.user = rows[0];
    next();
}

//Registration endpoint.

app.post('/api/register', async (req, res)=>{
    const {name, email, password} = req.body;
    
    if(!email || !password || !name)
        return res.status(400).json({error:"All fields are required."});

    try{
        const hash = await bcrypt.hash(password,10);
        await pool.query(
            "INSERT INTO accounts (name, email, password_hash) VALUES ($1, $2, $3)", 
            [name, email.toLowerCase(), hash]
        );

        res.json({success:true});

    }catch(err){
        if(err.code === '23505')
            return res.status(400).json({error:"This e-mail already exists."});

        res.status(500).json({error: "Server error."});
    }
});

//Log in endpoint.

app.post('/api/login', async (req, res) => {
    const{email, password} = req.body;
    const {rows} = await pool.query(
        "SELECT user_id, password_hash, status FROM accounts WHERE email=$1",
        [email.toLowerCase()]
    );

    if(!rows.length || rows[0].status === 'deleted')
        return res.status(400).json({error:"Invalid credentials."});

    if(rows[0].status === 'blocked')
        return res.status(400).json({error:"This account is blocked."});

    const valid = await bcrypt.compare(password, rows[0].password_hash);
    
    if(!valid)
        return res.status(400).json({error:"Invalid credentials."});

    await pool.query("UPDATE accounts SET last_login_at=now() WHERE user_id=$1",
        [rows[0].user_id]
    );

    const token = jwt.sign({ id: rows[0].user_id }, SECRET, { expiresIn: '12h' });
    res.json({token});    
});

app.use('/api/users', authMiddleWare);


//Get users list, sorted by las login
app.get('/api/users', async(req, res) =>{
    const {rows} = await pool.query(`
        SELECT user_id, name, email, last_login_at, status
        FROM accounts
        ORDER BY last_login_at DESC NULLS LAST, created_at DESC
        `);
        res.json(rows);
});

//Block users endpoint

app.post('/api/users/block', async(req, res) => {
    await pool.query(
        "UPDATE accounts SET status='blocked' WHERE user_id = ANY($1::int[0]) AND status != 'deleted'",
        [req.body.ids]
    );
    res.json({success: true});
})

// Unblock users.
app.post('/api/users/unblock', async(req, res) => {
    await pool.query(
        "UPDATE accounts SET status='active' WHERE user_id = ANY($1::int[0]) AND status != 'deleted'",
        [req.body.ids]
    );
    res.json({success:true});
});

//Delete users.
app.post('/api/users/delete', async(req, res) => {
    await pool.query(
        "UPDATE accounts SET status='deleted' WHERE user_id = ANY($1::int[])",
        [req.body.ids]
        );
    res.json({success:true});
});

// testing ping.
app.get('/api/ping', (req, res) => {
    res.json({status:"ok"});
});

app.listen(PORT, ()=> {
    console.log("server on PORT", PORT);
});
