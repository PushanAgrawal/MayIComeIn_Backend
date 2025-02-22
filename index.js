const express = require("express");
const cors = require("cors");
const apiRoutes = require("./src/routes");
const { ServerConfig, ConnectDB } = require("./src/config");
const app = express();
app.use(cors());

app.use("/api", apiRoutes);

app.listen(8000, async () => {
    //mongoDB connection
    
    console.log(`Server is up at `);
  });
  