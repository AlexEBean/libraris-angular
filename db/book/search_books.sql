SELECT *
FROM books
WHERE LOWER(title) LIKE ('%' || LOWER($1) || '%') OR
    LOWER(author) LIKE ('%' || LOWER($1) || '%')
ORDER BY title ASC;