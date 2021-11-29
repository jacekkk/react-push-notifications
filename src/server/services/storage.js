const admin = require('firebase-admin')

const getRandomImage = async () => {
  try {
    const config = {
      action: 'read',
      expires: Date.now() + 1000 * 60 * 360, // 6 hours
    }

    const bucket = admin.storage().bucket()

    const files = await bucket.getFiles()
    const filesCount = files[0].length

    const randomIndex = Math.floor(Math.random() * (filesCount - 0) + 0)
    const file = files[0][randomIndex]

    const url = await file.getSignedUrl(config)
    return url[0]
  } catch (error) {
    console.log('error while retrieving files', error)
    throw error
  }
}

module.exports = {
  getRandomImage,
}
