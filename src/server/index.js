const express = require('express')
const admin = require('firebase-admin')
const { addMessage } = require('./controllers')
require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('dist'))
app.get('/api', (req, res) => res.status(200).json({ status: 'ok' }))
app.post('/api/messages', addMessage)

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDS)

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${process.env.PORT || 8080}`)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
})
