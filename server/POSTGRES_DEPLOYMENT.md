# PostgreSQL backend setup

The backend now stores accounts in PostgreSQL. The existing `/api/auth/*` API and `/api/career` endpoint remain the same, so the Flutter client does not need API route changes.

## On the VPS

Install PostgreSQL on the VPS or create a PostgreSQL database with your database provider. When PostgreSQL and Node run on the same VPS, keep PostgreSQL bound to localhost and use a dedicated database/user. Do not expose port `5432` publicly.

Example database setup on an Ubuntu VPS:

```sql
CREATE USER career_ai_user WITH PASSWORD 'use-a-long-unique-password';
CREATE DATABASE career_ai OWNER career_ai_user;
```

Put the production settings in `server/.env` (never commit this file):

```env
DATABASE_URL=postgresql://career_ai_user:URL_ENCODED_PASSWORD@127.0.0.1:5432/career_ai
JWT_SECRET=your-long-random-secret
OPENAI_API_KEY=your-key
PORT=5000
```

The database password must be URL encoded if it contains characters such as `@`, `:`, `/`, or `#`. If your PostgreSQL provider requires TLS, use the provider's documented PostgreSQL connection URL and SSL settings. `node-postgres` supports connection pools and TLS configuration. See its [pooling](https://node-postgres.com/features/pooling) and [SSL](https://node-postgres.com/features/ssl) documentation.

The PostgreSQL database starts empty. This setup does not import old accounts; users create accounts in PostgreSQL through the existing signup page. Career analyses are saved locally by the Flutter app.

## Start and expose the API

From `server`:

```powershell
npm start
```

The backend creates the `users` table at startup, then listens on `PORT` (default `5000`). For public deployment, put the Node service behind Nginx or another reverse proxy with HTTPS. Point the Flutter build at that public HTTPS URL; do not use `localhost` on a phone:

```powershell
cd ..\flutter_app
flutter run -d chrome --dart-define=API_BASE_URL=https://api.your-domain.com
```

For a release build, pass the same `--dart-define=API_BASE_URL=...` value to the relevant Flutter build command. Keep the PostgreSQL URL, JWT secret, and OpenAI key on the server only.
