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
const reviewData = data.reviews;

//get by book id
router.get("/", async (req, res) => {
  try {
    const reviewList = await reviewData.readAllReviews();
    res.json(reviewList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//post
router.post("/:id", async (req, res) => {
  const detailedReviewData = req.body;
  //title
  if (!detailedReviewData.title) {
    res.status(400).json({ error: "You must provide detailed review title" });
    return;
  }
  //reviewer
  if (!detailedReviewData.reviewer) {
    res
      .status(400)
      .json({ error: "You must provide detailed review reviewer" });
    return;
  }
  //bookBeingReviewed
  if (!detailedReviewData.bookBeingReviewed) {
    res
      .status(400)
      .json({ error: "You must provide detailed review bookBeingReviewed" });
    return;
  }
  //rating
  if (!detailedReviewData.rating) {
    res.status(400).json({ error: "You must provide detailed review rating" });
    return;
  }
  //dateOfReview
  if (!detailedReviewData.dateOfReview) {
    res
      .status(400)
      .json({ error: "You must provide detailed review dateOfReview" });
    return;
  }
  //review
  if (!detailedReviewData.review) {
    res.status(400).json({ error: "You must provide detailed review review" });
    return;
  }

  try {
    const newReview = await reviewData.createReview(
      detailedReviewData.title,
      detailedReviewData.reviewer,
      detailedReviewData.bookBeingReviewed,
      detailedReviewData.rating,
      detailedReviewData.dateOfReview,
      detailedReviewData.review
    );
    res.json(newReview);
  } catch (e) {
    res.sendStatus(500);
  }
});

//get by book id then review id
router.get("/:id/:id", async (req, res) => {
  try {
    let review = await reviewData.readReview(req.params.id);
    res.json(review);
  } catch (e) {
    res.status(404).json({ error: "Review not found" });
  }
});

//delete by book id/review id
router.delete("/:id/:id", async (req, res) => {
  if (!req.params.id) throw "You must specify an ID to delete";
  //get it
  try {
    await reviewData.readReview(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  //delete it
  try {
    await reviewData.deleteReview(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
