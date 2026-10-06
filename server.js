const express = require('express');

const app = express();
const db = require('./config/db');
const validateUser = require('./middleware/validationMiddleware');
const helmet = require('helmet');

const rateLimiter = require('./middleware/rateLimiter');

const cors = require('cors');

app.use(cors());

app.use(rateLimiter);
app.use(helmet());
app.use(exxpress.json());
app.get('/users',validateUser, async (req,res)=>{
  const result = await db.query('select * from users');

  res.json(result.rows);
})

app.listen(3000, ()=>{
  console.log('server running on port 3000');
})