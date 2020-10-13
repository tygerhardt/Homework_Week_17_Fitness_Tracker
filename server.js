const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/workout", { useNewUrlParser: true, useFindAndModify: false });
// cors origin URL - Allow inbound traffic from origin
//corsOptions = {
  //origin: "Your FrontEnd Website URL",
 // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//};
//app.use(cors(corsOptions));

const db = require("./models");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});