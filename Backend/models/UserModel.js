import { Sequelize } from "sequelize";
import db from '../config/Database.js'

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name: {
        type: DataTypes.STRING
    },
    nip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [18, 18]
        }
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
})

export default Users;