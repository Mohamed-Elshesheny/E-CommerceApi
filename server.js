const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const catogeryRoute = require("./Routes/categoryRoute");
const userRoute = require("./Routes/userRoute");
const subCategoryRoute = require("./Routes/subCategoryRoute");
const brandRoute = require("./Routes/brandRoute");
const AppError = require("./utils/AppError");
const globalError = require("./Middleware/errorMiddleware");

// Load environment variables
dotenv.config({ path: "./config.env" });

// Connect to the DB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB connection is successful"));
// .catch((err) => console.log("DB connection error: ", err));

// Express App
const app = express();

// Use morgan for logging in development mode
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Mode -> ${process.env.NODE_ENV}`);
}

// Mounted Routes
app.use("/api/v1/categoreis", catogeryRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/subcategory", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);

// Frist middleware then it send it to app error then global error handler
app.all("*", (req, res, next) => {
  // This is for all routes that doesnt exists
  next(new AppError(`can't find this ${req.originalUrl} on this server!`, 400));
});

// Global error handling middleware
app.use(globalError);

// Define PORT from environment variables
const PORT = process.env.PORT || 8001;

const server = app.listen(8000, () => {
  console.log(`Hello From The Server side on port: ${PORT}`);
});

// Events ==> list ==> callback(err)
// Error outside express errors
process.on("uncaughtException", (err) => {
  console.log(`uncaughtException error: ${err.name}|${err.message}`);
  server.close(() => {
    console.log("Shutting Down The Server....");
    process.exit(1);
  });
});
