const PromotionService = require('../services/Promotion.service');
const service = new PromotionService();

const create = async ( req, res ) => {
    try { 
        const { userId, productName, specialPrice} = req.body;
        if (!userId || !productName || !specialPrice) {
           return res.status(400).send({ success: false, message: "userId, productName, specialPrice attributes are required" }); 
        }
        const response = await service.create(req.body);
        res.json({ success: true, message: 'Successful creation', data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const get = async ( req, res ) => {
    try {
        const response = await service.find({ stock: { $gt: 0 } });
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
