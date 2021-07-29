const admin = require('firebase-admin')
const axios = require('axios')

const sendNotificationToClient = async (tokens) => {
  try {
    const { data } = await axios.get(
      'https://scppq3ck96.execute-api.eu-west-2.amazonaws.com/dev/image/random'
    )

    const notificationData = {
      notification: {
        title: 'Good boy',
        body: 'Specially selected for you!',
        image: data.url,
      },
    }

    return await admin.messaging().sendToDevice(tokens, notificationData)
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

module.exports = {
  sendNotificationToClient,
}
