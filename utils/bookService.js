const axios = require('axios');
const BookReview = require('../models/review'); 

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Extract the API key from the environment variable

async function getBookById(bookId) {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.SESSION_SECRET}`);
        
        const book = {
            title: response.data.volumeInfo.title,
            author: response.data.volumeInfo.authors[0], 
            thumbnail: response.data.volumeInfo.imageLinks.thumbnail,
            description: response.data.volumeInfo.description,
            id: response.data.id
        };

        return book;
    } catch (error) {
        console.error('Error fetching book details from Google Books API:', error);
        return null;
    }
}

function searchBooks(query) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${GOOGLE_API_KEY}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data from Google Books API:', error);
            throw error;
        });
}

module.exports = {
    searchBooks // Exporting the function
};




