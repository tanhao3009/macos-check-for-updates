import dotenv from "dotenv";
import multer = require('multer');
import bodyParser = require('body-parser');

// lib/index.ts
import express = require('express');

// Controllers (route handlers)
import * as homeController from './controllers/HomeController';
import * as uploadController from './controllers/UploadController';

// Create a new express application instance
const app: express.Application = express();

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Express configuration
declare module 'express' {
  interface Request {
      body: any, // Actually should be something like `multer.Body`
      file: any // Actually should be something like `multer.Files`
  }
}

app.set("port", process.env.PORT || 3001);
app.use(bodyParser.urlencoded({extended: true}))

/**
 * Primary APIs
 */
app.get('/', homeController.getUsages); 
app.get('/files/:id', uploadController.getFile);
app.get('/files', uploadController.getFiles);
app.post('/upload/file', uploadController.uploadSingleFile, uploadController.uploadFile);
app.post('/upload/files', uploadController.uploadMultiFiles, uploadController.uploadFiles);

export default app;