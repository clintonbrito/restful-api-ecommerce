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
const SalesController = () => import('#controllers/sales_controller')

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
router.get('/clients/:id', [ClientsController, 'getById'])
router.put('/clients/:id', [ClientsController, 'update'])
router.delete('/clients/:id', [ClientsController, 'delete'])
router.post('/products', [ProductsController, 'create'])
router.put('/products/:id', [ProductsController, 'update'])
router.get('/products', [ProductsController, 'getAll'])
router.get('/products/:id', [ProductsController, 'getById'])
router.delete('/products/:id', [ProductsController, 'delete'])
router.post('/sales', [SalesController, 'create'])
