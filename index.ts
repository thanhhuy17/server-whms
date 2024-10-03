import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.whtk0sp.mongodb.net/`

app.listen(process.env.PORT, () => {

    console.log(`Server is starting at http://localhost:${process.env.PORT}`);
})
