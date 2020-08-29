const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3001

app.use(bodyParser.json());


let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/users', db.getUsers)
app.get('/product', db.getProduct)
app.get('/category', db.getCategory)


app.post('/users/register',db.postRegister);
app.post('/users/login',db.postLogin);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


