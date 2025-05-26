exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('user_id').unique().notNullable();
    table.string('password').notNullable();
    table.string('role').notNullable();
  });

  await knex.schema.createTable('products', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('price').notNullable();
  });

  await knex.schema.createTable('carts', table => {
    table.increments('id').primary();
    table.string('user_id').notNullable();
    table.integer('product_id').unsigned().notNullable();
    table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
    table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
  });

  await knex.schema.createTable('orders', table => {
    table.increments('id').primary();
    table.string('user_id').notNullable();
    table.json('items').notNullable();
    table.integer('total').notNullable();
    table.string('payment_status').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
  });

};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('order_items');
  await knex.schema.dropTableIfExists('orders');
  await knex.schema.dropTableIfExists('carts');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('users');
};
