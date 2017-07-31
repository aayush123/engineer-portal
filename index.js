const express = require('express');
let app = express();
app.use(express.static('public'));

app.get('/hht', function(req, res) {
  res.sendFile('./views/HHT.html', {root: __dirname})
});

app.get('/se', function(req, res) {
  res.sendFile('./views/SelfAssessment.html', {root: __dirname})
});


app.listen(3027)
console.log("app started on 3027");
