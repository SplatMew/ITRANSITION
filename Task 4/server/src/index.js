const express = require('express');
const cors = require ("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    console.log(req.body);
    //res.send("Response received: ", req.body);
    res.json(req.body);
});

app.listen(PORT, ()=> {console.log("server on PORT", PORT)});
