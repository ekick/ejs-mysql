const express = require('express')
const mysql = require('mysql')
const BodyParser = require("body-parser")

const app = express()

app.use(BodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views","views")

const db = mysql.createConnection({
   host: "localhost",
   database: "kontak",
   user: "oldclient",
   password: ""
})

db.connect((err) => {
   if (err) throw err
   console.log("DB connected")
   
   // get data
   app.get("/", (req, res) => {
      const sql = "SELECT * FROM telepon"
      db.query(sql, (err, result) => {
         const dataRes = JSON.parse(JSON.stringify(result))
         res.render("index", {users: dataRes, title: "Costumer user list"})
      })
   })
   // create data
   app.post("/add", (req, res) => {
      const insertSQL = `INSERT INTO telepon (nama, nomor) VALUES ('${req.body.name}','${req.body.contact}');`
      db.query(insertSQL, (err, result) => {
         if(err) throw err
         res.redirect("/")
      })
   })
})

app.listen(8000, () => {
   console.log("server is up..")
})