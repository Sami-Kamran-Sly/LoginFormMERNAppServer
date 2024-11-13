require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const authRoutes = require("./routes/authRoute");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(
  cors({
    origin: "http://localhost:5173", // Correct URL without trailing slash
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/v1/auth", authRoutes); // Correctly register your routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
