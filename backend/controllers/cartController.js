const service = require('../services/cartService');
const knex = require('../config/knex'); 

exports.addToCart = async (req, res) => {
  try {
    // const user_id = req.headers['user_id'];
    // const productId = req.body.productId;

    // console.log('Incoming addToCart:', { user_id, productId });

    // if (!user_id || !productId) {
    //   return res.status(400).json({ error: 'Missing user_id or productId' });
    // }

    // await cartService.add(user_id, productId);

    // res.json({ success: true });

    const result = await service.add(req.user.user_id, req.body.productId);
    if(result.error) return res.status(404).json(result);
      res.json(result); 
  } catch (err) {
    console.error('Error in addToCart:', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};



exports.viewCart = async (req, res) => {
  try {
    const cart = await service.get(req.user.user_id);
    res.json({ cart });
  } catch (err) {
    console.error('Error in viewCart:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};


exports.deleteCartItemById = async (req, res) => {
    const productId=req.params.productId;
    const user_id=req.user.user_id;

    try {
        const deleted = await knex('carts').where({ product_id : productId , user_id}).del();

        console.log('Deleted rows:', deleted);

        if (deleted) {
            res.status(200).json({ message: 'Cart item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete cart item' });
    }
};
