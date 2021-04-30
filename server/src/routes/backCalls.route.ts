import { Router } from 'express'

import controller from '../controllers/backCalls.controller'
import auth from '../middleware/auth'

const router = Router()

router.get('/', auth, controller.getAll)
router.post('/', controller.create)

export default router