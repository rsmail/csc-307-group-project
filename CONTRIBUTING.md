# General Repo Setup

- Clone the repository

- In the root directory, `run npm install`
    - Make sure the language mode for `.prettierrc` is `YAML`

## Backend Setup

- Create a .env with the following:

    - SUPABASE_URL
        - This can be found in the Supabase Project Settings ->
          API Settings -> Project URL
    - ANON_KEY
        - This can be found in the Supabase Project Settings ->
          API Settings -> Project API Keys

- To connect to start a connection with the database use:
    - You may use any name you want instead of `db`. Be sure to
      include the correct path to `db.js`

```
import db from "./db.js"
```

- Note, every endpoint must use async/await. See example:

```
app.get('/users', async (req, res) => {
   const {data, error} = await db.from('users').select('*');
});
```
