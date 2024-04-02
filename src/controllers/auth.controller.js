const UserService = require('../services/User.service');
const service = new UserService();
const { generateToken, expires } = require('../helpers/token.helper');
const { currentDateTime, calculateExpirationDate } = require('../helpers/operations.herlper');
const { compare } = require('bcryptjs');


const login = async ( req, res ) => {
    try {
        const { email, password } = req.body;
        const user = await service.findByEmail( email );

        if (!user) {
            res.status(404).send({ success: false, message: "Incorrect Credentials. Check your email" })
        } 
       
        if (typeof user === 'object' && user !== null) {
            const verificarPasword=await compare( password, user.password);
            if (!verificarPasword) {
                res.status(401).send({ success: false, message: "Incorrect Credentials. Check your password" });
            }else{
                const token= generateToken( user.id );
                res.json({ success: true, message: 'Successful login', token:token, fecha_creacion: currentDateTime, expira: calculateExpirationDate(expires), user: {name:user.name, email:user.email} });
            }
        } else {
            res.status(401).json({ success: false, message: 'Incorrect Credentials. Check your email and password' });
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode=500;
        }
        res.status(error.statusCode).send({ success: false, message: error.message });
    }
}

module.exports = {
    login
};