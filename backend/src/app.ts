import multer = require('multer');
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
import * as uploadController from './controllers/file';

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
      file: any
  }
}

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


/**
 * Primary APIs
 */
app.get('/', homeController.getUsages); 

app.post('/signup', userController.postSignup);
app.post('/login', userController.postLogin);

app.get('/files/:id', uploadController.getFile);
app.get('/files', uploadController.getFiles);
app.post('/upload/file', uploadController.uploadSingleFile, uploadController.uploadFile);
app.post('/upload/files', uploadController.uploadMultiFiles, uploadController.uploadFiles);

export default app;