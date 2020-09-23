import mongoose from 'mongoose'
import './users.js'
import { randomBytes, pbkdf2Sync } from 'crypto'

const dbURL = 'mongodb://127.0.0.1/Commerce'

const { User } = mongoose.models

const seed = async () => {
  const salt = randomBytes(16).toString('hex')
  const user = [{
    email: 'clive@whitemonkeysoftware.co.uk',
    name: 'clive',
    salt,
    hash: pbkdf2Sync('1234567890qwerty', salt, 1000, 64, 'sha512').toString('hex'),
  }]

  await User.insertMany(user)
}

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async function () {
  await seed()
  mongoose.disconnect()
})
