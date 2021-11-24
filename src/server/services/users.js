const admin = require('firebase-admin')

const getRegisteredTokens = async () => {
  try {
    const db = admin.database()
    const ref = db.ref('tokens')
    const snapshot = await ref.once('value')

    return snapshot.val()
  } catch (error) {
    console.log('error while fetching tokens', error)
    throw error
  }
}

module.exports = {
  getRegisteredTokens,
}
