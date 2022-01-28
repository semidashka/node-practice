 const fs = require('fs');
 const path = require('path');

const express = require("express");

const app = express();

app.use(express.urlencoded({extended: false}));

const filePath = path.join(__dirname, 'data', 'users.json');

function readJson(somePath) {
  const fileData = fs.readFileSync(somePath);
  return JSON.parse(fileData);
}

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
});

app.get("/", function (req, res) {
  res.send('<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>')
});

app.post('/store-user', function(req, res) {
  
  const userName = req.body.username;
  const existingUsers = readJson(filePath);

  existingUsers.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send('<h1>Username stored!</h1>')
})

app.get('/list-of-usernames', function (req, res) {

  const usersArr = readJson(filePath);

  let resDataStr = '<ul>';
  
  for (const user of usersArr) {
    resDataStr += `<li>${user}</li>`;
  }

  resDataStr += '</ul>';

  res.send(resDataStr);

}) 



app.listen(3000);
