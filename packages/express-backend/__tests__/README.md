# Testing
As discussed with Kubiak, our testing was done in `/services` due to the nature of our organization. This directory contains the primary bulk of code for our backend.

`/controllers` simply aggregates function calls to `/services` and returns the data.

We also were not able to reach 100% coverage due to many of the `/services` throwing errors on database failures. These faiures can be due to one of the following reasons:

- The database has been shutdown and cannot be connected to
- The database has a constraint that is being violated by the request
    - Our tables has little constraints, so these issues were not prevelant.


## Note For Testing
Testing requires setting up `.env` on the backend with our `SUPABASE_URI` and `SUPABASE_ANON_KEY`, so only a developer with these values can run tests.


See `testing.png` for a screenshot of our coverage that was approved by Kubiak.