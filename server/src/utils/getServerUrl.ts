import { Request } from 'express'

const getServerUrl = (req: Request) => `${req.protocol}://${req.hostname}:${process.env.PORT}`

export default getServerUrl