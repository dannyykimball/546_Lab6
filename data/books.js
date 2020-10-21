/*
 *  Daniel Kimball
 *  Professor Hill
 *  CS 546
 *  Lab 6
 *  20 October 2020
 *  I pledge my honor that I have abided by the Stevens Honor System.
 *
 */

const mongoCollections = require("../config/mongoCollections");
const books = mongoCollections.books;

const exportedMethods = {
  /*
  ------------------------------------------------------------------------------------
  * async createBook();
  ------------------------------------------------------------------------------------
  */
  async createBook(title, author, genre, datePublished, summary, reviews) {
    if (!title) {
      throw new Error("Missing title");
    } else if (typeof title !== "string") {
      throw new Error(title + " is not DATATYPE: STRING");
    } else if (title == "" || !title.replace(/\s/g, "").length) {
      throw new Error("Input: [" + title + "] is an empty string");
    }

    if (!author) {
      throw new Error("Missing author");
    } else if (typeof author !== "string") {
      throw new Error(author + " is not DATATYPE: STRING");
    } else if (author == "" || !author.replace(/\s/g, "").length) {
      throw new Error("Input: [" + author + "] is an empty string");
    }

    if (!genre) {
      throw new Error("Missing genre");
    } else if (!Array.isArray(genre)) {
      throw new Error("Genre is not DATATYPE: ARRAY");
    } else if (genre.length < 1) {
      throw new Error("Input: [" + genre + "] is an empty string");
    }

    //date field
    if (!datePublished) {
      throw new Error("Missing datePublished");
    } else if (typeof datePublished !== "string") {
      throw new Error(datePublished + " is not DATATYPE: STRING");
    } else if (
      datePublished == "" ||
      !datePublished.replace(/\s/g, "").length
    ) {
      throw new Error("Input: [" + datePublished + "] is an empty string");
    }

    if (!summary) {
      throw new Error("Missing summary");
    } else if (typeof summary !== "string") {
      throw new Error(summary + " is not DATATYPE: STRING");
    } else if (summary == "" || !summary.replace(/\s/g, "").length) {
      throw new Error("Input: [" + summary + "] is an empty string");
    }

    if (!Array.isArray(reviews)) {
      reviews = [];
    }

    const bookCollection = await books();

    const newBook = {
      title: title,
      author: author,
      genre: genre,
      datePublished: datePublished,
      summary: summary,
      reviews: reviews,
    };

    //insert
    const newInsertInformation = await bookCollection.insertOne(newBook);
    const newId = newInsertInformation.insertedId;

    //console log info
    return await this.read(newId);
  },

  /*
  ------------------------------------------------------------------------------------
  * async readAll(); //get all
  ------------------------------------------------------------------------------------
  */
  async readAllBooks() {
    const bookCollection = await books();

    //console log all
    return await bookCollection.find({}).toArray();
  },
  /*
  ------------------------------------------------------------------------------------
  * async read(); //get by id
  ------------------------------------------------------------------------------------
  */
  async readBook(id) {
    const bookCollection = await bookCollection();
    const book = await bookCollection.findOne({ _id: id });

    if (!book) throw "Book not found";

    //for the console.log
    return book;
  },
  /*
  ------------------------------------------------------------------------------------
  * async update();
  ------------------------------------------------------------------------------------
  */
  async updateBook(id, updatedBook) {
    const bookCollection = await books();

    const updatedBookData = {};

    //checked title
    if (updatedBook.title) {
      updatedBookData.title = updatedBook.title;
    }
    //checked author
    if (updatedBook.author) {
      updatedBookData.author = updatedBook.author;
    }
    //checked genre
    if (updatedBook.genre) {
      updatedBookData.genre = updatedBook.genre;
    }
    //checked datePublished
    if (updatedBook.datePublished) {
      updatedBookData.datePublished = updatedBook.datePublished;
    }
    //checked summary
    if (updatedBook.summary) {
      updatedBookData.summary = updatedBook.summary;
    }
    //checked reviews
    if (updatedBook.reviews) {
      updatedBookData.reviews = updatedBook.reviews;
    }

    await bookCollection.updateOne({ _id: id }, { $set: updatedBookData });

    //console log this
    return await this.read(id);
  },
  /*
  ------------------------------------------------------------------------------------
  * async delete();
  ------------------------------------------------------------------------------------
  */
  async deleteBook(id) {
    const bookCollection = await books();

    let book = null;

    //try and select it
    try {
      book = await this.read(id);
    } catch (e) {
      console.log(e);
      return;
    }

    const deletionInfo = await bookCollection.removeOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete book with id of ${id}`;
    }

    //await users.removePostFromUser(post.poster.id, id);

    //deletion worked
    return true;
  },
};

module.exports = exportedMethods;
