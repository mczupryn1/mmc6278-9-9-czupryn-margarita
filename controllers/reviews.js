const mysql = require('mysql2');
const { Review } = require("../models");

// Fetch all reviews for a specific book
async function getReviewsForBook(bookId) {
    try {
        const reviews = await Review.findAll({ where: { bookId: bookId } });
        return reviews;
    } catch (err) {
        console.error(`Error fetching reviews for book ${bookId}:`, err);
        throw err;
    }
}

// Fetch details of a single review
async function getReviewDetails(reviewId) {
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            throw new Error("Review not found");
        }
        return review;
    } catch (err) {
        console.error(`Error fetching review details for ID ${reviewId}:`, err);
        throw err;
    }
}

// Add a new review for a book
async function addReviewForBook(bookId, reviewData) {
    try {
        reviewData.bookId = bookId; // Ensuring the bookId is set in the review data
        const newReview = await Review.create(reviewData);
        return newReview;
    } catch (err) {
        console.error("Error adding new review:", err);
        throw err;
    }
}

// Edit a review
async function editReview(reviewId, updatedData) {
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            throw new Error("Review not found");
        }

        const updatedReview = await review.update(updatedData);
        return updatedReview;
    } catch (err) {
        console.error(`Error editing review with ID ${reviewId}:`, err);
        throw err;
    }
}

// Delete a review
async function deleteReview(reviewId) {
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            throw new Error("Review not found");
        }

        await review.destroy();
        return true; // Return true if the deletion was successful
    } catch (err) {
        console.error(`Error deleting review with ID ${reviewId}:`, err);
        throw err;
    }
}

module.exports = {
    getReviewsForBook,
    getReviewDetails,
    addReviewForBook,
    editReview,
    deleteReview
};
