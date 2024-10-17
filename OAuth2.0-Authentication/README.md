# auth app with oauth2
This is an authentication application built with TypeScript that utilizes OAuth2 token strategies for Google and Facebook.

## Usage
* Clone the repository to your machine
* Install dependencies `npm install`
* Create .env file
```bash
PORT = 3000
MONGO_URI=YOUR_DB_URL

ACCESS_TOKEN_SECRET=verystrongkey
REFRESH_TOKEN_SECRET=morestrongkey

GOOGLE_CLIENT_ID=YOURS
GOOGLE_CLIENT_SECRET=YOURS
GOOGLE_REDIRECT_URL=YOURS

FACEBOOK_CLIENT_ID=YOURS
FACEBOOK_APP_SECRET=YOURS
FACEBOOK_REDIRECT_URL=YOURS
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
#### token auth
* `POST /users/register`: login with username and password
* `POST /users/login`: login with username and password
* `POST /users/refresh`: refresh token to get new access token
* `GET /users/access`: protected route that requires access token

#### facebook
* `GET /api/v1/facebookAuth/facebook`: oauth2 with facebook
* `GET /api/v1/facebookAuth/protected`: access protected

#### Google
* `GET /api/v1/googleAuth/google`: oauth2 with google
* `GET /api/v1/googleAuth/protected`: access protected