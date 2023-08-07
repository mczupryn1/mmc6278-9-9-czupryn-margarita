const db = require("../config/connection");

async function findAll() {
    const [books] = await db.query(`SELECT * FROM books`);
    return books;
}

async function findReviewsByBookId(bookId) {
    const [reviews] = await db.query(`SELECT * FROM reviews WHERE book_id=?`, bookId);
    return reviews;
}

async function findById(bookId) {
    const [[book]] = await db.query(
        `SELECT * FROM books WHERE id=?`,
        bookId
    );
    return book;
}

async function create(bookData) {
    const { title, author, description, thumbnail, isbn } = bookData;
    await db.query(`INSERT INTO books (title, author, description, thumbnail, isbn) VALUES (?, ?, ?, ?, ?)`, [
        title, author, description, thumbnail, isbn
    ]);
    
    // Return the book details based on the last inserted ID
    return findById(/* lastInsertedIdHere */);
}

async function update(bookId, updatedData) {
    const { title, author, description, thumbnail, isbn } = updatedData;
    await db.query(
        `UPDATE books SET title=?, author=?, description=?, thumbnail=?, isbn=? WHERE id=?`, 
        [title, author, description, thumbnail, isbn, bookId]
    );
    
    return findById(bookId);
}

async function destroy(bookId) {
    await db.query(`DELETE FROM books WHERE id=?`, bookId);
}

module.exports = {
    findAll,
    findReviewsByBookId,
    findById,
    create,
    update,
    destroy
};
