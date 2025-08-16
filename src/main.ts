import 'dotenv/config'
import express from 'express'
import { ConnectDatabase } from './database/database'
import bodyParser from 'body-parser'
import TodoRoutes from './routes/todo-list.routes'
import UserRoutes from './routes/user.routes'
import AuthRoutes from './routes/auth.routes'
import { validateToken } from './middlewares/jwt.middleware'
import { rateLimit } from 'express-rate-limit'

const port = process.env.PORT ?? 3000
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56 // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
})

const app = express()
app.use(bodyParser.json())
app.use(limiter)

app.use('/todos', validateToken, TodoRoutes)
app.use('/users', validateToken, UserRoutes)
app.use('/auth', AuthRoutes)

ConnectDatabase()

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
