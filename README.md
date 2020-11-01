### Setup

1. Install node version 12 or higher
2. Install postgres on your local machine
3. Setup Env file w/ DATABASE_URL

- .env.local - DATABASE_URL=postgresql://[name]@localhost:5432/RLapp

4. run `blitz build`
5. run `blitz db migrate`
6. run `blitz db seed`
7. run `blitz start`
8. visit localhost:`300X` as indicated in the terminal.
9. Sign in using `test@test.com` password `test12345!`

That's it. Now make a pr.

Production site - https://rl-app.vercel.app/
