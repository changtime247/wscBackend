import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const requestEndpoint = 'https://api.esv.org/v3/passage/html/'

app.get('*', async (req, res) => {
  const fetchOptions = {
    method: 'GET',
    headers: {
      Authorization: process.env.API_KEY,
      'Content-Type': 'application/json',
    },
  }
  const parsed = req.query.proofs ? JSON.parse(req.query.proofs) : ''
  const response = await fetch(`${requestEndpoint}?q=${parsed}`, fetchOptions)
  const jsonResponse = await response.json()
  res.json(jsonResponse)
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening at ${process.env.PORT || 5000}`)
})
