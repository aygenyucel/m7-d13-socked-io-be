import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { newConnectionHandler } from "./socket/index.js";

const expressServer = express();

const port = process.env.PORT || 3001;

//***************SOCKET IO ********************* */
const httpServer = createServer(expressServer);
const io = new Server(httpServer);

io.on("connection", newConnectionHandler);

//***************MIDDLEWARES***************** */
expressServer.use(express.json());
expressServer.use(cors());

//***************ENDPOINTS******************* */

//*******************ERROR HANDLERS ************* */

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  httpServer.listen(port, () => {
    console.table(listEndpoints(expressServer));
    console.log(`Server is running on ${port}`);
  });
});
