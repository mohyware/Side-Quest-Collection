// setup server
var express = require('express');
var app = express();
const path=require('path')
// .env
require('dotenv').config();
// db
const connectDB = require('./db/connect');
// route
var noteRoute = require('./route/noteRoute');
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json());
// frontend
app.use(express.static('./public'));

app.use("/api/v1" , noteRoute);

const port = process.env.PORT || 8080;

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();


