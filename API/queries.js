const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'searchgt',
  password: 'admin',
  port: 5433,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM "USUARIO" ORDER BY "ID" ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getProduct = (request, response) => {
    pool.query('SELECT p."ID", p."NOMBRE",a."MARCA", e."NOMBRE" AS "EMPRESA", c."NOMBRE" AS "CATEGORIA", p."PRECIO",p."RATING",p."COLOR",u."NOMBRE"  AS "UBICACION" FROM "PRODUCTO" AS p inner join "EMPRESA" AS e on p."ID_EMPRESA"=e."ID" inner join "MARCA" AS a on a."ID" = p."ID_MARCA" inner join "CATEGORIA" AS c on p."ID_CATEGORIA" = c."ID" inner join "UBICACION" AS u on p."ID_UBICACION" = u."ID" \
    ORDER BY p."ID" ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getCategory = (request, response) => {
    pool.query('SELECT * FROM "CATEGORIA" ORDER BY "ID" ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const postRegister = (request, response) => {
    console.log(request.body.email);
    const query = {
      text: 'SELECT * FROM "USUARIO" WHERE "USUARIO"=$1',
      values: [request.body.email],
    }

    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      if(results.rows<=0){
        const insert = {
          text: 'INSERT INTO "USUARIO"("NOMBRE","APELLIDO","USUARIO","PASSWORD") VALUES($1, $2, $3, $4)',
          values: [request.body.nombre,request.body.apellido,request.body.email,request.body.password]
        }
        pool.query(insert, (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(1)
        })
      }
      else{
        response.status(200).json(0)
      }
    })
  }

  const postLogin = (request, response) => {
    console.log("logIn")
    console.log(request.body.password);
    const query = {
      text: 'SELECT * FROM "USUARIO" WHERE "USUARIO" = $1 AND "PASSWORD" = $2',
      values: [request.body.email,request.body.password],
    }

    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      if(results.rowCount>0){
        response.status(200).json(1)
      }
      else{
        response.status(200).json(0)
      }
    })
  }

  module.exports = {
    getUsers,
    getProduct,
    getCategory,
    postRegister,
    postLogin
  }