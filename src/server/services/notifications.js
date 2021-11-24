const admin = require('firebase-admin')
const axios = require('axios')
const { getRegisteredTokens } = require('./users')

const sendNotificationToClient = async () => {
  try {
    const { data } = await axios.get(
      'https://scppq3ck96.execute-api.eu-west-2.amazonaws.com/dev/image/random'
    )

    const tokens = await getRegisteredTokens()

    return await admin.messaging().sendMulticast({
      data: {
        title: 'Good boy',
        body: 'Specially selected for you!',
        image: data.url,
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
