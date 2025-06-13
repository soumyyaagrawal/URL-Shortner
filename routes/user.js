const express = require('express');
const router = express.Router();
const { signup, login, getAllUsers } = require('../controller/user');


 router.post("/signup", signup);
 router.post("/login", login);

 router.get("/", async (req, res) => 
    { return res.render("signup"); });

router.get("/login", async (req, res) =>
    { return res.render("login"); });

router.get("/signup", async (req, res) =>
    { return res.render("signup"); });



        module.exports = router;
