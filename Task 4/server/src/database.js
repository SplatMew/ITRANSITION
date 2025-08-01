const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "AnTo0301!",
    host: "localhost",
    port: 5432, 
    database: "task_4",
});


module.exports = pool;