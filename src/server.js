import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

const server = express();

const port = process.env.PORT || 3001;

//***************MIDDLEWARES***************** */
server.use(express.json());
server.use(cors());

//***************ENDPOINTS******************* */

//*******************ERROR HANDLERS ************* */

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on ${port}`);
  });
});
