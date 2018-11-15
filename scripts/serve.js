const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', function(req, res) {
  res.sendFile(path.resolve('../build/index.html'), { root: __dirname });
});

console.log('Launching Quo...');

app.listen(port, () => {
  console.log(`Quo is running on http://localhost:${port}`);
});