const { getSession } = require('../Service/auth');
async function loggedInUserOnly(req, res, next) {
    const usersessionid = req.cookies.sessionId;
    if (!usersessionid) {

        req.user = null;
        // return next();
        return res.status(401).render("login", { error: 'You must be logged in to access this page' });

    }
    // const token = usersessionid.split("Bearer ")[1];
    const user = getSession(usersessionid);
    if (!user) {
        return res.status(401).render("login", { error: 'You must be logged in to access this page' });
    }
    req.user = user; // Attach the user to the request object
    next();
}

async function checkauth(req, res, next) {
    const usersessionid = req.cookies.sessionId;
if (!usersessionid) {

        req.user = null;
        return next();
}
    // const token = usersessionid.split("Bearer ")[1];
   const user = getSession(usersessionid);
   req.user = user;
   next();

}



module.exports = {
    loggedInUserOnly,
    checkauth
};