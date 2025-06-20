const express = require('express');
const app = express();
const urlroute= require('./routes/url');
const userroute = require('./routes/user');
const {connectDB} = require('./connect');
const url = require('./model/url');
const path = require('path');
const home = require('./routes/home');
const cookieParser = require('cookie-parser');
const { loggedInUserOnly, checkauth } = require('./middleware/auth');
port = 3000;

//connecting to database
connectDB().then(() => {
  console.log("Connected to database");
}).catch((err) => {
  console.error("Error connecting to database", err);
});

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.set("views", path.resolve('./view'));



//routes
app.use("/url", loggedInUserOnly, urlroute);

// app.use("/", urlroute); //home page route


app.use("/",checkauth, home);
app.use("/user", userroute); //user route


// app.get("/test", async(req, res) => 
  // {
//   let allurl = await url.find({});
//   return res.render("allURLs", { url: allurl });
// });



app.get("/:shortedid", async(req, res) => {
    try {
        const shortedid = req.params.shortedid;
        const entry = await url.findOneAndUpdate(
            {shortUrl: shortedid}, // Find the document by shortUrl
            { $push: { log: { timestamp: Date.now(), },},  }, {new: true} // Update the log with the current timestamp      
             // Ensures the updated document is returned
        );

        if (!entry) {
            return res.status(404).send("Shortened URL not found");
        }

        if (!entry.RedirectUrl) {
            return res.status(400).send("Redirect URL is missing in the database entry");
        }

        res.redirect(entry.RedirectUrl);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send("Internal Server Error");
    }
    });
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("http://localhost:3000")  
});