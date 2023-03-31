const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const storeRoutes = require("./routes/store.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(storeRoutes);

app.listen(8080); 
console.log("Server on port 8080");