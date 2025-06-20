const url= require('../model/url');
// const shortid = require('shortid');

async function createUrl(req, res) {
    const body= req.body;
    if(!body.RedirectUrl || !body.desiredUrl) {
        return res.status(400).json({ error: 'both fields are required' });
    }
    // const shortedid = shortid();
    // console.log("req.user:", req.user);

    const { RedirectUrl, desiredUrl } = req.body;
    const isTaken = await checkIfAliasExists(desiredUrl); // DB check

  if (!isTaken) {
    await saveUrl(RedirectUrl, desiredUrl, req.user.id); // Save in DB
    const allurl = await url.find({createdBy: req.user.id}); uid: allurl

    return res.status(200).render("home", {msg: 'Alias available',id: body.desiredUrl, uid: allurl, RedirectUrl: body.RedirectUrl,
     });

  } else {
    const allurl = await url.find({createdBy: req.user.id}); 
    
     const suggestions = await generateSuggestions(desiredUrl);
    return res.status(200).render("home", { msg: 'Alias already taken', id: suggestions, RedirectUrl: body.RedirectUrl,  uid: allurl });

  }
}

async function createsuggestedUrl(req, res) {
    const body = req.body;
    

    const { RedirectUrl, desiredUrl } = body;
   

    const final= body.final; // Get the final alias from the form submission
    await saveUrl(RedirectUrl, final, req.user.id); // Save in DB

    const allurl = await url.find({createdBy: req.user.id});
    return res.status(200).render("home", {id:body.final, uid: allurl, RedirectUrl: body.RedirectUrl });

    
}








  async function checkIfAliasExists(alias) {
  // Check DB for alias
  const entry = await url.findOne({ shortUrl: alias });
  return !!entry;
}

async function saveUrl(originalUrl, alias, userId) {
  if (!originalUrl || !alias) {
    throw new Error("Missing required fields");
  }

   await url.create({
        shortUrl: alias,
        RedirectUrl: originalUrl,
        createdBy: userId, // Assuming req.user is set by the auth middleware
        log: [{
            timestamp: Date.now()
        }]
    }); console.log(userId);
}

async function saveUrl(originalUrl, alias, userId) {
  if (!originalUrl || !alias) {
    throw new Error("Missing required fields");
  }

   await url.create({
        shortUrl: alias,
        RedirectUrl: originalUrl,
        createdBy: userId, // Assuming req.user is set by the auth middleware
        log: [{
            timestamp: Date.now()
        }]
    }); console.log(userId);
}

async function generateSuggestions(desiredUrl, count = 5) {
  const suggestions = [];
  let i = 1;

  while (suggestions.length < count) {
    const suggestion = `${desiredUrl}${i}`;
    const taken = await checkIfAliasExists(suggestion);
    if (!taken) suggestions.push(suggestion);
    i++;
  }

  return suggestions;
}








    

async function getAnalytics(req, res) {
    const shortedid = req.params.shortUrl;
    const result = await url.findOne({ shortUrl: shortedid });
    return res.status(200).json({
        totalclicks: result.log.length,
        analytics: result.log,}); 
    }

    module.exports = {
        createUrl, getAnalytics, createsuggestedUrl
    };
