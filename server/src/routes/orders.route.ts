import { Router } from 'express'

import controller from '../controllers/orders.controller'
import auth from '../middleware/auth'

const router = Router()

router.post('/', auth, controller.create)
router.get('/', auth, controller.getAll)
router.get('/:id', auth, controller.getById)
router.put('/:id', auth, controller.update)
router.delete('/:id', auth, controller.remove)

export default router