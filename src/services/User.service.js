const UserModel = require('../models/User');

class UserService { 
  
    constructor() {}

    async find(where={}) {
      const res = await UserModel.find(where).select('-password');
      return res;
    }

    async findById(id) {
      const res = await UserModel.findById(id).select('-password');
      return res;
    }


    async create(data) {
      const res = await UserModel.create(data);
      return res;
    }

    async update(id, data) {
      const res = await UserModel.findByIdAndUpdate(id, data, {new:true}).select('-password');
      if (!res) {
        const error = new Error('Problems updating user');
        error.statusCode = 404; 
        throw error;
      }
      return res;
    }

    async delete(id) {
      const res = await UserModel.findByIdAndDelete(id);
      if (!res) {
        const error = new Error('Problems deleting user');
        error.statusCode = 404; 
        throw error;
      }
      return res;
    }
    
    
    async findOne(where={}) {
      const res = await UserModel.findOne(where);
      return res;
    }

    async findByEmail(email) {
      const res = await UserModel.findOne({email});
      if (!res) {
        const error = new Error('user not found');
        error.statusCode = 404; 
        throw error;
      }
      return res;
    }
  
  }
  
  module.exports = UserService;