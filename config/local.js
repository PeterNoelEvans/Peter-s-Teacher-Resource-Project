module.exports = {
    // Database configuration
    database: {
        provider: 'postgresql',
        url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/teacher_resource_db',
        // Use PostgreSQL for local development
    },

    // File storage configuration
    fileStorage: {
        type: 'local',
        uploadDir: './uploads',
        // Use local file storage for development
        // Files will be stored in the uploads directory
    },

    // Server configuration
    server: {
        port: 3001,
        host: 'localhost',
        // Local development server settings
    },

    // Security settings
    security: {
        jwtSecret: 'your-local-development-secret',
        // Use a different secret for local development
    },

    // Environment
    environment: 'development',
    
    // Logging
    logging: {
        level: 'debug',
        file: './logs/local-development.log'
    }
}; 