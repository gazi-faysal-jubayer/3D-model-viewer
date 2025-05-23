require('dotenv').config();

let { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_BUCKET, PORT } = process.env;
if (!APS_CLIENT_ID || !APS_CLIENT_SECRET) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Missing required environment variables!');
    console.log('\nPlease set up your environment variables:');
    console.log('1. Copy .env.example to .env');
    console.log('2. Update APS_CLIENT_ID and APS_CLIENT_SECRET in .env');
    console.log('\nGet your credentials from https://aps.autodesk.com/\n');
    process.exit(1);
}
APS_BUCKET = APS_BUCKET || `${APS_CLIENT_ID.toLowerCase()}-basic-app`;
PORT = PORT || 8080;

module.exports = {
    APS_CLIENT_ID,
    APS_CLIENT_SECRET,
    APS_BUCKET,
    PORT
};