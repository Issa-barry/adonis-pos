import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async showRegister({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async register({ request, auth, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])
    
    const user = await User.create(data)
    await auth.use('web').login(user)
    
    // CHANGEMENT ICI : rediriger vers /dashboard
    return response.redirect('/dashboard')
  }

  async showLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    
    // Vérifier les credentials et récupérer l'utilisateur
    const user = await User.verifyCredentials(email, password)
    
    // Connecter l'utilisateur
    await auth.use('web').login(user)
    
    // CHANGEMENT ICI : rediriger vers /dashboard
    return response.redirect('/dashboard')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}