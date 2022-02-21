const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const { port, dbConfig } = require('./config');
const auth = require('./src/routes/v1/auth');
const events = require('./src/routes/v1/events');
const registration = require('./src/routes/v1/registration');

const app = express();

app.use(express.json());
app.use(cors());

const main = async () => {

    try {
        const connection = await mysql.createConnection(dbConfig);


        app.mysql = connection;

        app.use('/v1/auth', auth);
        app.use('/v1/events', events);
        app.use('/v1/registration', registration);

        app.get('*', (req, res) => {
            res.status(404).send({error: 'Page not found'})
        });

        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    } catch (error) {
        console.error(error, 'Something wrong with database');
    }
};

main();