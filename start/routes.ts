/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import ChatsController from '#controllers/chats_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/questions', [ChatsController, 'store'])
router.get('/conversations', [ChatsController, 'index'])
router.get('/conversations/:id', [ChatsController, 'show'])
router.delete('/conversations/:id', [ChatsController, 'destroy'])
