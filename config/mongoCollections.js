/*
 *  Daniel Kimball
 *  Professor Hill
 *  CS 546
 *  Lab 6
 *  20 October 2020
 *  I pledge my honor that I have abided by the Stevens Honor System.
 *
 */

const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
module.exports = {
  books: getCollectionFn("books"),
  reviews: getCollectionFn("reviews"),
};
