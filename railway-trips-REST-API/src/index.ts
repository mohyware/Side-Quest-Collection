import express from 'express';
import path from "path";
import config from "./config";
var morgan = require('morgan')
import indexRouter from './routes/index.route';

const app = config.app;
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'))

app.use('/', indexRouter);

config.runApp();