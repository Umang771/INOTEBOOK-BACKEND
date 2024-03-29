const jwt = require('jsonwebtoken');
const jwt_secret = "jwtsecrettest"

const fetchuser= (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({"error":"please auithenticate  with valid authentication token1"})
    }
    try {
        const data = jwt.verify(token,jwt_secret)
        // console.log(data);
    req.user=data.user;
    next();
    } catch (error) {
        res.status(401).send({"error":"please auithenticate  with valid authentication token"})
    }

}
module.exports = fetchuser