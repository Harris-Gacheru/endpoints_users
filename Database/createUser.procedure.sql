CREATE OR ALTER PROCEDURE createUser @username VARCHAR(50), @fullname VARCHAR(50), @email VARCHAR(50), @age INT, @password VARCHAR(300)
AS 
BEGIN

INSERT INTO users(username, fullname, email, age, password)
VALUES(@username, @fullname, @email, @age, @password)

END

-- EXEC createUser @username = 'xhgafq', @fullname = 'cwdvb beview', @email = 'cwecfwe@mail.com', @age = '22', @roles = 'student', @password = '123456'