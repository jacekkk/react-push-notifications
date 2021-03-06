import React, { useState, useEffect } from 'react'
import { getToken, onMessageListener } from './firebase'

const App = () => {
  const channel = new BroadcastChannel('firebase-messaging-sw')
  channel.addEventListener('message', (event) => {
    console.log('frontend message received', event)

    const { title, body, image } = event.data?.payload?.data

    setNotification({
      title: title,
      body: body,
      image: image,
    })
  })

  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState({
    title: '',
    body: '',
    image: null,
  })

  useEffect(() => {
    async function fetchToken() {
      const token = await getToken()

      if (token) {
        setToken(token)
      }
    }
    fetchToken()
  }, [])

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.data?.title,
        body: payload.data?.body,
        image: payload.data?.image,
      })
    })
    .catch((err) => console.log('failed: ', err))

  return (
    <div className="App">
      <div>{token}</div>
      <div>{notification.title}</div>
      <div>{notification.body}</div>
      {notification.image && <img src={notification.image} />}
    </div>
  )
}

export default App
