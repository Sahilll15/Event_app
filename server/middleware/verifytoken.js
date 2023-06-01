const jwt = require('jsonwebtoken')


module.exports.verifytoken = (req, res, next) => {
    const token = req.header('auth-token')

    if (!token) {
        return res.status(401).json({ mssg: "Access Denied" })
    }

    try {
        const decoded = jwt.verify(token, 'auth-token')
        req.user = decoded
        next();
    } catch (error) {
        res.status(400).json({ error: "invalid token" })
    }

}