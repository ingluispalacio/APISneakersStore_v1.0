const PromotionModel = require('../models/Promotion');

class PromotionService { 
  
    constructor() {}

    async find(where={}) {
      const res = await PromotionModel.find(where);
      return res;
    }

    async findById(id) {
      const res = await PromotionModel.findById(id);
      return res;
    }
    
    async findOne(where={}) {
      const res = await PromotionModel.findOne(where);
      return res;
    }

    async create(data) {
      const res = await PromotionModel.create(data);;
      return res;
    }

    async update(id, data) {
      const res = await PromotionModel.findByIdAndUpdate(id, data, {new:true});
      if (!res) {
        const error = new Error('Problems updating Promotion');
        error.statusCode = 404; 
        throw error;
      }
      return res;
    }

    async delete(id) {
      const res = await PromotionModel.findByIdAndDelete(id);
      if (!res) {
        const error = new Error('Problems deleting Promotion');
        error.statusCode = 404; 
        throw error;
      }
      return res;
    }
  
  }
  
  module.exports = PromotionService;