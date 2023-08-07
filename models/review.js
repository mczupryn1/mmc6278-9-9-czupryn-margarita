const db = require("../config/connection");

async function findAllForBook(bookId) {
    const [reviews] = await db.query(`SELECT * FROM reviews WHERE book_id=?`, bookId);
    return reviews;
}

async function findById(reviewId) {
    const [[review]] = await db.query(
        `SELECT * FROM reviews WHERE id=?`,
        reviewId
    );
    return review;
}

async function create(bookId, reviewData) {
    const { reviewer, rating, text } = reviewData;
    await db.query(`INSERT INTO reviews (book_id, reviewer, rating, text) VALUES (?, ?, ?, ?)`, [
        bookId, reviewer, rating, text
    ]);
    
    return findById(/* lastInsertedIdHere */);
}

async function update(reviewId, updatedData) {
    const { reviewer, rating, text } = updatedData;
    await db.query(
        `UPDATE reviews SET reviewer=?, rating=?, text=? WHERE id=?`, 
        [reviewer, rating, text, reviewId]
    );
    
    return findById(reviewId);
}

async function destroy(reviewId) {
    await db.query(`DELETE FROM reviews WHERE id=?`, reviewId);
}

module.exports = {
    findAllForBook,
    findById,
    create,
    update,
    destroy
};
