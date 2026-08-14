import { Router, Request, Response, NextFunction } from 'express'
import { UberServiceImplementation } from '../services/uber.service'
import { ReceiveOrderPickingUseCase } from '../use_cases/receive_order_picking.use_case'
import { WebhookJobEvent } from '../models/job'

const router = Router()
const uberService = new UberServiceImplementation()

router.post('/event', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as WebhookJobEvent
    const useCase = new ReceiveOrderPickingUseCase(uberService, payload)
    const result = await useCase.handleEvent()
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

export default router
