const express = require("express");
require('dotenv').config()
const logger = require('./config/logger');
const connectDB = require('./db/dbConnection');
const routes = require("./routes");
const message = require("./utils/message");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("./config/morgan");
const apiResponse = require("./utils/api.response");
const config = require("./config/config");

const app = express();

connectDB().then(() => {
    app.listen(config.PORT, () => {
        logger.info(`Listening to port ${config.PORT}`);
    });
}).catch((error) => {
    console.log(`error:`, error);
});
app.use(express.json());

app.options("*", cors());
app.use(cors({ origin: "*" }));
app.use(helmet());

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use("/api/v1", routes);

app.use((req, res, next) => {
    return apiResponse.NOT_FOUND({ res, message: message.NO_DATA("Route") });
});

