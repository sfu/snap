import {Router} from 'express'
import v1 from './v1'
import { loggedin, getUser, provisionOrUpdateUser } from '../../auth-middleware'

const router = Router({mergeParams: true})

router.use(function isApiRequest(req, res, next) {
  if (req.headers.accept !== 'application/json') {
    req.headers.accept = 'application/json'
  }
  req.isApiRequest = true
  next()
})

router.use('/v1', loggedin, getUser, provisionOrUpdateUser, v1)

export default router
