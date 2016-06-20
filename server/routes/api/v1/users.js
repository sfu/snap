import {Router} from 'express'
import db from '../../../db'

const router = Router()

router.get('/:username', async (req, res) => {
  let {username} = req.params
  if (username === 'self') {
    username = req.user.username
  }
  if (username !== req.user.username) {
    res.boom.unauthorized()
    return
  }

  const user = (await db('users').where({username}))[0]
  if (user) {
    delete user.access_token
    delete user.refresh_token
    res.send(user)
  } else {
    res.boom.notFound()
  }
})

export default router
