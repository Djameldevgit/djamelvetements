require('dotenv').config();
//require('./cronJobs/DeleteUsersNoVerified');
const { autoUnblockUsers } = require('./controllers/autoUnBlockUser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const i18n = require('i18n');
const SocketServer = require('./socketServer');
const morgan = require('morgan');

// ✅ CORS para Express
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use(cookieParser());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});
i18n.configure({
  locales: ['en', 'es', 'fr', 'ar', 'ru', 'kab', 'chino'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  cookie: 'lang',
  queryParameter: 'lang',
  objectNotation: true,
  updateFiles: false
});
app.use(i18n.init);

const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})


// --- Rutas de API ---
app.get('/api/set-language', (req, res) => {
  const lang = req.query.lang;
  if (lang && i18n.getLocales().includes(lang)) {
    res.cookie('lang', lang, { maxAge: 900000, httpOnly: false });
    res.send({ message: `Idioma cambiado a ${lang}` });
  } else {
    res.status(400).send({ error: 'Idioma no válido' });
  }
});

app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));
 
app.use('/api', require('./routes/languageRouter'));
app.use('/api', require('./routes/rolesRouter'));
 
app.use('/api', require('./routes/userActionRouter'));
app.use('/api', require('./routes/blockUserRouter'));
app.use('/api', require('./routes/reportRouter'));
app.use('/api/blog/comments', require('./routes/blogCommentRoutes'));
app.use("/api/forms", require("./routes/formRouter"));
app.use("/api", require("./routes/privacysettingsRouter"));
app.use("/api", require("./routes/settingsRouter"));

// --- Auto desbloqueo de usuarios cada 5 min ---
setInterval(autoUnblockUsers, 5 * 60 * 1000);


const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to mongodb')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000
http.listen(port, () => {
    console.log('Server is running on port', port)
})