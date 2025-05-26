const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const authenticate = require('../middleware/authenticate');

// Public access
router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);

//  Admin-only
router.post('/', authenticate, controller.addProduct);
router.put('/:id', authenticate, controller.updateProduct);
router.delete('/:id', authenticate, controller.deleteProduct);

module.exports = router;
