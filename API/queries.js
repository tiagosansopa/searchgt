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
    pool.query('SELECT p."ID", ENCODE(p."IMAGEN",\x27base64\x27) as "IMAGEN" , p."NOMBRE",a."MARCA", e."NOMBRE" AS "EMPRESA", c."NOMBRE" AS "CATEGORIA", p."PRECIO",p."RATING",p."COLOR",u."NOMBRE"  AS "UBICACION" FROM "PRODUCTO" AS p inner join "EMPRESA" AS e on p."ID_EMPRESA"=e."ID" inner join "MARCA" AS a on a."ID" = p."ID_MARCA" inner join "CATEGORIA" AS c on p."ID_CATEGORIA" = c."ID" inner join "UBICACION" AS u on p."ID_UBICACION" = u."ID" \
    ORDER BY p."ID" ASC', (error, results) => {
      if (error) {
        console.log(error);
        throw error
      }
      //console.log(results.rows);
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

  const getBrand = (request, response) => {
    pool.query('SELECT * FROM "MARCA" ORDER BY "ID" ASC', (error, results) => {
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
          text: 'INSERT INTO "USUARIO"("NOMBRE","APELLIDO","USUARIO","PASSWORD", "TIPO") VALUES($1, $2, $3, $4,0)',
          values: [request.body.nombre,request.body.apellido,request.body.email,request.body.password]
        }
        pool.query(insert, (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json({"status":1,"tipo":0})
        })
      }
      else{
        response.status(200).json({"status":0,"tipo":0})
      }
    })
  }

  const postLoginEmpresa = (request, response) => {
    console.log("logIn")
    console.log(request.body.password);
    const query = {
      text: 'SELECT * FROM "EMPRESA" WHERE "USUARIO" = $1 AND "PASSWORD" = $2',
      values: [request.body.email,request.body.password],
    }

    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      if(results.rowCount>0){
        console.log(results.rows[0].ID);
        response.status(200).json({"status":1,"tipo":2,"id":results.rows[0].ID})
      }
      else{
        response.status(200).json({"status":0,"tipo":2})
      }
    })
  }

  const postLogin = (request, response) => {
    console.log("logIn")
    //console.log(request.body.password);
    const query = {
      text: 'SELECT * FROM "USUARIO" WHERE "USUARIO" = $1 AND "PASSWORD" = $2',
      values: [request.body.email,request.body.password],
    }

    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      if(results.rowCount>0){
        console.log("salida ",results.rows[0].TIPO);
        response.status(200).json({"status":1,"tipo":results.rows[0].TIPO})
      }
      else{
        console.log("entrada ");
        response.status(200).json({"status":0,"tipo":0})
      }
    })
  }

  const postUbicaciones = (request, response) => {
    //console.log("Ubicaciones",request.body.eID)
    const query = {
      text: 'SELECT * FROM "UBICACION" WHERE "ID_EMPRESA" =  $1',
      values: [request.body.eID],
    }

    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      if(results.rowCount>0){
        response.status(200).json(results.rows)
      }
      else{
        response.status(200).json(results.rows)
      }
    })
  }


  const postProduct = (request, response) => {
    //console.log("afterglow",request.body.imagen);
    const insert = {
      text: 'INSERT INTO "PRODUCTO"("ID_EMPRESA","NOMBRE","ID_MARCA","ID_CATEGORIA","PRECIO","ID_UBICACION","RATING","COLOR") VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [request.body.ide,
               request.body.nombre,
               request.body.idmarca,
               request.body.idcategoria,
               request.body.precio,
               request.body.idubicacion,
               0,
               request.body.color
              ]
    }
    pool.query(insert, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({"status":1})
    })
  }

  const postEmpresaNew = (request, response) => {
    const insert = {
      text: 'INSERT INTO "EMPRESA"("NOMBRE","USUARIO","PASSWORD") VALUES($1, $2, $3)',
      values: [request.body.nombre,
               request.body.usuario,
               'password'
              ]
    }
    pool.query(insert, (error, results) => {
      if (error) {
        response.status(200).json({"status":0})
        throw error
      }
      console.log("curry");
      response.status(200).json({"status":1})
    })
  }

  const postEmpresaChangePassword = (request, response) => {
    const insert = {
      text: 'UPDATE "EMPRESA" SET "PASSWORD" = $1 WHERE "USUARIO" = $2',
      values: [
               request.body.password,
               request.body.usuario
              ]
    }
    pool.query(insert, (error, results) => {
      if (error) {
        response.status(200).json({"status":0})
        throw error
      }
      console.log("success password update");
      response.status(200).json({"status":1})
    })
  }


  const postProductImg = (request, response) => {
    console.log("paso 1");
    if (!request.files) {
      return response.status(500).json({ msg: "file is not found" })
    }

    const query = {
      text: 'SELECT "ID" FROM "PRODUCTO" ORDER BY "ID" DESC LIMIT 1'
    }
    let id;
    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      if(results.rowCount>0){
        id = results.rows[0].ID
        console.log(id);

        console.log("paso 2 "+id);

        const myFile = request.files.file;
        //  mv() method places the file inside public directory
        //myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        myFile.mv(`${__dirname}/public/img`+id+`.jpg`, function (err) {
        if (err) {
            console.log(err)
            return response.status(500).json({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return response.json({name: myFile.name, path: `/${myFile.name}`});
  });

      }
      else{
        response.status(200).json(results.rows)
      }
    })
  }

  module.exports = {
    getUsers,
    getProduct,
    getCategory,
    getBrand,
    postRegister,
    postLogin,
    postLoginEmpresa,
    postProduct,
    postUbicaciones,
    postEmpresaNew,
    postEmpresaChangePassword,
    postProductImg
  }