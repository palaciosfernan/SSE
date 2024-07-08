import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const connection =mysql.createPool( {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    waitForConnections: true,
    connectionLimit: 100,
    port: parseInt(process.env.DATABASE_PORT ?? "3306"),
});

export default connection;
