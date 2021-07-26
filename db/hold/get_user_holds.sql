SELECT h.hold_id, u.user_id, b.book_id, b.title, b.cover, b.year, b.author
    FROM holds h
    JOIN users u
        ON h.user_id = u.user_id
    JOIN books b 
        ON h.book_id = b.book_id
    WHERE u.user_id = $1
    ORDER BY b.title;