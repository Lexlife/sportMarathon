const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const Marathon = require("../models/marathon");
const session = require("express-session");
const Exercise = require("../models/exercise");

userRouter.get("/signup", (req, res) => {
  res.render("signup");
});

userRouter.get("/signin", (req, res) => {
  res.render("signin");
});

userRouter.get("/marathon", async (req, res) => {
  const marathons = await Marathon.find();
  // console.log(marathons);
  res.render("marathon", { marathons });
});

userRouter.get("/raiting", async (req, res) => {
  // const user = await User.find();
  const user = await User.find().sort({ points: "descending" });
  res.render("raiting", { user });
});

// ручка на страницу разминки
userRouter.get("/marathon/exercisepage/razminka", async (req, res) => {
  const exercise = await Exercise.find();
  res.render("razminka", { exercise });
});

// ручка на страницу заминки
userRouter.get("/marathon/exercisepage/zaminka", async (req, res) => {
  const exercise = await Exercise.find();
  res.render("zaminka", { exercise });
});

userRouter.get("/marathon/addpoints", async (req, res, next) => {
  await User.updateOne(
    { username: req.session.username },
    { $inc: { points: 10 } }
  );
  res.json("ok");
});

// ручка на страницу с таймером
userRouter.post("/marathon/exercisepage/razminka/:id", async (req, res) => {
  res.render("timer");
});

//добавляет купленный марафрн пользователю
userRouter.get("/marathon/:id", async (req, res, next) => {
  // console.log(">>>>>>>", req.params);
  const presents = await User.findOne({
    username: req.session.username,
    bougthMarathon: { $in: req.params.id },
  });
  const item = await Marathon.findById(req.params.id);
  // console.log(item);
  return res.render("item", { item, active: !presents });
  next();
});

//проверка есть ли этот марафон у пользователя и переход на сл ручку после этой
userRouter.post("/marathon/:id", async (req, res, next) => {
  // console.log(">>>>>>", req.params);
  const presents = await User.findOne({
    username: req.session.username,
    bougthMarathon: { $in: req.params.id },
  });
  // console.log(presents);
  if (presents) {
    res.redirect("/user/personal");
  } else {
    const person = await User.updateOne(
      { username: req.session.username },
      { $push: { bougthMarathon: req.params.id } }
    );
    // console.log("<<<<<<", person);
    res.redirect("/user/personal");
  }
});

//смотри описание выше
userRouter.get("/personal", async (req, res, next) => {
  const user = await User.findOne({ username: req.session.username }).populate(
    "bougthMarathon"
  );
  // console.log(user);
  res.render("account", { user });
});

// страница упражнений 1 марафона
userRouter.get("/marathon/exercisepage/:id", async (req, res) => {
  const item = await Marathon.findById(req.params.id);
  const exercise = await Exercise.find();
  const user = await User.findOne({ username: req.session.username });
  const user1 = await User.find().sort({ points: "descending" });
  let array = [];
  let arraypoints = [];
  user1.forEach((element) => {
    array.push(element.username);
  });
  user1.forEach((element) => {
    arraypoints.push(element.points);
  });
  let numberraiting = +array.indexOf(user.username) + 1;
  let minus;
  if (numberraiting > 1) {
    minus = arraypoints[numberraiting - 2] - arraypoints[numberraiting - 1];
  } else {
    minus = 0;
  }
  const points = user.points;
  res.render("exercisepage", { item, exercise, points, numberraiting, minus });
});

//страница решистрации
userRouter.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  const user = new User({ email, password, username, points: 0 });
  // console.log(user);
  await user.save();
  req.session.username = username; // добавляет в сессию имя юзера
  res.redirect("marathon");
});

//вход  в систему
userRouter.post("/signin", async (req, res) => {
  // получаем данные из формы
  const { username, password } = req.body;
  // console.log(username, password);
  const user = await User.findOne({ username });
  // console.log(">>>>>>>>>", user);
  if (user) {
    if (password === user.password) {
      req.session.username = username; // добавляет в сессию имя юзера
    } else {
      return res.send("incorrect pass");
    }
  } else {
    return res.send("unknown user");
  }
  // res.status(200).end();
  res.redirect("marathon");
});

//выход из системы
userRouter.get("/logout", (req, res) => {
  // res.cookie('connect.sid', 0, { Expires: 'Thu Dec 10 1970 11:47:06 GMT+0300 (Москва, стандартное время)' });
  req.session.destroy(); // удаляем сессию
  res.redirect("/");
});

module.exports = userRouter;
