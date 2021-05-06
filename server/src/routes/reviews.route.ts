import { Router } from 'express'

import controller from '../controllers/reviews.controller'
import auth from '../middleware/auth'

const router = Router()

router.post('/', controller.create)
router.get('/', auth, controller.getAll)
router.get('/processed', controller.getProcessed)
router.put('/:id', auth, controller.update)
router.delete('/:id', auth, controller.remove)

export default router