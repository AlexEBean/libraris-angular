SELECT 
    CASE WHEN EXISTS (
        SELECT *
        FROM holds
        WHERE user_id = $1 AND book_id = $2
    )
    THEN 'TRUE'
    ELSE 'FALSE'
END;