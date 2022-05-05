CREATE OR ALTER PROCEDURE getUsers
AS
BEGIN

SELECT userid, username, fullname, email, age, roles FROM users

END

EXEC getusers