const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const database = require('./config/database');



dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

const routerApi = require('./router')

app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.send('API Sneakers Store v1.0');
});

routerApi(app);

app.listen(port,()=>{
    console.log("Port ==> ", port);
});