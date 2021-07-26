SELECT h.hold_id, u.user_id, b.book_id, u.first_name, u.last_name,  b.title, b.cover, b.year, b.author
    FROM holds h
    JOIN users u
        ON h.user_id = u.user_id
    JOIN books b 
        ON h.book_id = b.book_id
    ORDER BY u.last_name;