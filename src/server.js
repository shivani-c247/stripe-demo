import express from 'express';
import router from './routes/index.js';
import { connect } from "mongoose";


const app = express();
const url= process.env.DATABASE_URI || "";

app.use(express.json());

/**
 * Using the app to use our all routes
 */
app.use('/', router)

connect(url)
  .then(() => {
    console.log("Database connected successfully.");
    // seeder.importLocations();
  })
  .catch((err) => {
    //  console.log("Error in database connection - ", err.message);
  });

const port=8001
app.listen(port, () => {
    return console.log(`Server is running at port ${port}`);
});
