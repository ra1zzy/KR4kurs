const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Course = require('./models/Course');  // Подключаем модель курса
const User = require('./models/User'); // Подключаем модель пользователя

const app = express();
const PORT = 5000;

// Middleware для обработки JSON
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

// Настройка CORS, доступ только с localhost:3000 
app.use(cors({
    origin: 'http://localhost:3000', // Указываем, что разрешаем доступ с клиента на этом порту
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные HTTP методы
    allowedHeaders: ['Content-Type', 'Authorization'] // Разрешенные заголовки
}));

// Регистрация нового пользователя
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Проверка: все ли поля заполнены
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Проверка, есть ли пользователь с таким email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Создание нового пользователя
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Вход пользователя
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Проверка: заполнены ли поля
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Поиск пользователя по email
        const user = await User.findOne({ email });

        // Если пользователь не найден или пароль неверный
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Подключение к MongoDB с использованием Mongo Atlas
mongoose.connect('mongodb+srv://bruhmomentvseter:USJEYVfGbxxhJU0p@cluster0.0tlwa.mongodb.net/EDUCATE_DB?retryWrites=true&w=majority', { 
  
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB connection error:', err));

// API: Получение всех курсов
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find(); // Извлекаем курсы из базы данных
        res.json(courses); // Отправляем курсы в ответ
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера при получении курсов' });
    }
});

// API: Добавление нового курса
app.post('/api/courses', async (req, res) => {
    try {
        const newCourse = new Course(req.body); // Создаем новый курс на основе данных из тела запроса
        await newCourse.save(); // Сохраняем курс в базе данных
        res.status(201).json(newCourse); // Возвращаем новый курс в ответ
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера при добавлении курса' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

