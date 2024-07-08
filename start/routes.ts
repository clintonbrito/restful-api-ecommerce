/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ClientsController = () => import('#controllers/clients_controller')
const UsersController = () => import('#controllers/users_controller')
// const verifyToken = () => import('#middleware/verify_token_middleware')
const ProductsController = () => import('#controllers/products_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/signup', [UsersController, 'signup'])
router.post('/login', [UsersController, 'login'])
// router.post('/clients', [ClientsController, 'create']).middleware(verifyToken)
router.post('/clients', [ClientsController, 'create'])
router.get('/clients', [ClientsController, 'getAll'])
router.put('/clients/:id', [ClientsController, 'update'])
router.post('/products', [ProductsController, 'create'])
