const express = require('express');
const app = express();
const urlroute= require('./routes/url');
const {connectDB} = require('./connect');
const url = require('./model/url');
port = 3000;

//connecting to database
connectDB().then(() => {
  console.log("Connected to database");
}).catch((err) => {
  console.error("Error connecting to database", err);
});

app.use(express.json());

//routes
app.use("/url",urlroute);
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