const { sendNotificationToClient } = require('../services')

const addMessage = async (req, res) => {
  try {
    const tokens = [
      'd3QROubBOl6LQyu9xvKYQT:APA91bHQt7sb-6fYDHb6ubYERnJDw4dXqNDnUue1bJhk7NE8VTEGYTDNqCODkvDdb8gv4uMqwLtM2_PIlpV-i0PrTYd9Q2rTUUOH_0rGcLbJwcFw-9NFh_HL1SNumugNsuYIZDE4j9yz',
    ]

    const response = await sendNotificationToClient(tokens)

    res.status(200).json({ response })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.toString() })
  }
}

module.exports = {
  addMessage,
}
