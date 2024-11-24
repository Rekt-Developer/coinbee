import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync } from 'fs';

import { usersRouter, authRouter } from './routes';

import { sleep } from './sleep.js';



// Получаем текущий каталог
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../../client/public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../client/public'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const server = express();

server.listen(4000, () => {
  console.log('Server started on port 4000');
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: `/${req.file.filename}` });
});

server.use(json(), cookieParser(), cors(), sleep([400, 1500]));

server.use('/users', usersRouter);

server.use('/', authRouter);
