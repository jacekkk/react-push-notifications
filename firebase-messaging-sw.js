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
const channel = new BroadcastChannel('firebase-messaging-sw')

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload)
  channel.postMessage({ payload })

  const notificationTitle = payload.data.title
  const notificationOptions = {
    body: payload.data.body,
    image: payload.data.image,
    tag: payload.data.image,
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

self.addEventListener('notificationclick', function (e) {
  console.log('EVENT', e)

  e.notification.close()

  let url = e.notification.tag
  clients.openWindow(url)

  // e.waitUntil(
  //   clients
  //     .matchAll({ includeUncontrolled: true, type: 'window' })
  //     .then(function (clients) {
  //       for (var i = 0; i < clients.length; i++) {
  //         var client = clients[i]
  //         // If so, just focus it.
  //         if (client.url === url && 'focus' in client) {
  //           return client.focus()
  //         }
  //       }

  //       // If not, then open the target URL in a new window/tab.
  //       if (clients.openWindow) {
  //         return clients.openWindow(url)
  //       }
  //     })
  // )
})

// self.addEventListener('notificationclick', function (event) {
//   console.log('event in onclick', event)

//   let url = 'https://pieski-frontend.herokuapp.com'
//   event.notification.close() // Android needs explicit close.

//   // self.clients.matchAll({ includeUncontrolled: true }).then(function (clients) {
//   //   console.log(clients)
//   //   //you can see your main window client in this list.
//   //   clients.forEach(function (client) {
//   //     client.postMessage('YOUR_MESSAGE_HERE')
//   //   })
//   // })

// event.waitUntil(
//   clients.matchAll({ includeUncontrolled: true }).then((windowClients) => {
//     // Check if there is already a window/tab open with the target URL
//   })
// )
// })
