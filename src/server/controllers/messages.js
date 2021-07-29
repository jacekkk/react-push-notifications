const { sendNotificationToClient } = require('../services')

const addMessage = async (req, res) => {
  try {
    const { tokens } = req.body
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
