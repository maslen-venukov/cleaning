import fs from 'fs'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

import MainService from '../models/MainService'
import AdditionalService from '../models/AdditionalService'

const MONGO_URI = process.env.MONGO_URI

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

const seed = async () => {
  try {
    const mainServices = JSON.parse(fs.readFileSync('./src/seed/mainServices.json', 'utf8'))
    const additionalService = JSON.parse(fs.readFileSync('./src/seed/additionalServices.json', 'utf8'))

    await mongoose.connect(MONGO_URI, mongoConfig)

    await MainService.deleteMany()
    await AdditionalService.deleteMany()

    await MainService.insertMany(mainServices)
    await AdditionalService.insertMany(additionalService)

    console.log('Inserted')
  } catch (e) {
    console.log(e)
  }
}

seed()