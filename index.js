const express = require("express");
const bodyParser = require("body-parser")
const diffAsyncFileReadRoutes = require('./controllers/diffAsyncFileRead');
const authentication = require('./controllers/authentication');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/fileRead', diffAsyncFileReadRoutes);
app.use('/auth', authentication);


app.use("/", (req, res, next) => {
  res.set({
    "Content-Type": "text/plain",
    "random-text": "I am gud in node"
  });

  next();
});

app.listen(3000);
