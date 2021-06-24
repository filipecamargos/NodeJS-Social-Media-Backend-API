const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    //Check for the token
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        const error = new Error('Not Authenticated.')
        error.statusCode = 401;
        throw error;
    }

    //get the toke that comes as "Bearer xxxxxxxxxxx"
    const token = authHeader.split(' ')[1];

    //Try to decode
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'pageSecretForLoadingaToken');

    } catch(error) {
        error.statusCode = 500;
        throw error;
    }

    //if decodedToken failed and got set it to false
    if (!decodedToken) {
        const error = new Error('Authentication Failed.')
        error.statusCode = 401;
        throw error;
    }

    //store the userId on the request and move to next router
    req.userId = decodedToken.userId;
    next();
};