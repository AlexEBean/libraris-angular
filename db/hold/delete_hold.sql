DELETE FROM holds
WHERE hold_id = $1;

SELECT * FROM holds;