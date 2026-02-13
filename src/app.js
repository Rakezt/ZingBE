const express = require('express');
const app = express();

app.use('/test', (req, res) => {
  res.send('This is Test');
});
app.use((req, res) => {
  res.send('This is Home');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
