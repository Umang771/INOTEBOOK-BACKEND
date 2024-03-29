const express = require('express')
const ConnectToMongo = require('./db');

var cors = require('cors')
const app = express()
// var app = express()

app.use(cors())
ConnectToMongo();

const port = 5000

app.use(express.json())

app.use('/auth', require('./routes/auth'))   //end point for authentication like user login or user creation etc
app.use('/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`INoteBook Backend listening on port ${port}`)
})