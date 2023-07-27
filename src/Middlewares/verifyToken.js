const jwt = require('jsonwebtoken')
const {accessSecretKey, refreshSecretKey} = require('../Config/secretKey')

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
  
    if (!token) {
      return res.status(403).send('Token is required for authentication');
    }
  
    try {
        const decodedToken = jwt.verify(token, accessSecretKey);

        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTimestamp) {
          return res.status(401).json({ status: 401, data: 'Token has expired' });
        }

      req.decodedToken = decodedToken;
      next(); // Call next to proceed to the next middleware/route handler
    } catch (error) {
      // Handle JWT verification errors
      return res.status(500).json({ status: 500, data: 'Something went wrong' });
    }
  };

module.exports = verifyToken;