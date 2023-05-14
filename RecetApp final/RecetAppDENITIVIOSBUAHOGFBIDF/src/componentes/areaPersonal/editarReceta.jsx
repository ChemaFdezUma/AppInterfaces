import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Cabecera } from "../cabecera/cabecera";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const EditarReceta = () => {

    const Swal = require('sweetalert2')
    const { idReceta } = useParams()
    const URIInstrucciones="https://recetapp-final.herokuapp.com/instrucciones/"
    const URIrecetas = "https://recetapp-final.herokuapp.com/recetas/"
    const URIingredientes = "https://recetapp-final.herokuapp.com/ingredientes/"
    const URIrecetasusuarios="https://recetapp-final.herokuapp.com/recetasusuarios/"

    const navigate = useNavigate();

    const [receta, setReceta] = useState({})
    const [instrucciones, setInstrucciones] = useState("")
    const [ingredientes, setIngredientes] = useState("")
    const [datosForm, setDatosForm]=useState("")
    useEffect(() => {
        getRecetaByID()
    }, [])

    const getRecetaByID = async () => {
        const res = await axios.get(URIrecetas + idReceta)
        setReceta(res.data)
        const resIngredientes = await axios.get(URIingredientes + res.data.Ingredients_id)
        setIngredientes(resIngredientes.data.ingredientes)
        const resInstrucciones = await axios.get(URIInstrucciones + res.data.Instructions_id)
        setInstrucciones(resInstrucciones.data.instruccion)
    }

    const editarReceta = async(e)=>{
        e.preventDefault()
        
        const responseIngredientes = await axios.put((URIingredientes+receta.Ingredients_id), {
            ingredientes: e.target.Ingredients_id.value
        })

        // Guarda el ID de los ingredientes en la variable idIngredientes
        //const idIngredientes = responseIngredientes.data.message.pasar.id

        // Envía la solicitud HTTP para crear las instrucciones
        const responseInstrucciones = await axios.put((URIInstrucciones+receta.Instructions_id), {
            instruccion: e.target.Instructions_id.value
        })

        // Guarda el ID de las instrucciones en la variable idInstrucciones
        //const idInstrucciones = responseInstrucciones.data.message.pasar.id

        const ver =await axios.put((URIrecetas+receta.id), {
            Tittle: e.target.Tittle.value,
            Ingredients_id: receta.Ingredients_id,
            Instructions_id: receta.Instructions_id,
            Image_Name: e.target.Image_name.value,
            comensales: e.target.comensales.value,
            tiempo: e.target.tiempo.value,
            clasificacion: e.target.clasificacion.value
        })
        
        Swal.fire(
            '¡Perfecto!',
            'Tu receta ha sido editada correctamente',
            'success'
          )
          navigate("/areaPersonal/"+localStorage.getItem('user'));
    }
    const volver = ()=> {
        console.log("cerrar sesion")
        navigate(`/areaPersonal/${localStorage.getItem('user')}`);
    }
    const handleChange = (event) => {
        console.log("Nombre del event"+[event.target.name])
        if(event.target.name==="Ingredients_id"){
            setIngredientes(event.target.value);

        }else if (event.target.name==="Instructions_id"){
            setInstrucciones(event.target.value);

        }else{
            setReceta({
                ...receta,
                [event.target.name]: event.target.value
              });
        }
        
      };

    return (
        <div>
        <Cabecera/>
        <h1 className="tituloBuscador" title="Edita tu receta">Editar Receta</h1>
        <form id="editarForm" onSubmit={editarReceta}>
        <div className="container margenCR bordePrueba centrarTxt margenG">
                <div className="margenD">
                    <label for="input-nombre">Nombre:</label>
                    <input type="text" name="Tittle" id="input-nombre" value={receta.Tittle} onChange={handleChange} required className="inputFondo col-2 margenG margenB" title="Titulo de la receta"/>
                    
                    <label for="input-ingredientes">Ingredientes:</label>
                    <input type="text" name="Ingredients_id" id="input-ingredientes" value={ingredientes} onChange={handleChange} required className="inputFondo col-2 margenG margenB" title="Ingredientes separados por punto y coma"/>
                    
                    <label for="input-instrucciones">Instrucciones:</label>
                    <input type="text" name="Instructions_id" id="input-instrucciones" value={instrucciones} onChange={handleChange} required className="inputFondo margenG margenB"  title="Pasos separados por punto y coma"/> <br/>
                </div>

                <div className="margenD2">
                    <label for="input-tiempo">Tiempo de cocina: </label>
                    <input type="number" name="tiempo" id="input-tiempo" value={receta.tiempo} onChange={handleChange} required className="inputFondo margenG"  title="Tiempo en minutos"/>
                    
                    <label for="input-comensales">Nº de comensales: </label>
                    <input type="number" name="comensales" id="input-comensales" value={receta.comensales} onChange={handleChange} required className="inputFondo margenG"title="Numero de comensales"/>
                    
                    <label for="idclas">Alérgenos y Preferencias: </label>
                    <input type="text" id="idclas" name="clasificacion" value={receta.clasificacion} onChange={handleChange} className="inputFondo margenG" title="Clasificación"/><br></br>

                    <label for="input-foto">Enlace de la foto: </label>
                    <input type="text" name="Image_name" id="input-foto" value={receta.Image_Name} onChange={handleChange} className="inputFondo margenG" title="Link de la imagen"/><br/>
                </div>
                </div>
                <div className="centrarTxt">
                <button type="submit" className="btn btn-success btn-lg centrarTxt" title="Editar tu receta">Editar Receta</button>
                </div>
            </form>  
         </div>  
        
    )
}