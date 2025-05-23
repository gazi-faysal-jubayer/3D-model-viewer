const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 8080,
    // ... any other config variables
};