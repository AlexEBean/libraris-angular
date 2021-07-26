UPDATE users
SET admin = NOT admin
WHERE user_id = $1
RETURNING *;