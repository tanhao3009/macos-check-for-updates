import dotenv from 'dotenv';
import fs from 'fs';

if(fs.existsSync('.env')) {
  dotenv.config({path: '.env'});
} else {
  dotenv.config({path: '.env.example'});
}

export const prod = process.env.NODE_ENV === 'production';
export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];
export const EMAIL_SENDER = process.env["EMAIL_SENDER"];
export const EMAIL_SENDER_PASSWORD = process.env["EMAIL_SENDER_PASSWORD"];