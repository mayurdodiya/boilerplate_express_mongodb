module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/your-database-name',
    JWT_SECRET: process.env.JWT_SECRET || 'mysecretkey',
    EXPIRES_IN: process.env.EXPIRES_IN || '10h',
    ADMIN: {
        FIRST_NAME: process.env.ADMIN_FIRST_NAME || "Admin",
        LAST_NAME: process.env.ADMIN_LAST_NAME || "user",
        EMAIL: process.env.ADMIN_EMAIL || "admin@gmail.com",
        PASSWORD: process.env.ADMIN_PASSWORD || "Admin@123",
    }
}