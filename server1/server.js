import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync } from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Получаем текущий каталог
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../client/public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../client/public'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Считывание пользователей из файла
const readUsers = () => {
  const data = readFileSync('users.json');
  return JSON.parse(data);
};

// Запись пользователей в файл
const writeUsers = (users) => {
  writeFileSync('users.json', JSON.stringify(users, null, 2));
};

// Middleware для проверки токена
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Регистрация
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { email, password: hashedPassword };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ message: 'User created' });
});

// Логин
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(user => user.email === email);
  
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

// Выход
app.post('/logout', async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(user => user.email === email);
  
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ message: 'Successfully logged out' });
});

// Получение информации о текущем пользователе
app.get('/fetchme', authenticateToken, (req, res) => {
  res.json(req.user);
});

// Загрузка файла
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: `/${req.file.filename}` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});