import dotEnv from 'dotenv';
dotEnv.config();

const config = {
  endpoint: process.env.API_URL,
  database: process.env.DATABASE_URL,
  port: process.env.PORT,
  appURL: process.env.APP_BASE_URL
};

export default config;