const express = require('express')
const admin = require('firebase-admin')
const schedule = require('node-schedule')
const { addMessage } = require('./controllers')
const { sendNotificationToClient } = require('./services')
require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('dist'))
app.get('/api', (req, res) => res.status(200).json({ status: 'ok' }))
app.post('/api/messages', addMessage)

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDS)

const rule = new schedule.RecurrenceRule()
rule.hour = [10, 18]
rule.minute = 0

const job = schedule.scheduleJob(rule, function () {
  sendNotificationToClient()
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${process.env.PORT || 8080}`)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      'https://pieski-67739-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'gs://pieski-67739.appspot.com',
  })
})
