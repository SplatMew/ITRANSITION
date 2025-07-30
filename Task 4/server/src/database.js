const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "AnTo0301!",
    host: "localhost",
    port: 5432, // Use 5432 unless you configured it to be 8080!
    database: "postgres", // Connect to the default database
});

pool
    .query(`CREATE DATABASE TASK_4`)
    .then((response) => {
        console.log("Database created");
        console.log(response); // This will show the query result
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = pool;