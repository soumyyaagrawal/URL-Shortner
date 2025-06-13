 const express = require('express');
 const router = express.Router();
 const url = require('../model/url');
 const User= require('../model/user');

 router.get("/", async (req, res) => {
    if (!req.user) {
        return res.render("login");
    }
    const allUrls = await url.find({createdBy: req.user.id});
    const cookievalue= req.cookies.sessionId;
    res.render("home", { uid: allUrls,  userid: cookievalue  });
});

        module.exports = router;
