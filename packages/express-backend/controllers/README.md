# ./express-backend/controllers
Controllers will handle incoming requests and responses from the `routes`. They will interact with `services`.

For example:
```
import authService from "../services/authService";

async function login(req, res) {
    try {
        const token = await authService.loginUser(req.body);
        res.status(200).json({token});
    } catch (error) {
        res.status(401).json({message: err.message});
    }
}

export default { login, ... }

```