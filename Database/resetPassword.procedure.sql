CREATE OR ALTER PROCEDURE resetPassword @id INT, @password VARCHAR(300)
AS
BEGIN

UPDATE users
SET password = @password
WHERE userid = @id

END

EXEC resetPassword @id = 2, @password = '12345678'