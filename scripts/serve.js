const express = require('express');
const path = require('path');
const app = express();

// use the build directory
const appBuild = path.join('build');

const port = process.env.PORT || 8080;

app.use(express.static(appBuild));

app.get('/*', function(req, res) {
  res.sendFile(path.join(appBuild, 'index.html'));
});

console.log('Launching Quo...');

app.listen(port, () => {
  console.log(`Quo is running on http://localhost:${port}`);
});