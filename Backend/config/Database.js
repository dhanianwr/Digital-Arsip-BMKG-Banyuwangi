import { Sequelize } from "sequelize";

const db = new Sequelize('bmkg_arsip','root','',{
    host: "localhost",
    dialect: "mysql",
    logging: false
});

export default db;