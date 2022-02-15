const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../../config');


module.exports = {
    isLogged: (req, res, next) => {
        const { authorization } = req.headers;
        
        if (!authorization) {
            return res.status(403)
        }
        
        const [, token] = authorization.split(' ');

        try {
            const parsed = jwt.verify(token, jwtSecret);
            req.token = parsed;
            next();
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(403).send({error: error.message});
            }
        }
    }
};