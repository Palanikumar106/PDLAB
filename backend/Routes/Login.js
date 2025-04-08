const express = require("express");
const LoginController = require("../Controller/LoginController");
const app = express.Router();


app.post('/', LoginController);


module.exports=app