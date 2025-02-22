const express = require("express");
const cors = require("cors");
const apiRoutes = require("./src/routes");
const { ServerConfig, ConnectDB } = require("./src/config");

const app = express();
app.use(cors());

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    //mongoDB connection
    await ConnectDB()
    console.log(`Server is up at ${ServerConfig.PORT} `);
  });
  