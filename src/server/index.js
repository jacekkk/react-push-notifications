const express = require('express')
const admin = require('firebase-admin')
const { addMessage } = require('./controllers')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('dist'))
app.get('/api', (req, res) => res.status(200).json({ status: 'ok' }))
app.post('/api/messages', addMessage)

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${process.env.PORT || 8080}`)
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  })
})
