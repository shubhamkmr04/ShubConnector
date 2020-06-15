const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    mongoose.set('useFindAndModify', false)

    console.log('database connected')
  } catch (err) {
    console.error(err.message)
    process.exit(1) // i dont know y this is here, everthing is same with or without this
  }
}
module.exports = connectDB
