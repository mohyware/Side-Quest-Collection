import express from 'express';
import config from "./config";
import morgan from 'morgan';
import player from './routes/player';
import team from './routes/team';

const app = config.app;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'))

app.use('/player', player);
app.use('/team', team);

config.runApp();