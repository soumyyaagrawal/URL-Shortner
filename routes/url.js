const express = require('express');
const router = express.Router();
const { createUrl, getAnalytics, } = require('../controller/url');
const { getMaxListeners } = require('../model/url');

        
        router.post("/",createUrl);

        router.get("/analytics/:shortUrl",getAnalytics );

        module.exports = router;