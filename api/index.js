const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json('test ok');
});

app.listen(4000, () => {
  console.log('app listening on port 4000');
});
