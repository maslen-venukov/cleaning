import { Router } from 'express'

import controller from '../controllers/mainService.controller'
import auth from '../middleware/auth'
import upload from '../middleware/upload'

const router = Router()

router.post('/', upload.single('image'), auth, controller.create)
router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.put('/:id', upload.single('image'), auth, controller.update)
router.delete('/:id', auth, controller.remove)

export default router