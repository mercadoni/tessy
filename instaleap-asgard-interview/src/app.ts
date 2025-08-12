import passport from 'passport'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from './routes/routes'

const app = express()
app.use(helmet())
app.disable('x-powered-by')

app.use(passport.initialize())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


RegisterRoutes(app)

try {
  const swaggerDocument = require('../docs/swagger.json')
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
} catch (error) {
  console.warn('Swagger documentation not available.')
}

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello future asgardian!')
})

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).send('OK')
})

export default app
