CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR (20),
    last_name VARCHAR (30),
    email VARCHAR(60) UNIQUE,
    password TEXT,
    profile_pic VARCHAR(3000),
    admin BOOLEAN
);

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    cover VARCHAR(3000),
    title VARCHAR(200),
    year INT,
    author VARCHAR(200)
);

CREATE TABLE holds(
    hold_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    book_id INT REFERENCES books(book_id)
);

CREATE TABLE views(
    view_count INT,
    page VARCHAR(100)
);

INSERT INTO views (view_count, page)
    VALUES (0, 'Home')
    RETURNING *;
INSERT INTO views (view_count, page)
    VALUES (0, 'Register')
    RETURNING *;
INSERT INTO views (view_count, page)
    VALUES (0, 'Login')
    RETURNING *;
INSERT INTO views (view_count, page)
    VALUES (0, 'Catalog')
    RETURNING *;
