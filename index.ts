import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRouter from './src/routers/user'
dotenv.config()

const app = express()
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.whtk0sp.mongodb.net/`

app.use('/auth', userRouter)

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL)
        console.log(`Connected to Mongoose DB!`);
    } catch (err) {
        console.log(`Error connecting to Mongoose DB ${err}`, err);
    }
}
// First Connect DB
// Second Run Server
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is starting at http://localhost:${process.env.PORT}`);
    })
}).catch((err) => {
    console.log(err);
});


