const ProductService = require('../services/Product.service');
const service = new ProductService();
const UserService = require('../services/User.service');
const serviceUser = new UserService();
const PromotionService = require('../services/Promotion.service');
const servicePromotion = new PromotionService();

const create = async ( req, res ) => {
    try { 
        const { name, brand, price, stock  }=req.body
        if ( !name || !brand || !price || !stock ) {
            return res.status(400).send({ success: false, message: "name, brand, price, stock attributes are required" }); 
         }

        const product = await service.findOne({ name });

        if (!product) {
          return res.status(400).json({ message: 'There is already a product with that name' });
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

const getspecialPrice = async ( req, res ) => {
    try {
        const { userId, name } = req.params;
    
        const user = await serviceUser.findById(userId);
        
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontradThe user must exist to be able to consult the spatial price' });
        }
    
        const product = await service.findOne({ name: name });
    
        if (!product) {
          return res.status(404).json({ message: 'The product must exist to be able to consult the spatial price' });
        }
    
        const promotion = await servicePromotion.findOne({ userId:userId, productName:name });
 
        const precioFinal = promotion ? promotion.specialPrice : product.price;
    
        res.json({success: true, data: { precio: precioFinal } });
      } catch (error) {
        res.status(500).json({ message: error.message });
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
    create, get, getspecialPrice, getById, update, _delete
};
