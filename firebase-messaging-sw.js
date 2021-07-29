// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyDI-E1psUac75t2AiiLj_Co88WGO-Gf8-g',
  authDomain: 'pieski-67739.firebaseapp.com',
  projectId: 'pieski-67739',
  storageBucket: 'pieski-67739.appspot.com',
  messagingSenderId: '166510325096',
  appId: '1:166510325096:web:80b832824d343a3fae3add',
  measurementId: 'G-Z54JYM1PV5',
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    image: payload.notification.image,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
