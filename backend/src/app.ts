import multer = require('multer');
import path from "path";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import session from "express-session";
import flash from "express-flash";
import bodyParser = require('body-parser');
import express = require('express');

const MongoStore = mongo(session);
import { MONGODB_URI, SESSION_SECRET } from "./utils/secrets";

// Controllers (route handlers)
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as fileController from './controllers/file';
import { auth } from './controllers/auth';

// Create a new express application instance
const app: express.Application = express();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true} ).then(
  () => {},
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Express configuration
declare module 'express' {
  interface Request {
      body: any,
      file: any,
      payload: any
  }
}

import './models/User';
import 'passport';

app.set("port", process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
      url: MONGODB_URI,
      autoReconnect: true
  })
}));

app.use((req, res, next) => {
  next();
});

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");


/**
 * Primary APIs
 */
app.get('/', homeController.getUsages); 

/**
 * auth api
 * POST / http://localhost:3005/drive/api/signup
 * POST / http://localhost:3005/drive/api/login
 */
app.post('/drive/api/signup', userController.postSignup);
app.post('/drive/api/login', userController.postLogin);

/**
 * file api
 * POST / http://localhost:3005/drive/api/files
 * GET / http://localhost:3005/drive/api/files/fileId
 */
app.post('/upload/drive/api/files', auth.required, fileController.uploadSingleFile, fileController.uploadFile);
app.get('/drive/api/files/:fileId', fileController.getFile);

/**
 * users api
 * POST / http://localhost:3005/drive/api/users
 * GET / http://localhost:3005/drive/api/users
 */
app.post('/drive/api/users', auth.required, userController.postUsers);
app.get('/drive/api/users', auth.required, userController.getUsers);

export default app;