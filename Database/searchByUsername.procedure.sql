CREATE OR ALTER PROCEDURE searchByUsername @username varchar(50)
AS
BEGIN

SELECT * FROM users WHERE username = @username

END

-- EXEC searchByUsername @username = 'John'