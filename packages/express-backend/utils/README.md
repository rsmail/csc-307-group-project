# ./express-backend/utils
Standalone, stateless functions that help with formatting, hashing passwords, or other logic that is reusable

For example:
```
const jwt = require("jsonwebtoken");

function generateToken(payload) {
    return jwt.sign(payload, ...);
}

function verifyToken(token) {
    return jwt.verify(token, ...);
}

module.exports = { generateToken, verifyToken };
```