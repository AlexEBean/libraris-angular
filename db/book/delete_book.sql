DELETE FROM holds
WHERE book_id = $1;

DELETE FROM books
WHERE book_id = $1;

SELECT * FROM books
ORDER BY title;