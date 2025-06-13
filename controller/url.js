const url= require('../model/url');
const shortid = require('shortid');

async function createUrl(req, res) {
    const body= req.body;
    if(!body.RedirectUrl) {
        return res.status(400).json({ error: 'RedirectUrl is required' });
    }
    const shortedid = shortid();
    console.log("req.user:", req.user);
    await url.create({
        shortUrl: shortedid,
        RedirectUrl: body.RedirectUrl,
        createdBy: req.user.id, // Assuming req.user is set by the auth middleware
        log: [{
            timestamp: Date.now()
        }]
    }); console.log(req.user);
    const allurl = await url.find({createdBy: req.user.id});
    
    return res.status(200).render("home", {id: shortedid, uid: allurl, RedirectUrl: body.RedirectUrl,
     });
}

async function getAnalytics(req, res) {
    const shortedid = req.params.shortUrl;
    const result = await url.findOne({ shortUrl: shortedid });
    return res.status(200).json({
        totalclicks: result.log.length,
        analytics: result.log,}); 
    }

    module.exports = {
        createUrl, getAnalytics,
    };
