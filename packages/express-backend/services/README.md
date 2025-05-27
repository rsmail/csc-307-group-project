# ./express-backend/services
Services contain the actual business logic. These functions will be called by a controller in `controllers`

These will have no knowledge of (req, res)

For example:
```
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function loginUser({username, password}) {
    const token = jwt.sign(...)

    return token;
}

export default { loginUser, ... };
```