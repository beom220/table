const express = require('express');
const cors = require('cors');
require("dotenv").config();
const routes = require('./routes');
const bodyParser = require('body-parser');
const session = require('express-session')

const FileStore = require('session-file-store')(session);
// const path = require('path');

const app = express();
const port = process.env.PORT || 4000;
const corsOption = {
    origin: [process.env.CORS],
    credential: true,
}

app.use(express.json());
app.use(cors(corsOption));

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'asadlfkj!@#!@#dfgsdg',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

const passport = require('./lib/passport')(app);
const memberRoute = require('./routes/member')(passport);
app.use('/member', memberRoute);

app.use('/', routes);


// not found page
app.use((req, res) => {
    res.status(404).send('Sorry find that');
});

// error page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log('server listening to ', port)
});



// app.use(express.static(path.join(__dirname, 'client/build/index.html')));
// app.use(express.static(path.join(__dirname, 'client/public/index.html')));

// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname, '/client/build/index.html'));
// })

// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname, '../client/public/index.html'));
// })