
import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const[nombre, setNombre] = useState('');
  const[precio, setPrecio] = useState(0);
  const[descripcion, setDescripcion] = useState('');
  const[VenFecha, setVenFecha] = useState('');
  const[cantidad, setCantidad] = useState(0);

  const[id_producto, setId_producto] = useState('');
  const[editar, setEditar] = useState(false);

  const[productoList, setProducto] = useState([]);

  const add = () =>{
    Axios.post('http://localhost:3001/create',{
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      VenFecha: VenFecha,
      cantidad: cantidad
    }).then(()=>{
      alert("Producto Registrado");
    });
  }

  const update = () =>{
    Axios.put('http://localhost:3001/update',{
      id_producto: id_producto,
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      VenFecha: VenFecha,
      cantidad: cantidad
    }).then(()=>{
      getProducto();
      alert("Producto Actualizado");
    });
  }



  const getProducto = () =>{
    Axios.get('http://localhost:3001/producto').then((response)=>{
      setProducto(response.data);
    });
  }
  useEffect(()=>{
    getProducto();
  },[]);

  const editarProducto = (val) =>{
    setEditar(true);
    setId_producto(val.id_producto);
    setNombre(val.nombre);
    setPrecio(val.precio);
    setDescripcion(val.descripcion);
    setVenFecha(val.VenFecha);
  }
  const limpiarCampos = () =>{
    setNombre('');
    setPrecio(0);
    setDescripcion('');
    setVenFecha('');
    setEditar(false);
  }


  return (

    <div class="container-fluid">
      <div className="App">
        <div className='datos'>
          <header className='header'>
            <h1>REGISTRO DE PRODUCTOS</h1>
            
          </header>
          <div className="row">
            <div className="col-3">

              <div className="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Nombre:</label>
                  <input onChange={(event)=>{
                      setNombre(event.target.value)
                    }} 
                    type="text"class="form-control" placeholder="Nompre del producto" 
                    aria-label="Username" aria-describedby="basic-addon1"/>
              </div>
              

              <div className="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Precio:</label>
                  <input onChange={(event)=>{
                      setPrecio(event.target.value)
                    }} 
                    type="number" class="form-control" placeholder="$ 0.00" 
                    aria-label="Username" aria-describedby="basic-addon1"/>
              </div>

              <div className="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Descripcion:</label>
                  <textarea onChange={(event)=>{
                      setDescripcion(event.target.value)
                    }} 
                    type="textarea" class="form-control" placeholder="Descripcion del producto" 
                    aria-label="Username" aria-describedby="basic-addon1"/>
              </div>

              <div className="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Fecha Venci:</label>
                <input onChange={(event)=>{
                    setVenFecha(event.target.value)
                  }} 
                  type="date"class="form-control" placeholder="Nompre del producto" 
                  aria-label="Username" aria-describedby="basic-addon1"/>
              </div>


              <div className="card-footer text-muted">
                <button  className='btn btn-success'  onClick={add}>
                  Registrar Producto
                </button>
              </div>

            </div> 
            <div className="col-9">
            <div className='lista'>
              <table className="table table-striped-centered ">
                <thead>
                  <tr className='text-center'>
                    <th scope="col">id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col" >Fecha Vencimiento</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    productoList.map((val,key)=>{
                      return (
                        <tr className='text-center' key={val.id_producto}>
                          <th >{val.id_producto}</th>
                          <td>{val.nombre}</td>
                          <td>{val.precio}</td>
                          <td>{val.descripcion}</td>
                          <td>{new Date(val.VenFecha).toLocaleDateString()}</td>

                          <td>{val.cantidad}</td>
                          <td>
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                              <button type="button" 
                              onClick={()=>{
                                editarProducto(val);
                              }}
                              className="btn btn-warning m-2">
                                 <a href="#"><i class="bi bi-brush-fill" >Actualizar</i></a>
                              </button>

                              <button type="button" 
                              /*onClick={()=>{
                                editarProducto(val);
                              }}*/
                              className="btn btn-info m-2">
                                 <a href="#"><i class="bi bi-brush-fill" >Cancelar</i></a>
                              </button>
                              <button type="button" 
                              /*onClick={()=>{
                                editarProducto(val);
                              }}*/
                              className="btn btn-success m-2">
                                 <a href="#"><i class="bi bi-brush-fill" >Agergar</i></a>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
              
              </div>

              
          </div>
          </div> 
          
            
        </div>

            
      </div>
    </div>
  
  );
}

export default App;
