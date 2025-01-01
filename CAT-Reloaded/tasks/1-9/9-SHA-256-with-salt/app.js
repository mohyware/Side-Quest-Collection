const crypto = require('crypto');

// generate a random salt
function generateSalt(length) {
    return crypto.randomBytes(length).toString('hex');
}

// hash a password with a salt
function hash(password, salt) {
    const hash = crypto.createHash('sha256'); // Create a SHA-256 hash object
    hash.update(salt + password); // Combine the salt and password
    return salt + ':' + hash.digest('hex'); // Return the salt and hash combined
}

// compare a password with a hashed value
function compare(password, hashed) {
    const [salt, originalHash] = hashed.split(':'); // Split the hashed value into salt and hash
    const hashToCompare = crypto.createHash('sha256').update(salt + password).digest('hex'); // Hash the input password with the salt
    return hashToCompare === originalHash; // Compare the hashes
}

// Example usage:
const password = 'mypassword';
const salt = generateSalt(16);
const hashedPassword = hash(password, salt);

console.log('Salt:', salt);
console.log('Hashed Password:', hashedPassword);

// Verify the password
const isMatch = compare('mypassword', hashedPassword);
console.log('Password match:', isMatch); // true

const isMatchWrong = compare('wrongpassword', hashedPassword);
console.log('Password match:', isMatchWrong); // false
