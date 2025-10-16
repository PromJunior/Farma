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
    const VenFecha = req.body.VenFecha;
    const cantidad = req.body.cantidad;
    db.query('INSERT INTO producto (nombre, precio, descripcion, VenFecha, cantidad) VALUES (?,?,?,?,?)',
        [nombre, precio, descripcion, VenFecha],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("producto registrado correctamente")
            }
        }
    );
});

app.put("/update",(req,res)=>{
    const id_producto = req.body.id_producto;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;
    const VenFecha = req.body.VenFecha;
    db.query('UPDATE producto SET nombre = ?, precio = ?, descripcion = ?, VenFecha = ? WHERE id_producto = ?',
        [nombre, precio, descripcion, VenFecha],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("producto registrado correctamente")
            }
        }
    );

});

app.get("/producto",(req,res)=>{
    db.query('SELECT * FROM producto',(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")
})
