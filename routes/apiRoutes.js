const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

// Book related routes
router.get("/books", controllers.books.getAllBooks); // Fetch all books
router.get("/books/search", controllers.books.searchBookController); // Search books
router.post("/books/add", controllers.books.addBook);
router.get("/books/:bookId", controllers.books.getBookDetails); // Fetch specific book details
router.put("/books/:bookId", controllers.books.editBook); // Update specific book details
router.delete("/books/:bookId", controllers.books.deleteBook); // Delete specific book

// Review related routes
router.get("/books/:bookId/reviews", controllers.reviews.getReviewsForBook); // Fetch all reviews for a specific book
router.post("/books/:bookId/reviews", controllers.reviews.addReviewForBook); // Add a new review for a specific book
router.get("/books/:bookId/reviews/:reviewId", controllers.reviews.getReviewDetails); // Fetch details for a specific review
router.put("/books/:bookId/reviews/:reviewId", controllers.reviews.editReview); // Update a specific review
router.delete("/books/:bookId/reviews/:reviewId", controllers.reviews.deleteReview); // Delete a specific review

module.exports = router;

