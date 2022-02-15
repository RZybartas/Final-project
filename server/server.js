const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const { port, dbConfig } = require('./config');
const auth = require('./src/routes/v1/auth');


const main = async () => {
    const app = express();

    try {
        const connection = await mysql.createConnection(dbConfig);

        app.use(express.json());
        app.use(cors());

        app.mysql = connection;

        app.use('/v1/auth', auth);

        app.get('/', (req, res) => {
            res.send('ok')
        })

        app.get('*', (req, res) => {
            res.status(404).send({error: 'Page not found'})
        })

        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        })
    } catch (error) {
        console.error(error, 'Something wrong with database');
    }
};

main();