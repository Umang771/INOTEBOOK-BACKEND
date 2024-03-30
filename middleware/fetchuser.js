var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Umang123';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token1" })
    }
    try {
        console.log(token);
        const data = jwt.verify(token, JWT_SECRET);
        console.log(data)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token2" })
        console.log(error)

    }

}


module.exports = fetchuser;