const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const app = express()
const cors = require('cors')
const db = require('./queries')
const path = require('path');
const port = 3001



app.use(cors()); // it enables all cors requests
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
//app.use(express.static('public')); //to access the files in public folder
app.use(fileUpload());
app.use('/static', express.static(path.join(__dirname, 'public/')));

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
app.get('/brand', db.getBrand)

app.post('/users/register',db.postRegister);
app.post('/users/login',db.postLogin);

app.post('/product/img',db.postProductImg);

app.post('/company/login',db.postLoginEmpresa);
app.post('/company/product',db.postProduct);
app.post('/company/productlist',db.postProductoByEmpresa);
app.post('/company/productdelete',db.deleteProduct);
app.post('/company/new',db.postEmpresaNew);
app.post('/company/password',db.postEmpresaChangePassword);
app.post('/company/ubicacion',db.postUbicaciones);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


