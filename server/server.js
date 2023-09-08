const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });  
const app = require("./app");

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
// console.log(process.env)
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false,
     useUnifiedTopology: true 
}).then(() => {
    // console.log(con.connections);
    console.log('DB connection successful')

})


const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});


process.on('unhandledRejection', err => {
  console.log(err.name , err.message)
  console.log('Unhandled rejection! Shutting down...')
  
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', err => {
  console.log(err.name , err.message)
  console.log('Uncaugth exception! Shutting down...')
  
  server.close(() => {
    process.exit(1)
  })
})

// console.log(x) d