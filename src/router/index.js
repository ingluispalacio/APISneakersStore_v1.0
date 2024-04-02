const express = require('express'); 

const productRoute = require('./routes/product.routes');
const promotionRoute = require('./routes/promotion.routes');
const userRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');
const { verifyToken } = require('../middlewares/auth.middleware');
const { routeNotFound } = require('../middlewares/route.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

const routerApi= (app)=>{
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', verifyToken, productRoute);
  router.use('/promotion', verifyToken, promotionRoute);
  router.use('/user', verifyToken, userRoute);
  router.use('/auth', authRoute);
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(routeNotFound);
}

module.exports = routerApi;