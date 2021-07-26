INSERT INTO users (first_name, last_name, email, password, admin)
VALUES ($1, $2, $3, $4, false)
RETURNING *;