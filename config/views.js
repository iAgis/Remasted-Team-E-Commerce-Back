const express = require("express");
const path = require("path");

module.exports = (app) => {
  app.use(express.json());
  app.use("/images", express.static(path.join(__dirname, "../images")));
};
