const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// define log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// create a logger instance
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        })
    ]
});

// add a custom log level for warnings
logger.add(new transports.Console({
    format: format.combine(
        format.colorize(),
        format.simple()
    ),
    level: 'warn'
}));

module.exports = logger;