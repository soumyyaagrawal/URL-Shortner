const url= require('../model/url');
const shortid = require('shortid');

async function createUrl(req, res) {
    const body= req.body;
    if(!body.RedirectUrl) {
        return res.status(400).json({ error: 'RedirectUrl is required' });
    }
    const shortedid = shortid();
    await url.create({
        shortUrl: shortedid,
        RedirectUrl: body.RedirectUrl,
        log: [{
            timestamp: Date.now()
        }]
    });
    return res.status(200).json({ shortUrl: shortedid }); }

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
