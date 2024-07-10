const express = require('express');

const app = express();
const port = 4001;

app.get('/', (req, res) => {
    res.send('it works');
})

app.listen(port, () => {
    console.log(`connected to port ${port}`)
})