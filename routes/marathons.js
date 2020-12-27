const express = require("express");
const router = express.Router();

//сделать две ручки гет марафон и гет марафон / : название вида спорта
// в тайтл передавать из рег парамс название вида спорта /post/:name

router.get("/skiing", function (req, res) {
  res.render("skiing", { title: "skiing" });
});

router.get("/skiings/warmup", function (req, res) {
  res.render("skiings/warmup", { title: "warmup" });
});

router.get("/skiings/hitch", function (req, res) {
  res.render("skiings/hitch", { title: "hitch" });
});

router.get("/skiings/carving1", function (req, res) {
  res.render("skiings/carving1", { title: "carving1" });
});

router.get("/skiings/carving2", function (req, res) {
  res.render("skiings/carving2", { title: "carving2" });
});

router.get("/skiings/carving3", function (req, res) {
  res.render("skiings/carving3", { title: "carving3" });
});

router.get("/snowboard", function (req, res) {
  res.render("snowboard", { title: "snowboard" });
});

router.get("/surfing", function (req, res) {
  res.render("surfing", { title: "surfing" });
});

router.get("/MTV", function (req, res) {
  res.render("MTV", { title: "MTV" });
});

router.get("/skateboard", function (req, res) {
  res.render("skateboard", { title: "skateboard" });
});

router.get("/wakeboard", function (req, res) {
  res.render("wakeboard", { title: "wakeboard" });
});

router.get("/BMX", function (req, res) {
  res.render("BMX", { title: "BMX" });
});

router.get("/kayak", function (req, res) {
  res.render("kayak", { title: "kayak" });
});

router.get("/scooter", function (req, res) {
  res.render("scooter", { title: "scooter" });
});

module.exports = router;
