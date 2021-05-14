import { Router } from 'express'

import controller from '../controllers/calcRequests.controller'
import auth from '../middleware/auth'

const router = Router()

router.post('/', controller.create)
router.get('/', auth, controller.getAll)
router.put('/process/:id', auth, controller.process)
router.delete('/:id', auth, controller.remove)

export default router