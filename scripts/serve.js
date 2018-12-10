const express = require('express');
const path = require('path');
const compression = require('compression')
const app = express();

const port = process.env.PORT || 8080;

app.use(compression())
app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

console.log('Launching Quo...');

app.listen(port, () => {
  console.log(`Quo is running on http://localhost:${port}`);
});