CREATE TABLE IF NOT EXISTS events (
    id INTEGER AUTO_INCREMENT NOT NULL,
    img_url TEXT NOT NULL,
    title VARCHAR(200) NOT NULL,
    city VARCHAR(50) NOT NULL,
    place VARCHAR(100) NOT NULL,
    event_date DATETIME NOT NULL, 
    PRIMARY KEY (id)
)