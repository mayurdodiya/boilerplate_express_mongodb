const mongoose = require('mongoose');
const config = require('../config/config');

module.exports = connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URL, {
            useNewUrlParser: true,
            autoIndex: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Database Connected successfully...');
    } catch (error) {
        console.log('❌ Database Connections Error :', error);
    }
};