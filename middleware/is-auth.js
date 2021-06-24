const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //get the toke that comes as "Bearer xxxxxxxxxxx"
    const token = req.get('Authorization').split(' ')[1];

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