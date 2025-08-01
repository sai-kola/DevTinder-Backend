const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
app.use(express.json());
app.use(cookieParser());

require("dotenv").config();

app.use(
  cors({
    origin: ["https://dev-tinder-fullstack.vercel.app","http://localhost:5173"],
    credentials: true,
  })
);


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRounter = require("./routes/payment");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRounter);

app.use("/", chatRouter);
const server = http.createServer(app);
initializeSocket(server);
const PORT = process.env.PORT || 7777;
connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(PORT, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });