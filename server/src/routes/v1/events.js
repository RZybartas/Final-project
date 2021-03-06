const { Router } = require('express');
const joi = require('joi');
const { isLogged } = require('../../middleware/isLogged');

const router = Router();

const eventSchema = joi.object({
    img_url: joi.string().required(),
    title: joi.string().trim().required(),
    city: joi.string().required(),
    place: joi.string().required(),
    event_date: joi.date().greater('now').required(),
});



router.get('/', async (req, res) => {
    const { mysql } = req.app;

    const query = 'SELECT * FROM events'
    const [data] = await mysql.query(query);


    return res.status(200).send(data)
})

router.post('/add', isLogged, async (req, res) => {
    const { mysql } = req.app;
    let eventData = req.body;

    try {
        eventData = await eventSchema.validateAsync(eventData);
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
    
    try {
        const query = `
        INSERT INTO events (img_url, title, city, place, event_date)
        VALUES (${mysql.escape(eventData.img_url)}, 
            ${mysql.escape(eventData.title)},
            ${mysql.escape(eventData.city)},
            ${mysql.escape(eventData.place)}, 
            ${mysql.escape(eventData.event_date)})`;
    
        const [data] = await mysql.query(query);
        return res.status(201).send(data)
    } catch (error) {
        return res.status(404).send({ error: error.message})
    }

});

module.exports = router;
