require('dotenv').config()
const express = require("express");
const Marathon = require("./routes/marathons");
const userRouter = require("./routes/user");
const marathonsRouter = require("./routes/marathons");
const path = require("path");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const mongoose = require("mongoose");
const User = require("./models/user");
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const indexRouter = require('./routes/index');
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.createConnection(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.id = req.session._id;
  // console.log(req.session);
  next();
});

app.get("/", (req, res) => {
  // обращается к сайту каждые 29 минут
  const https = require("https");
  setTimeout(() => {
  https.get("https://sportmarathon.herokuapp.com");
}, 1000*60*29); // every 29 minutes
  res.render("mainpage");
});

app.use("/user", userRouter);
app.use("/marathon", marathonsRouter);


app.listen(process.env.PORT, () => {
  console.log(`Express servev started on port ${process.env.PORT}!`)
});
