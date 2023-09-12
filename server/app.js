const express = require("express");
const morgan = require("morgan"); // GET /api/v1/tours?fields=name,duration 200 16107.204 ms - 1292(The log on the console is the morgan thing)
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require("./utils/appError")
const globalErrorHandler = require("./controllers/errorControllers")
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

const app = express();

// Set security HTTP headers.
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API.
const limiter = rateLimit({
  max:100,
  windowMS: 60 * 60 * 1000,
  message: 'Too many requests from this IP. please try again in an hour!'
});

app.use('/api', limiter);

app.use(express.json({limit: '10kb'}));

// Data sanitization against NOSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS 

app.use(xss());

// Prevent parameter pollution
app.use(hpp({
  whitelist: ['duration','ratingsAverage','ratingsQuantity','maxGroupSize','difficulty','price']
}));


//////
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies)
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status:'fail',
  //   message: `Can't find ${req.originalUrl} on this server`
  // }) // this one must be here(actually below the route codes). cuz if it goes up routing system will break 

  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.statusCode = 404;
  // err.status = 'fail'

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler);

module.exports = app;
