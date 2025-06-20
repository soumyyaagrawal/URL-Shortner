const express = require('express');
const router = express.Router();
const { createUrl, getAnalytics,createsuggestedUrl } = require('../controller/url');
const { getMaxListeners } = require('../model/url');
const url = require('../model/url');
const User= require('../model/user');

        
        router.post("/create",createUrl);
        router.post("/create/suggested", createsuggestedUrl);

        router.get("/analytics/:shortUrl",getAnalytics );
        router.get("/", async(req, res) => {
            const allurl = await url.find({createdBy: req.user.id}); 
            // console.log(req.cookies.sessionId)
            //   const createdBy= req.cookies.sessionId;
            res.render("home", {  uid: allurl, userid: req.cookies.sessionId});
        });
router.get("/signup", (req, res) => {
    res.render("signup");
});

        module.exports = router;