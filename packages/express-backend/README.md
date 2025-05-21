# Backend Structure

The backend is divided into 4 sub-directories

1. `routes`

    - Listens to HTTP requests and redirects to an appropriate controller

2. `controllers`

    - Receives `(req, res)` and requests `services`

3. `services`

    - Actual business logic and database access is handled here

4. `utils`

    - Contains helper functions that may be reused in various locations
        - See `jwt.js` and `db.js`

## backend.js
This is the "server" (could be renamed if desired). This contains the router which uses the routes from `routes` with `router.use('{path}', {routeName})`