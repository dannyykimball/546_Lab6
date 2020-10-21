/*
 *  Daniel Kimball
 *  Professor Hill
 *  CS 546
 *  Lab 6
 *  20 October 2020
 *  I pledge my honor that I have abided by the Stevens Honor System.
 *
 */

const express = require("express");
const router = express.Router();
const data = require("../data");
const bookData = data.books;

//get all
router.get("/", async (req, res) => {
  try {
    const bookList = await bookData.readAllBooks();
    res.json(bookList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//post
router.post("/", async (req, res) => {
  const detailedBookData = req.body;
  //title
  if (!detailedBookData.title) {
    res.status(400).json({ error: "You must provide detailed book title" });
    return;
  }
  //author
  if (!detailedBookData.author) {
    res.status(400).json({ error: "You must provide detailed book author" });
    return;
  }
  //genre
  if (!detailedBookData.genre) {
    res.status(400).json({ error: "You must provide detailed book genre" });
    return;
  }
  //dataPublished
  if (!detailedBookData.dataPublished) {
    res
      .status(400)
      .json({ error: "You must provide detailed book dataPublished" });
    return;
  }
  //summary
  if (!detailedBookData.summary) {
    res.status(400).json({ error: "You must provide detailed book summary" });
    return;
  }
  //reviews
  if (!detailedBookData.reviews) {
    res.status(400).json({ error: "You must provide detailed book reviews" });
    return;
  }

  //post it
  try {
    const {
      title,
      author,
      genre,
      datePublished,
      summary,
      reviews,
    } = detailedBookData;
    const newBook = await bookData.createBook(
      title,
      author,
      genre,
      datePublished,
      summary,
      reviews
    );
    res.json(newBook);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//get by id
router.get("/:id", async (req, res) => {
  try {
    const book = await bookData.readBook(req.params.id);
    res.json(book);
  } catch (e) {
    res.status(404).json({ error: "Book not found" });
  }
});

router.put("/:id", async (req, res) => {
  const updatedData = req.body;
  if (
    !updatedData.title ||
    !updatedData.author ||
    !updatedData.genre ||
    !updatedData.datePublished ||
    !updatedData.summary ||
    !updatedData.reviews
  ) {
    res.status(400).json({ error: "You must Supply All fields" });
    return;
  }

  //get it
  try {
    await bookData.readBook(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  //put it
  try {
    const updatedBook = await bookData.updateBook(req.params.id, updatedData);
    res.json(updatedBook);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch("/:id", async (req, res) => {
  const requestBody = req.body;
  let updatedObject = {};

  //try
  try {
    const oldBook = await bookData.readBook(req.params.id);
    //title
    if (requestBody.title && requestBody.title !== oldBook.title) {
      updatedObject.title = requestBody.title;
    }

    //author
    if (requestBody.author && requestBody.author !== oldBook.author) {
      updatedObject.author = requestBody.author;
    }
    //genre
    if (requestBody.genre && requestBody.genre !== oldBook.genre) {
      updatedObject.genre = requestBody.genre;
    }
    //datePublished
    if (
      requestBody.datePublished &&
      requestBody.datePublished !== oldBook.datePublished
    ) {
      updatedObject.datePublished = requestBody.datePublished;
    }
    //summary
    if (requestBody.summary && requestBody.summary !== oldBook.summary) {
      updatedObject.summary = requestBody.summary;
    }
    //reviews
    if (requestBody.reviews && requestBody.reviews !== oldBook.reviews) {
      updatedObject.reviews = requestBody.reviews;
    }
  } catch (e) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  //nothing changed
  if (Object.keys(updatedObject).length !== 0) {
    try {
      const updatedBook = await bookdata.updateBook(
        req.params.id,
        updatedObject
      );
      res.json(updatedBook);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.status(400).json({
      error:
        "No fields have been changed from their inital values, so no update has occurred",
    });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    //grammar lol, it used to say "and ID"
    res.status(400).json({ error: "You must Supply an ID to delete" });
    return;
  }
  //get it
  try {
    await bookData.readBook(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  //delete it
  try {
    await bookData.deleteBook(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
