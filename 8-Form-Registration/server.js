// setup server
import express from 'express';
let app = express();
// .env
import dotenv from 'dotenv';
dotenv.config();
// route
import FormRoute from './route/Form.Route.js';
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json());
// frontend
app.use(express.static('./views'));

app.use("/api/v1", FormRoute);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


