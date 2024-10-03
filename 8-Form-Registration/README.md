# Form-Registration
This Node.js Express application implements a simple express application which includes a registration form. The form contains these fields:

- Full Name (Can't contain numbers)

- Email (Must be valid and @gmail.com)

- Password (Must be between 8 and 64 characters, contain at least one number, one uppercase character and one lowercase character)

- Password Confirm (Must be same as password)

- Birthdate (Must be a date)
## Requirements
- Node.js: Ensure Node.js is installed in your environment.
- npm: The Node.js package manager, npm, is used to manage dependencies.

## Installation
To install the necessary dependencies, run:
```bash
npm install
```
This will install the packages listed in package.json.

## Configuration
Create a .env file:
```bash
PORT=5000  # Default port if not set in environment variables
```
This will install the packages listed in package.json.

## Usage
To run the application, use the following command:
```bash
node server.js
```
Open http://localhost:5000 in your browser.