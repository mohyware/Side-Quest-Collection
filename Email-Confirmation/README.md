# Email Confirmation app 
The Email Confirmation App enhances user registration security by verifying email addresses before granting full access to the application.

## Usage
* Clone the repository to your machine
* Install dependencies `npm install`
* Create .env file
```bash
PORT = 3000
MONGO_URI=YOUR_DB_URL

JWT_SECRET=veryStrongWord   
JWT_LIFETIME=20m

SMTP_HOST=smtp.gmail.com
SMTP_MAIL=YOURS
SMTP_PASSWORD=YOURS
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
* `POST /users/register`: register that send you confirmation message
* `POST /users/login`: login with username and password only when u confirm
* `GET /users/access`: protected route that requires access token 
