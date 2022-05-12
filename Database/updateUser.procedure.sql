CREATE OR ALTER PROCEDURE updateUser @id INT, @username VARCHAR(50), @fullname VARCHAR(50), @email VARCHAR(50), @age INT, @roles VARCHAR(50)
AS
BEGIN

UPDATE users
SET username = @username, fullname = @fullname, email = @email, age = @age, roles = @roles
WHERE userid = @id

END

-- EXEC updateUser @id = 1, @username = 'Gacheru', @fullname = 'H Karume', @email = 'g@gmail.com', @age = 21, @roles = 'trainer'