import app from "./app/app.js"
import connectDB from "./config/db.js";

const port = 3000

await connectDB()

app.listen(port, () => {
    console.log("Server Started");
})