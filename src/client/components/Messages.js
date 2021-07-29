import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Messaging = () => {
  const [messages, setMessages] = useState([])
  const [requesting, setRequesting] = useState(false)

  useEffect(() => {
    setRequesting(true)
    axios.get('/messages').then((resp) => {
      setMessages(resp.data.messages)
      setRequesting(false)
    })
  }, [])

  return (
    <div>
      {/* form goes here */}
      <div className="message-list">
        <h3>Messages</h3>
        {requesting ? (
          <span>Loading...</span>
        ) : (
          <>
            {messages.map((m, index) => {
              const { name, message } = m
              return (
                <div key={index}>
                  {name}: {message}
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
