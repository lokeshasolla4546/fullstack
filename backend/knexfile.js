// knexfile.js
const knex = require('knex');
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'asolla',      // replace with your Postgres username
      password: '1234', // replace with your Postgres password
      database: 'batman'
    },
    migrations: {
      directory: './migrations'
    }
  },
  debug: true,

};

