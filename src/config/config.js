require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/',
  }
}

const configAuth = {
  secret: process.env.AUTH_SECRET || 'secret',
  expires: process.env.AUTH_EXPIRES || '1h',
  rounds:  process.env.AUTH_ROUNDS || 10
}



module.exports = { config, configAuth};