const express = require('express');
require("dotenv").config();
const db = require('./config/db');
const validateUser = require('./middleware/validationMiddleware');
const helmet = require('helmet');

const rateLimiter = require('./middleware/rateLimiter');

const cors = require('cors');

const app = express();
app.set('trust proxy',1);



app.use(cors());

app.use(rateLimiter);
app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/health', (req,res)=> res.json({status: 'ok'}));
app.get('/users',validateUser, async (req,res)=>{
  const result = await db.query('select * from users');

  res.json(result.rows);
})

app.listen(PORT, ()=>{
  console.log('server running on port 3000');
})