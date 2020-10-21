/*
 *  Daniel Kimball
 *  Professor Hill
 *  CS 546
 *  Lab 6
 *  20 October 2020
 *  I pledge my honor that I have abided by the Stevens Honor System.
 *
 */

const bookRoutes = require("./books.js");
const reviewRoutes = require("./reviews.js");

const constructorMethod = (app) => {
  app.use("/books", bookRoutes);
  app.use("/reviews", reviewRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
