import { Router } from 'express'

import controller from '../controllers/photoRequests.controller'
import auth from '../middleware/auth'
import upload from '../middleware/upload'

const router = Router()

router.post('/', upload.array('images', 5), controller.create)
router.get('/', auth, controller.getAll)
router.put('/process/:id', auth, controller.process)
router.post('/email/:id', auth, controller.email)
router.delete('/:id', auth, controller.remove)

export default router