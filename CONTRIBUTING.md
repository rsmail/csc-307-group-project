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

```
import dotenv from "dotenv"

dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.ANON_KEY;

const supabase = createClient(SUPABASE_URL, ANON_KEY)
```

- Note, every endpoint must use async/await. See example:

```
app.get('/users', async (req, res) => {
   const {data, error} = await supabase.from('users').select('*');
});
```
