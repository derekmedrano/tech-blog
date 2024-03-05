const router = require("express").Router();
const { Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");