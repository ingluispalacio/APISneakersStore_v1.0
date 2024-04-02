const mongoose = require('mongoose');
const { config } = require('./config');

mongoose.connect(config.database.uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;