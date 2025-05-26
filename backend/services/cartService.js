const db = require('../config/db'); // db instance


exports.add = async (user_id, productId) => {
  const product = await db('products').where({ id: productId }).first(); 

  if (!product) throw new Error('Product not found');

  const existing = await db('carts')
    .where({ user_id, product_id: productId })
    .first();

  if (existing) {
    await db('carts')
      .where({ user_id, product_id: productId })
      .update({
        quantity: existing.quantity +1
      });
  } else {
    await db('carts').insert({
      user_id,
      product_id: productId,
      quantity: 1,
      price: product.price,
      image: product.image
    });
  } return { message: 'product added to cart' };
};


exports.get = async (user_id) => {
  // Join with product details
  const cartItems = await db('carts')
    .join('products', 'carts.product_id', 'products.id')
    .select(
      'products.id as product_id',
      'products.name',
      'products.image as image',       
      'carts.quantity',
      'carts.price'
    )
    .where('carts.user_id', user_id);

  return cartItems;
};

exports.update = async (user_id, productId, quantity) => {
  // Check if item exists in cart
  const existingItem = await db('carts')
    .where({ user_id, product_id: productId })
    .first();

  if (!existingItem) return { error: 'Item not found in cart' };

  // Update quantity
  await db('carts')
    .where({ user_id, product_id: productId })
    .update({ quantity });

  return { message: 'Cart updated' };
};
