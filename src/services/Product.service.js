const ProductModel = require('../models/Product');

class ProductService { 
  
    constructor() {}

    async find(where={}) {
      const res = await ProductModel.find(where);
      return res;
    }

    async findById(id) {
      const res = await ProductModel.findById(id);
      return res;
    }

    
    async findOne(where={}) {
        const res = await ProductModel.findOne(where);
        return res;
    }


    async create(data) {
      const res = await ProductModel.create(data);;
      return res;
    }

    async update(id, data) {
      const res = await ProductModel.findByIdAndUpdate(id, data, {new:true});
      if (!res) {
        const error = new Error('Problems updating product');
        error.statusCode = 404; 
        throw error;
      }
      return res;
    }

    async delete(id) {
      const res = await ProductModel.findByIdAndDelete(id);
      if (!res) {
        const error = new Error('Problems deleting product');
        error.statusCode = 404; 
        throw error;
      }
      return res;
    }
  
  }
  
  module.exports = ProductService;