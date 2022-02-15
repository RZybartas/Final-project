CREATE TABLE IF NOT EXISTS users (
    id INTEGER AUTO_INCREMENT NOT NULL,
    email VARCHAR(200) NOT NULL,
    password TEXT NOT NULL,
    UNIQUE (email),
    PRIMARY KEY (id)
)