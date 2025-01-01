# auth with refresh token
This is an authentication app using a refresh token strategy, developed with TypeScript.

## Usage
* Clone the repository to your machine
* Install dependencies `npm install`
* Create .env file
```bash
PORT = 3000
MONGO_URI=YOUR_DB_URL
ACCESS_TOKEN_SECRET=verystrongkey
REFRESH_TOKEN_SECRET=morestrongkey
```
### Development Mode
```bash
npm run dev
```

### Building for production
```bash
npm run build
```

### Running distribution
```bash
npm run start
```

### Api-endpoints
* `POST /users/register`: login with username and password
* `POST /users/login`: login with username and password
* `POST /users/refresh`: refresh token to get new access token
* `GET /users/access`: protected route that requires access token
