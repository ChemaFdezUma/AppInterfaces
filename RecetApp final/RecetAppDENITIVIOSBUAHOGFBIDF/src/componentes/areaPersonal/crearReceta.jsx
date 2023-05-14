import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Cabecera } from "../cabecera/cabecera";
import Swal from 'sweetalert2';

export const CrearReceta = () => {

    const Swal = require('sweetalert2')
    const URIInstrucciones="https://recetapp-final.herokuapp.com/instrucciones/"
    const URIrecetas = "https://recetapp-final.herokuapp.com/recetas/"
    const URIingredientes = "https://recetapp-final.herokuapp.com/ingredientes/"
    const URIrecetasusuarios="https://recetapp-final.herokuapp.com/recetasusuarios/"

    const navigate = useNavigate();
    
    const crearReceta = async(e)=>{
        e.preventDefault()
        const responseIngredientes = await axios.post(URIingredientes, {
            ingredientes: e.target.ingredientes.value
        })

        // Guarda el ID de los ingredientes en la variable idIngredientes
        const idIngredientes = responseIngredientes.data.message.pasar.id

        // Envía la solicitud HTTP para crear las instrucciones
        const responseInstrucciones = await axios.post(URIInstrucciones, {
            instruccion: e.target.instrucciones.value
        })

        // Guarda el ID de las instrucciones en la variable idInstrucciones
        const idInstrucciones = responseInstrucciones.data.message.pasar.id

        const ver =await axios.post(URIrecetas, {
            Tittle: e.target.nombre.value,
            Ingredients_id: idIngredientes,
            Instructions_id: idInstrucciones,
            Image_Name: e.target.foto.value,
            comensales: e.target.nComensales.value,
            tiempo: e.target.tiempo.value,
            clasificacion: e.target.clasificacion.value
        })
        console.log(ver)

        const recetaGuardadaId = ver.data.message.solucion.id
        const relacion= axios.post(URIrecetasusuarios,{
                idReceta: recetaGuardadaId,
                idUsuario:localStorage.getItem('user'),
                tiporelacion:"autor"
             })    
        console.log("Relacion"+(relacion).data)

        Swal.fire(
            '¡Perfecto!',
            'Tu receta ha sido creada correctamente',
            'success'
          )
        navigate("/explorador");
    }
    const volver = ()=> {
        console.log("cerrar sesion")
        navigate(`/areaPersonal/${localStorage.getItem('user')}`);
    }

    return (
        <div>
        <Cabecera/>
        <h1 className="tituloBuscador" title="Crea tu receta">Crear Receta</h1>
        <form onSubmit={crearReceta}>
        <div className="container margenCR bordePrueba centrarTxt margenG">
                <div className="margenD">

                <label for="nombre">Nombre:</label>   
                <input type="text" name="nombre" id="nombre" required className="inputFondo col-2 margenG margenB" placeholder="Titulo de receta" title="Titulo de la receta"/>
                
                <label for="ingredientes">Ingredientes:</label>
                <input type="text" name="ingredientes" id="ingredientes" required className="inputFondo col-2 margenG margenB" placeholder="Ingrediente1;Ingrediente2" label="Ingredientes separados por punto y coma"/>
                
                <label for="instrucciones">Instrucciones:</label>
                <input type="text" name="instrucciones" id="instrucciones" required className="inputFondo margenG margenB" placeholder="Paso1;Paso2;" title="Pasos separados por punto y coma"/> <br/>
                
                </div>
                <div className="margenD2">
                
                <label for="tiempo">Tiempo de cocina: </label> 
                <input type="number" name="tiempo" id="tiempo"required className="inputFondo margenG" placeholder="Tiempo en minutos" title="Tiempo en minutos"/>
                
                <label for="nComensales">Nº de comensales: </label> 
                <input type="number" name="nComensales" id="nComensales" required className="inputFondo margenG"placeholder="Numero comensales" title="Numero de comensales"/>
                
                <label for="clasificacion">Alérgenos y Preferencias: </label>
                <input type="text" name="clasificacion" id="clasificacion" required className="inputFondo margenG" placeholder="Vegano;Sin gluten" title="Clasificación"/><br></br>

                <label for="foto">Enlace de la foto: </label> 
                <input type="text" name="foto" id="foto" className="inputFondo margenG" placeholder="Vinculo imagen https//..."title="Link de la imagen"/><br/>
                
                </div>
                </div>
                <div className="centrarTxt">
                <button type="submit" className="btn btn-success btn-lg centrarTxt" title="Crear tu receta">Crear Receta</button>
                </div>
            </form>
         </div>  
        
    )
}