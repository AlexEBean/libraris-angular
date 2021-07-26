DELETE FROM holds
WHERE user_id = $1;

DELETE FROM users
WHERE user_id = $1;

SELECT * FROM users
ORDER BY user_id;