import * as dotenv from 'dotenv';
dotenv.config();
export const environment = {
  production: true,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  host: process.env.BACKEND_HOST,
};
