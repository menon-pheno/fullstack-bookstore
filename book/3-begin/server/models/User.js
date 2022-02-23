const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  googleToken: {
    access_token: String,
    refresh_token: String,
    token_type: String,
    expiry_date: Number,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  displayName: String,
  avatarUrl: String,
});

class UserClass {
  static publicFields() {
    // 取得 publicField
    return ['id', 'displayName', 'email', 'avatarUrl', 'slug', 'isAdmin'];
  }

  static signInOrSignUp() {
    // 取得已存在的 user, 如果不存在, 新增一位
  }
}

mongoSchema.loadClass(UserClass);

const User = mongoose.model('User', mongoSchema);

module.exports = User;
