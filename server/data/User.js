let mongoose = require('mongoose')
let encryption = require('../utilities/encryption')
let requiredValidationMessage = '{PATH} is required'


let userSchema = mongoose.Schema({
  username: { type: String, required: requiredValidationMessage, unique: true },
  firstName: { type: String, required: requiredValidationMessage },
  lastName: { type: String, required: requiredValidationMessage },
  salt: String,
  hashedPass: String,
  roles: [String]

})

userSchema.method({
  authenticate: (password) => {
    let inputHashPassword = encryption.generateHashedPassword(this.salt, password)
    if (inputHashPassword === this.hashedPass) {
      return true
    } else {
      return false
    }
  }
})

let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length === 0) {
      let salt = encryption.generateSalt()
      let hashedPass = encryption.generateHashedPassword(salt, 'Admin123')

      User.create({
        username: 'Admin',
        firstNae: 'Admin',
        lastName: 'Adminov',
        salt: salt,
        hashedPass: hashedPass,
        roles: ['Admin']
      })
    }
  })
}

