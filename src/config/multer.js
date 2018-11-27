const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

module.exports = {
  // saving the avatars on hard disk
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (req, file, cb) => {
      // create a new name to a file using random
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err)

        // convert to hexadecimal and add the original name
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
