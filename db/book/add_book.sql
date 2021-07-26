INSERT INTO books
(cover, title, year, author)
VALUES
($1, $2, $3, $4)
RETURNING *;