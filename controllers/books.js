const { Book } = require("../models");

// Fetch all books
async function getAllBooks() {
    try {
        const books = await Book.findAll();
        return books;
    } catch (err) {
        console.error("Error fetching all books:", err);
        throw err;
    }
}

// Fetch details of a single book by its ID
async function getBookDetails(bookId) {
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        return book;
    } catch (err) {
        console.error(`Error fetching book details for ID ${bookId}:`, err);
        throw err;
    }
}

// Add a new book
async function addBook(bookData) {
    try {
        const newBook = await Book.create(bookData);
        return newBook;
    } catch (err) {
        console.error("Error adding new book:", err);
        throw err;
    }
}

// Edit details of a book
async function editBook(bookId, updatedData) {
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }

        const updatedBook = await book.update(updatedData);
        return updatedBook;
    } catch (err) {
        console.error(`Error editing book with ID ${bookId}:`, err);
        throw err;
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
    getBookDetails,
    addBook,
    editBook,
    deleteBook
};
