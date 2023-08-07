const router = require("express").Router();
const controllers = require("../controllers");
const booksController = require('../controllers/books');

// Home route
router.get("/", (req, res) => {
  res.render("index");
});
router.get('/:bookId', booksController.getBookDetails);

// Book details route
router.get("/books/details/:id", async (req, res) => {
  // Extract book ID from the route and fetch its details, then render
  const bookId = req.params.id;
  const bookDetails = await controllers.getBookDetails(bookId);
  res.render("book-detail", { book: bookDetails });
});

// Add book route
router.get("/books/add", (req, res) => {
  res.render("book-form");
});

// Edit book route
router.get("/books/edit/:id", async (req, res) => {
  const bookId = req.params.id;
  const bookDetails = await controllers.getBookDetails(bookId);
  res.render("book-form", { book: bookDetails });
});

// Add review route
router.get("/reviews/add/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  res.render("review-form", { bookId: bookId });
});

// Edit review route
router.get("/reviews/edit/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  const reviewDetails = await controllers.getReviewDetails(reviewId);
  res.render("review-form", { review: reviewDetails });
});

// Recommendation page
router.get("/recommendation", (req, res) => {
  res.render("recommendation");
});

module.exports = router;

