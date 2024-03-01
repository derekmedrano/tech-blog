const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('../config/connection');

class user extends Model { 
    checkPassword(loginPw) {
        return
    }
}

