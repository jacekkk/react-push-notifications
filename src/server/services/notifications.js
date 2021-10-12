const admin = require('firebase-admin')
const axios = require('axios')

const sendNotificationToClient = async (tokens) => {
  try {
    const { data } = await axios.get(
      'https://scppq3ck96.execute-api.eu-west-2.amazonaws.com/dev/image/random'
    )

    return await admin.messaging().sendMulticast({
      data: {
        title: 'Good boy',
        body: 'Specially selected for you!',
        image: data.url,
      },
      tokens,
    })
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

module.exports = {
  sendNotificationToClient,
}
