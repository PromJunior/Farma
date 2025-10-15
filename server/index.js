const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'boticafarma'

});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;
    const venFecha = req.body.venFecha;
    db.query('INSERT INTO productos (nombre, precio, descripcion, venFecha) VALUES (?,?,?,?)',
        [nombre, precio, descripcion, venFecha],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("producto registrado correctamente")
            }
        }
    );
});
app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")
})
