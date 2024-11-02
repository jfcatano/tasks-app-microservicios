import express from 'express'
import routes from './routes'
import cors from 'cors'

import { corsOptions } from '../config'
const app = express()

// Middlewares
app.use(express.json())

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', routes)

app.get('/', (_req, res) => {
    res.send('API is running')
})

export default app
