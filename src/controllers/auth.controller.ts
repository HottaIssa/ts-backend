import type { Request, Response } from 'express'
import UserServices from '../services/user.service'
import { ValidateToken } from '../utils/jwt.util'

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const token = await UserServices.login(email, password)
      res.status(200).json({ token: token })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
  async refreshToken(req: Request, res: Response) {
    try {
      const header = req.header('Authorization') || ''
      const old_token = header.split(' ')[1] || ''
      const { refresh_token } = req.body
      const actual_token = (await ValidateToken(refresh_token)) as {
        token: string
      }
      const user = (await ValidateToken(old_token)) as {
        _id: string
        email: string
      }

      if (actual_token.token === old_token) {
        const newToken = await UserServices.refreshToken({
          _id: user._id,
          email: user.email
        })
        res.status(200).json(newToken)
      } else {
        res.status(403).json({ error: 'Token no valido' })
      }
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body
      await UserServices.create({ name, email, password })
      res.status(200).json({ data: 'ok' })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

const authController = new AuthController()
export default authController
