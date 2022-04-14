const express = require("express");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const logger = require("./logger");
const {doctorRouter} = require("./routes/doctorRoute");
const { authRouter } = require("./routes/authRoute");

dotenv.config();

const app = express();
//eslint-disable-next-line
const port = process.env.PORT || 4000;




// Handle cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type, Authorization");
    next();
});

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/auth", authRouter);


app.listen(port, () => {
    logger.info(`Server starts at http://localhost:${port}`);
});