const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    requestData: { username, password },
  });
});

app.listen(4000, () => {
  console.log('app listening on port 4000');
});
