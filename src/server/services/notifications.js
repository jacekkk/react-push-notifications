const admin = require('firebase-admin')
const { getRegisteredTokens } = require('./users')
const { getRandomImage } = require('./storage')

const sendNotificationToClient = async () => {
  try {
    const imageUrl = await getRandomImage()

    const tokens = await getRegisteredTokens()

    return await admin.messaging().sendMulticast({
      data: {
        title: 'Good boy',
        body: 'Specially selected for you!',
        image: imageUrl,
      },
      tokens,
    })
  } catch (error) {
    console.log('error while sending notification', error)
    throw error
  }
}

module.exports = {
  sendNotificationToClient,
}
