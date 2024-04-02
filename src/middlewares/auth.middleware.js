const jwt = require('jsonwebtoken');
const  { configAuth } = require('../config/config');

const verifyToken=(req, res, next) =>{

  if (!req.header('Authorization')) {
    return res.status(401).json({ success: false, message: 'Access denied. Token not provided.' });
  }
  const token = req.header('Authorization').split(' ')[1];
  try {
    const decoded = jwt.verify(token, configAuth.secret); 
    req.user = decoded.user[0];
    next();
  } catch (error) {
    return res.status(401).json({success: false,  message: 'Invalid token.' });
  }
}


module.exports={
  verifyToken
};