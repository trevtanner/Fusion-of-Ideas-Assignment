const express = require('express')
const mysql = require('mysql')

//create connection to db
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'foi',
})

connection.connect(function (error) {
  if (error) {
    throw error
  } else {
    console.log('Connection Successful')
  }
})

const app = express()

app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE foi'
  connection.query(sql, (error) => {
    if (error) {
      throw error
    } else {
      res.send('Database Created')
    }
  })
})

//create tables
app.get('/createclients', (res, req) => {
  let sql =
    'CREATE TABLE clients(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))';
  connection.query(sql, (error) => {
    if (error) {
      throw error
    } else {
      console.log('Clients table created')
    }
  })
})

app.get('/createsections', (res, req) => {
  let sql =
    'CREATE TABLE sections(id int AUTO_INCREMENT, name VARCHAR(255), client_id int, PRIMARY KEY(id), FOREIGN KEY(client_id) REFERENCES clients(id) ON DELETE CASCADE)';
  connection.query(sql, (error) => {
    if (error) {
      throw error
    } else {
      console.log('Sections table created')
    }
  })
})

app.get('/createlinks', (res, req) => {
    let sql =
      'CREATE TABLE links(id int AUTO_INCREMENT, name VARCHAR(255), section_id int, PRIMARY KEY(id), FOREIGN KEY(section_id) REFERENCES sections(id) ON DELETE CASCADE)';
    connection.query(sql, (error) => {
      if (error) {
        throw error
      } else {
        console.log('Links table created')
      }
    })
  })

  //add records to database
  app.get('/client1', (req, res) => {
    let post = {name: "Client 1"};
    let sql = 'INSERT INTO clients SET ?';
    let query = connection.query(sql, post, (error)=> {
        if(error) {
            throw error
        } else {
            console.log('Client 1 added to client table');
        }
    })
  })

  app.get('/section1', (req, res) => {
    let post = {name: "Section 1", client_id: '1'};
    let sql = 'INSERT INTO sections SET ?';
    let query = connection.query(sql, post, (error)=> {
        if(error) {
            throw error
        } else {
            console.log('Section 1 added to sections table');
        }
    })
  })

  app.get('/link1', (req, res) => {
    let post = {name: "Link 1", section_id: '1'};
    let sql = 'INSERT INTO links SET ?';
    let query = connection.query(sql, post, (error)=> {
        if(error) {
            throw error
        } else {
            console.log('Link 1 added to link table');
        }
    })
  })

  //update record in tables
  app.get('/updateclient/:id', (req, res) => {
    let newName = 'New Client Name';
    let sql = `UPDATE clients SET name = '${newName}' WHERE id=${req.params.id}`;
    let query = connection.query(sql, (error) => {
        if(error) {
            throw error
        } else {
            console.log(`Client ${req.params.id} updated`)
        }
    })
  })

  app.get('/updatesection/:id', (req, res) => {
    let newName = 'New Section Name';
    let sql = `UPDATE sections SET name = '${newName}' WHERE id=${req.params.id}`;
    let query = connection.query(sql, (error) => {
        if(error) {
            throw error
        } else {
            console.log(`Section ${req.params.id} updated`)
        }
    })
  })

  app.get('/updatelink/:id', (req, res) => {
    let newName = 'New Link Name';
    let sql = `UPDATE links SET name = '${newName}' WHERE id=${req.params.id}`;
    let query = connection.query(sql, (error) => {
        if(error) {
            throw error
        } else {
            console.log(`Link ${req.params.id} updated`)
        }
    })
  })

  //Delete record from table
  app.get('/deleteclient/:id', (req, res) => {
    let sql = `DELETE FROM clients WHERE id=${req.params.id}`;
    let query = connection.query(sql, (error) => {
        if(error) {
            throw error
        } else {
            console.log(`Client ${req.params.id} deleted`)
        }
    })
  })

  app.get('/deletesection/:id', (req, res) => {
    let sql = `DELETE FROM sections WHERE id=${req.params.id}`;
    let query = connection.query(sql, (error) => {
        if(error) {
            throw error
        } else {
            console.log(`Section ${req.params.id} deleted`)
        }
    })
  })

  app.get('/deletelink/:id', (req, res) => {
    let sql = `DELETE FROM links WHERE id=${req.params.id}`;
    let query = connection.query(sql, (error) => {
        if(error) {
            throw error
        } else {
            console.log(`Link ${req.params.id} deleted`)
        }
    })
  })

app.listen('3000', () => {
  console.log('server started on port 3000')
})
