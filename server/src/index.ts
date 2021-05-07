import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import connectDB from './core/db'

import usersRouter from './routes/users.route'
import backCallsRouter from './routes/backCalls.route'
import reviewsRouter from './routes/reviews.route'
import mainServiceRouter from './routes/mainService.route'
import additionalServiceRouter from './routes/additionalService.route'
import ordersRouter from './routes/orders.route'

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', usersRouter)
app.use('/api/back-calls', backCallsRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/services/main', mainServiceRouter)
app.use('/api/services/additional', additionalServiceRouter)
app.use('/api/orders', ordersRouter)

const start = async () => {
  try {
    await connectDB(MONGO_URI)
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()