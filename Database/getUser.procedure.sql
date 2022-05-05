CREATE OR ALTER PROCEDURE getUser @id INT
AS
BEGIN

SELECT userid, username, fullname, email, age, roles FROM users WHERE userid = @id

END

-- EXEC getUser @id = 1