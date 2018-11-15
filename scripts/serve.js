const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', function(req, res) {
  res.sendFile('index.html');
});

console.log('Launching Quo...');

app.listen(port, () => {
  console.log(`Quo is running on http://localhost:${port}`);
});