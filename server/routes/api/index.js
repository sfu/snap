import {Router} from 'express'
import v1 from './v1'

const router = Router({mergeParams: true})

router.use((req, res, next) => {
  if (req.headers.accept !== 'application/json') {
    req.headers.accept = 'application/json'
  }
  req.isApiRequest = true
  next()
})

router.use('/v1', v1)

export default router