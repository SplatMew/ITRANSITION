
import { DB_PASSWORD, DB_USER, DB_PORT } from "./config.js";
import pkg from 'pg';

const {Pool} = pkg;


const pool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: "localhost",
    port: DB_PORT, 
    database: "task_4",
});

/*const createTablQry = `
    CREATE TABLE accounts(
        user_id SERIAL PRIMARY KEY,
        name VARCHAR ( 100 ) NOT NULL,
        email VARCHAR ( 255 ) NOT NULL,
        password_hash VARCHAR ( 255 ) NOT NULL,
        status VARCHAR(10) NOT NULL DEFAULT 'active',
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        last_login_at TIMESTAMP
    );`;

const createUniqueEmailIdx = `
    CREATE UNIQUE INDEX IF NOT EXISTS accounts_email_unique_idx ON accounts(email);
    `;

const createTimeIndex = `
    CREATE INDEX IF NOT EXISTS accounts_lastlogin_idx ON accounts (last_login_at)
    `;

    (async() => {
        try{
            await pool.query(createTablQry);
            await pool.query(createUniqueEmailIdx);
            await pool.query(createTimeIndex);
            console.log("Table and unique index ready!");
        }catch(err){
            console.error(err);
        }
    })();*/

export default pool;