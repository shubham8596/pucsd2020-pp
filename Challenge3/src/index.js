const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const user_detail = require('./user_detail');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'resapi_rw',
  password : 'rE$T@p!2020',
  database : 'restapi'
});

connection.connect();

const port = process.env.PORT || 4200;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(user_detail(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});