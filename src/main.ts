import express from 'express'
import { ConnectDatabase } from './database/database'
import bodyParser from 'body-parser'
import TodoRoutes from './routes/todo-list.routes'

const port = 3000

const app = express()
app.use(bodyParser.json())

app.use('/todos', TodoRoutes)

ConnectDatabase()

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
