USE mysql_project_db;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE books (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  google_books_id VARCHAR(255), -- This stores the ID from Google Books, if used.
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  thumbnail TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  book_id INT NOT NULL,
  reviewer_name VARCHAR(100) NOT NULL, -- Name of the person writing the review.
  text TEXT NOT NULL,
  rating INT CHECK(rating >= 1 AND rating <= 5), -- Assuming a rating scale of 1-5
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

