const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const user = new userModel;
const adminModel = require('../models/adminModel');
const admin = new adminModel;
const jwt = require("jsonwebtoken");
const barnardosModel = require('../models/barnardosModel');
const newLocation = new barnardosModel;

