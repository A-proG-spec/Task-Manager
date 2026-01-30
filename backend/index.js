import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT;

connectDB();
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
