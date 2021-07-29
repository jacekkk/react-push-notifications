import firebase from 'firebase/app'
import 'firebase/messaging'

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
const messaging = firebase.messaging()

export const getToken = async () => {
  try {
    return await messaging.getToken({
      vapidKey:
        'BELC4msaJ4zbV7U9rqRDgt8dzsIVEA_sNrnDf9PRtplc4qfrwf2DVL2deHLOCHIoiFofFNLvu7B6LDhhTjklZMM',
    })
  } catch (e) {
    console.log(e)
    throw new Error('Unable to get token')
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload)
    })
  })
