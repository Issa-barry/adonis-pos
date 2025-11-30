import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')

// Routes publiques
router.on('/').renderInertia('home')
router.on('/about').renderInertia('about')

// Routes d'authentification
router.get('/register', [AuthController, 'showRegister']).as('register.show')
router.post('/register', [AuthController, 'register']).as('register')

router.get('/login', [AuthController, 'showLogin']).as('login.show')
router.post('/login', [AuthController, 'login']).as('login')

router.post('/logout', [AuthController, 'logout']).as('logout')

// Routes protégées
router.group(() => {
  router.get('/dashboard', async ({ inertia, auth }) => {
    // Passer explicitement les données auth
    return inertia.render('dashboard', {
      auth: {
        user: auth.user
      }
    })
  })
}).use(middleware.auth())