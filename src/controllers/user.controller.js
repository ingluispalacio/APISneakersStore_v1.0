const UserService = require('../services/User.service');
const service = new UserService();
const { encrypt } = require('../helpers/encrypt.helper');

const create = async ( req, res ) => {
    try { 
        const { name, email, password} = req.body;
        if ( !name || !email || !password ) {
           return res.status(400).send({ success: false, message: "name, email, password attributes are required" }); 
        }
        const passwordEncrypt= await encrypt(req.body.password);
        req.body.password= passwordEncrypt;
        const response = await service.create(req.body);
        const responseData = { ...response.toObject() };
        delete responseData.password;
        res.json({ success: true, message: 'Successful creation', data: responseData});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const get = async ( req, res ) => {
    try {
        const response = await service.find();
        res.json({ success: true, data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findById(id);
        res.json({ success: true, data: response});
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode=500;
        }
        res.status(error.statusCode).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id,body);
        res.json({ success: true, message: 'Successful update', data: response});
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode=500;
        }
        res.status(error.statusCode).send({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params; 
        await service.delete(id);
        res.json({ success: true, message: 'Successful removal'});
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode=500;
        }
        res.status(error.statusCode).send({ success: false, message: error.message });
    }
}

module.exports = {
    create, get, getById, update, _delete
};
