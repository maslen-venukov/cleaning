import { Router } from 'express'

import controller from '../controllers/backCalls.controller'
import auth from '../middleware/auth'

const router = Router()

router.get('/', auth, controller.getAll)
router.post('/', controller.create)
router.put('/process/:id', auth, controller.process)
router.delete('/:id', auth, controller.remove)

export default router