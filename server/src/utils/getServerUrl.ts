import { Request } from 'express'

const getServerUrl = (req: Request): string => {
  return `${req.protocol}://${req.hostname}:${process.env.PORT}`
}

export default getServerUrl