const { Router } = require('express');
const joi = require('joi');
const { isLogged } = require('../../middleware/isLogged');


const router = Router();

const participantsSchema = joi.object({
    event_id: joi.string().required(),
    firstname: joi.string().alphanum().required(),
    surname: joi.string().alphanum().required(),
    email: joi.string().email().required(),
    dob: joi.string().required()
});

router.get('/', isLogged, async (req, res) => {
    const { mysql } = req.app;

    try {
        const query = `
            SELECT * FROM participants
        `;
        
        const [participants] = await mysql.query(query);

        res.send(participants)
    } catch (error) {
        return res.status(404).send({error: error.message});
    }
})

router.post('/add', isLogged, async (req, res) => {
    const { mysql } = req.app;
    let participantsData = req.body;
    const { event_id, firstname, surname, email, dob } = participantsData;
    //Validating data
    try {
        participantsData = await participantsSchema.validateAsync(participantsData);
    } catch (error) {
        return res.status(404).send({error: error.message})
    }

    
    try {
        const query = `
        INSERT INTO participants (event_id, firstname, surname, email, dob)
            VALUES (${mysql.escape(event_id)}, 
            ${mysql.escape(firstname)}, 
            ${mysql.escape(surname)}, 
            ${mysql.escape(email)}, 
            ${mysql.escape(dob)})`;
                
        const [data] = await mysql.query(query);
        console.log(data)
        return res.status(201).send(data)
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
});

router.patch('/:id', isLogged, async (req, res) => {
    const { mysql } = req.app;
    let participantsData = req.body;
    const { event_id, firstname, surname, email, dob } = participantsData;
    const id = Number(req.params.id);
    //Validating data
    try {
        participantsData = await participantsSchema.validateAsync(participantsData);
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
    
    
    try {
        const query = `
        UPDATE participants 
        SET event_id = ${mysql.escape(event_id)}, 
        firstname = ${mysql.escape(firstname)}, 
        surname = ${mysql.escape(surname)}, 
        email = ${mysql.escape(email)}, 
        dob = ${mysql.escape(dob)}
        WHERE id = ${mysql.escape(id)}
        `;
        
        const [{ affectedRows }] = await mysql.query(query);
        
        if (!affectedRows) {
            return res.status(404).send({
                error: `No person with id: ${id}`,
            });
        };
        return res.status(201).send({
            updated: {
                id,
                ...req.body,
            },
        });
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
});

router.delete('/:id', isLogged, async (req, res) => {
    const { mysql } = req.app;
    const id = Number(req.params.id);

    try {
        const [{ affectedRows }] = await mysql.query(
            `DELETE FROM participants WHERE id=${mysql.escape(id)};`
        );

        if (!affectedRows) {
            return res.status(404).send({
                error: `No person with id: ${id}`,
            });
        }

        res.send({
            deletedId: id,
        });
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
})


module.exports = router;