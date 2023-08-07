const mysql = require('mysql2');
const { Book } = require("../models");
const { searchBooks, getBookById } = require('../utils/bookService');
const Review = require('../models/review'); // Assuming you have a Review model
const { findById, findReviewsByBookId } = require('../models/book');


// Fetch all books
async function getAllBooks(req, res) {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (err) {
        console.error("Error fetching all books:", err);
        res.status(500).json({ message: "Error fetching books." });
    }
}

async function searchBookController(req, res) {
    const query = req.query.q;  
    const books = await searchBooks(query);
    if (books) {
        res.json(books);
    } else {
        res.status(500).json({ message: "Error fetching books." });
    }
}


async function getBookDetails(req, res) {
    try {
        const bookId = req.params.bookId;
        const book = await findById(bookId);
        const reviews = await findReviewsByBookId(bookId);

        res.render("book-detail", { 
            book: book,
            reviews: reviews
        });
    } catch (err) {
        console.error("Error fetching book details for ID " + bookId, err);
        res.status(500).send("Error fetching book details");
    }
}


async function addBook(req, res) {
    try {
        const bookData = req.body; // Get the book data from the request body
        const newBook = await Book.create(bookData);

        // Redirect to the book-detail page for the newly created book
        res.redirect(`/books/${newBook.id}`);
    } catch (err) {
        console.error("Error adding new book:", err);
        res.status(500).send('Error adding new book.');
    }
}

async function editBook(req, res) {
    try {
        const bookId = req.params.bookId;
        const updatedData = req.body;
        
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }

        await book.update(updatedData);

        // Redirect to the book-detail page after editing
        res.redirect(`/books/${bookId}`);
    } catch (err) {
        console.error(`Error editing book with ID ${bookId}:`, err);
        res.status(500).send('Error editing book.');
    }
}

// Delete a book
async function deleteBook(bookId) {
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }

        await book.destroy();
        return true; // Return true if the deletion was successful
    } catch (err) {
        console.error(`Error deleting book with ID ${bookId}:`, err);
        throw err;
    }
}

module.exports = {
    getAllBooks,
    searchBookController,  // Don't forget to export this
    getBookDetails,
    addBook,
    editBook,
    deleteBook
};

