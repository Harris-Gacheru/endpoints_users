DROP TABLE users

CREATE TABLE users (
    userid INT IDENTITY(1,1)  PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE, 
    fullname VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    age INT NOT NULL,
    roles VARCHAR(50) DEFAULT 'student',
    password VARCHAR(300) NOT NULL
)
