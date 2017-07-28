const express = require('express');
let app = express();

app.get('/login', function(req, res) {
  res.sendFile('./views/Login.html', {root: __dirname})
});

app.listen(3027)
console.log("app started on 3027");
