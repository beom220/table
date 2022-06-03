const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3001;

app.use(express.json())
app.use(cors('localhost:3000'));

// app.use(express.static(path.join(__dirname, 'client/build/index.html')));
// app.use(express.static(path.join(__dirname, 'client/public/index.html')));

// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname, '/client/build/index.html'));
// })

// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname, '../client/public/index.html'));
// })


app.get('/', (req, res) => {
    res.send({
        name: 'reactQuery',
        description: 'listen Server',
        subscribers_count: '17'
    });
})

app.listen(port, () => {
    console.log(`server listening to ${port}`)
});