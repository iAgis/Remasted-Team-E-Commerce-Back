const express = require("express");
const publicRouter = express.Router();
const { testDB } = require("../models");

publicRouter.get("/public", (req, res) => res.json("Hola C:"));
publicRouter.get("/db", async (req, res) => {
  const resTest = await testDB();
  res.json(resTest);
});

module.exports = publicRouter;
