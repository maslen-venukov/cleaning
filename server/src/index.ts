import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './core/db'

dotenv.config()

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const start = async () => {
  try {
    await connectDB(MONGO_URI)
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()

start()