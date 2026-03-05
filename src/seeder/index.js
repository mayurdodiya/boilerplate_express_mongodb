const connectDB = require('../db/dbConnection');
require('dotenv').config()
const adminSeeder = require('./admin.seeder');
const roleSeeder = require('./role.seeder');

async function seeder() {
    try {
        await connectDB();
        console.log('✅ Seeding database...');

        await roleSeeder();
        await adminSeeder();

        console.log('✅ All seeder run successfully...');

        process.exit(0);
    } catch (error) {
        console.log('❌ Seeder error: ', error);
        process.exit(1);
    }
}

seeder();
