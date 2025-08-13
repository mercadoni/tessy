import passport from 'passport'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import router from './routes/routes'

const app = express()
app.use(express.json())
app.use(helmet())
app.disable('x-powered-by')

app.use(passport.initialize())

app.use(express.urlencoded({ extended: true }))

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello future asgardian!')
})

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).send('OK')
})

app.use('/', router)

export default app
