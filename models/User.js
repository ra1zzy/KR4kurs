const mongoose = require('mongoose');

// Схема пользователя
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Экспортируем модель пользователя
module.exports = mongoose.model('User', UserSchema);
