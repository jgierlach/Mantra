import { Router } from 'express'
import authMiddleware from '@middleware/auth'
import loginValidator from '@validators/login'
import registerValidator from '@validators/register'
import authController from '@controllers/auth.controller'
import emailConfirmValidator from '@validators/email-confirm'
import resetPasswordValidator from '@validators/reset-password'
import forgotPasswordValidator from '@validators/forgot-password'

const router = new Router()

router.post('/api/v1/auth/login', loginValidator, authController.login)

router.post('/api/v1/auth/register', registerValidator, authController.register)

router.post(
  '/api/v1/auth/passwords/email',
  forgotPasswordValidator,
  authController.forgotPassword
)

router.post(
  '/api/v1/auth/passwords/reset',
  resetPasswordValidator,
  authController.resetPassword
)

router.post(
  '/api/v1/auth/emails/confirm',
  emailConfirmValidator,
  authController.confirmEmail
)

router.post(
  '/api/v1/auth/emails/resend',
  authMiddleware,
  authController.resendConfirmEmail
)

export default router
