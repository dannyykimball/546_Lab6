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
const reviews = mongoCollections.reviews;

let exportedMethods = {
  /*
  ------------------------------------------------------------------------------------
  * async create();
  ------------------------------------------------------------------------------------
  */
  async createReview(
    title,
    reviewer,
    bookBeingReviewed,
    rating,
    dateOfReview,
    review
  ) {
    if (!title) {
      throw new Error("Missing title");
    } else if (typeof title !== "string") {
      throw new Error(title + " is not DATATYPE: STRING");
    } else if (title == "" || !title.replace(/\s/g, "").length) {
      throw new Error("Input: [" + title + "] is an empty string");
    }

    if (!reviewer) {
      throw new Error("Missing reviewer");
    } else if (typeof reviewer !== "string") {
      throw new Error(reviewer + " is not DATATYPE: STRING");
    } else if (reviewer == "" || !reviewer.replace(/\s/g, "").length) {
      throw new Error("Input: [" + reviewer + "] is an empty string");
    }

    if (!bookBeingReviewed) {
      throw new Error("Missing bookBeingReviewed");
    }

    if (!rating) {
      throw new Error("Missing rating");
    } else if (typeof rating !== "number") {
      throw new Error(rating + " is not DATATYPE: NUMBER");
    }

    //datatype date
    if (!dateOfReview) {
      throw new Error("Missing dateOfReview");
    } else if (typeof dateOfReview !== "string") {
      throw new Error(dateOfReview + " is not DATATYPE: STRING");
    }

    if (!review) {
      throw new Error("Missing review");
    } else if (typeof review !== "string") {
      throw new Error(review + " is not DATATYPE: STRING");
    } else if (review == "" || !review.replace(/\s/g, "").length) {
      throw new Error("Input: [" + review + "] is an empty string");
    }

    const reviewCollection = await reviews();

    const newReview = {
      title: title,
      reviewer: reviewer,
      bookBeingReviewed: bookBeingReviewed,
      rating: rating,
      dateOfReview: dateOfReview,
      review: review,
    };

    //insert
    const newInsertInformation = await reviewCollection.insertOne(newReview);
    const newId = newInsertInformation.insertedId;

    //console log info
    return await this.read(newId);
  },

  /*
  ------------------------------------------------------------------------------------
  * async readAll(); //get all
  ------------------------------------------------------------------------------------
  */
  async readAllReviews() {
    const reviewCollection = await reviews();

    //console log all
    return await reviewCollection.find({}).toArray();
  },
  /*
  ------------------------------------------------------------------------------------
  * async read(); //get by id
  ------------------------------------------------------------------------------------
  */
  async readReview(id) {
    const reviewCollection = await reviewCollection();
    const review = await reviewCollection.findOne({ _id: id });

    if (!review) throw "Review not found";

    //for the console.log
    return review;
  },
  /*
  ------------------------------------------------------------------------------------
  * async delete();
  ------------------------------------------------------------------------------------
  */
  async deleteReview(id) {
    const reviewCollection = await reviews();

    let review = null;

    //try and select it
    try {
      review = await this.read(id);
    } catch (e) {
      console.log(e);
      return;
    }

    const deletionInfo = await reviewCollection.removeOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete review with id of ${id}`;
    }

    //await users.removePostFromUser(post.poster.id, id);

    //deletion worked
    return true;
  },
};

module.exports = exportedMethods;
